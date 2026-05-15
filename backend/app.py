import pandas as pd
import numpy as np
import ast
import json
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.stem.porter import PorterStemmer
import nltk

nltk.download('stopwords', quiet=True)

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, '..', 'data')

new_df = None
vectors = None
cv = None
user_data = None
friends_data = None
recommendation_state = {"pending_individual": []}

def convert(obj):
    return [i['name'] for i in ast.literal_eval(obj)]

def convertcast(obj):
    L, counter = [], 0
    for i in ast.literal_eval(obj):
        if counter == 3: break
        L.append(i['name']); counter += 1
    return L

def convertcrew(obj):
    for i in ast.literal_eval(obj):
        if i['job'] == 'Director': return [i['name']]
    return []

ps = PorterStemmer()

def stem(text):
    return " ".join(ps.stem(w) for w in text.split())

def build_model():
    global new_df, vectors, cv
    processed_path = os.path.join(DATA_DIR, 'movies_processed.csv')
    credits_path   = os.path.join(DATA_DIR, 'tmdb_5000_credits.csv')
    movies_path    = os.path.join(DATA_DIR, 'tmdb_5000_movies.csv')

    if os.path.exists(credits_path) and os.path.exists(movies_path):
        credits = pd.read_csv(credits_path)
        movies  = pd.read_csv(movies_path)
        movies  = credits.merge(movies, on='title')
        movies  = movies[['movie_id','title','overview','genres','keywords','cast','crew']]
        movies.dropna(inplace=True)
        movies['genres']   = movies['genres'].apply(convert)
        movies['keywords'] = movies['keywords'].apply(convert)
        movies['cast']     = movies['cast'].apply(convertcast)
        movies['crew']     = movies['crew'].apply(convertcrew)
        movies['overview'] = movies['overview'].apply(lambda x: x.split())
        for col in ['genres','cast','keywords','crew']:
            movies[col] = movies[col].apply(lambda x: [i.replace(" ","") for i in x])
        movies['tags'] = movies['overview'] + movies['genres'] + movies['keywords'] + movies['cast'] + movies['crew']
        new_df = movies[['movie_id','title','tags']].copy()
        new_df['tags'] = new_df['tags'].apply(lambda x: " ".join(x)).str.lower().apply(stem)
        new_df.reset_index(drop=True, inplace=True)
        new_df.to_csv(processed_path, index=False)
        print(f"Processed and saved {len(new_df)} movies")
    elif os.path.exists(processed_path):
        new_df = pd.read_csv(processed_path)
        print(f"Loaded pre-processed {len(new_df)} movies")
    else:
        raise FileNotFoundError("Place tmdb_5000_credits.csv + tmdb_5000_movies.csv in /data, or movies_processed.csv")

    cv = CountVectorizer(max_features=5000, stop_words='english')
    vectors = cv.fit_transform(new_df['tags']).toarray()
    print(f"Model ready: {new_df.shape[0]} movies x {vectors.shape[1]} features")

def load_user_data():
    global user_data, friends_data
    with open(os.path.join(DATA_DIR, 'user_data.json')) as f:
        user_data = json.load(f)
    with open(os.path.join(DATA_DIR, 'friends_data.json')) as f:
        friends_data = json.load(f)
    print(f"Loaded user + {len(friends_data)} friends")

def save_user_data():
    with open(os.path.join(DATA_DIR, 'user_data.json'), 'w') as f:
        json.dump(user_data, f, indent=2)

def load_recommendation_state():
    global recommendation_state
    state_path = os.path.join(DATA_DIR, 'recommendation_state.json')
    if os.path.exists(state_path):
        with open(state_path) as f:
            recommendation_state = json.load(f)
    else:
        recommendation_state = {"pending_individual": []}

def save_recommendation_state():
    state_path = os.path.join(DATA_DIR, 'recommendation_state.json')
    with open(state_path, 'w') as f:
        json.dump(recommendation_state, f, indent=2)

def set_pending_individual(recs):
    recommendation_state['pending_individual'] = [
        {"movie_id": int(r['movie_id']), "title": str(r['title'])}
        for r in recs
    ]
    save_recommendation_state()

def clear_pending_individual():
    recommendation_state['pending_individual'] = []
    save_recommendation_state()

def recommend_from_watched(watched_ids, exclude_ids=None):
    exclude = set(exclude_ids or []) | set(watched_ids)
    indices = [new_df[new_df['movie_id']==int(m)].index[0]
               for m in watched_ids if not new_df[new_df['movie_id']==int(m)].empty]
    if not indices: return []
    mean_vec = vectors[indices].mean(axis=0).reshape(1,-1)
    sim = cosine_similarity(mean_vec, vectors)[0]
    excl_idx = {new_df[new_df['movie_id']==int(m)].index[0]
                for m in exclude if not new_df[new_df['movie_id']==int(m)].empty}
    results = []
    for idx in np.argsort(sim)[::-1]:
        if idx in excl_idx: continue
        row = new_df.iloc[idx]
        results.append({"movie_id": int(row['movie_id']), "title": str(row['title']),
                         "similarity": float(round(sim[idx],4)), "tags": str(row['tags'])})
        if len(results) == 2: break
    return results

@app.route('/api/user')
def get_user(): return jsonify(user_data)

@app.route('/api/friends')
def get_friends(): return jsonify(friends_data)

@app.route('/api/movies/search')
def search_movies():
    q = request.args.get('q','').lower()
    if len(q) < 2: return jsonify([])
    r = new_df[new_df['title'].str.lower().str.contains(q, na=False)][['movie_id','title']].head(10)
    return jsonify(r.to_dict(orient='records'))

@app.route('/api/recommendations/individual', methods=['POST'])
def individual():
    pending = recommendation_state.get('pending_individual', [])
    if pending:
        return jsonify({"requires_feedback": True, "pending_recommendations": pending})

    watched_ids = [m['movie_id'] for m in user_data['watched_movies']]
    recs = recommend_from_watched(watched_ids)
    if len(recs) < 2: return jsonify({"error": "Not enough data"}), 400
    set_pending_individual(recs)
    return jsonify({"movie_1": recs[0], "similarity_1": recs[0]['similarity'],
                    "movie_2": recs[1], "similarity_2": recs[1]['similarity'],
                    "requires_feedback": False})

@app.route('/api/recommendations/last')
def get_last_recommendations():
    return jsonify({"pending_recommendations": recommendation_state.get('pending_individual', [])})

@app.route('/api/recommendations/feedback', methods=['POST'])
def recommendation_feedback():
    data = request.json or {}
    watched_ids = set(int(m) for m in data.get('watched_movie_ids', []))
    pending = recommendation_state.get('pending_individual', [])

    existing_ids = {int(m['movie_id']) for m in user_data['watched_movies']}
    added = []
    for movie in pending:
        movie_id = int(movie['movie_id'])
        if movie_id in watched_ids and movie_id not in existing_ids:
            record = {"movie_id": movie_id, "title": str(movie['title'])}
            user_data['watched_movies'].append(record)
            existing_ids.add(movie_id)
            added.append(record)

    save_user_data()
    clear_pending_individual()
    return jsonify({"added_to_watchlist": added, "watchlist_count": len(user_data['watched_movies'])})

@app.route('/api/recommendations/group', methods=['POST'])
def group():
    data = request.json or {}
    all_w = list(user_data['watched_movies'])
    for fid in data.get('friend_ids',[]):
        f = next((x for x in friends_data if x['friend_id']==fid), None)
        if f: all_w.extend(f['watched_movies'])
    seen, unique = set(), []
    for m in all_w:
        if m['movie_id'] not in seen:
            seen.add(m['movie_id']); unique.append(m)
    recs = recommend_from_watched([m['movie_id'] for m in unique])
    if len(recs) < 2: return jsonify({"error": "Not enough data"}), 400
    return jsonify({"movie_1": recs[0], "similarity_1": recs[0]['similarity'],
                    "movie_2": recs[1], "similarity_2": recs[1]['similarity'],
                    "combined_watch_count": len(unique)})

@app.route('/api/health')
def health():
    return jsonify({"status": "ok", "movies_loaded": int(new_df.shape[0]) if new_df is not None else 0})

if __name__ == '__main__':
    build_model()
    load_user_data()
    load_recommendation_state()
    app.run(debug=True, port=5000)
