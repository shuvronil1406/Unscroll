<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=260&color=0:0f0c29,50:302b63,100:24243e&text=UNSCROLL&fontSize=75&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=ML-Powered%20Movie%20Recommendation%20Platform&descAlignY=58&descSize=20" width="100%"/>

<br/>

<img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&weight=700&size=30&duration=3000&pause=1000&color=FF914D&center=true&vCenter=true&width=900&lines=Stop+Scrolling.+Start+Watching.;AI-Powered+Movie+Recommendations.;Built+with+React+%2B+Flask+%2B+Machine+Learning.;Personalized+%26+Group+Movie+Discovery.;Find+Your+Next+Favorite+Movie." />

<br/><br/>

<img src="https://img.shields.io/github/stars/your-username/unscroll?style=for-the-badge" />
<img src="https://img.shields.io/github/forks/your-username/unscroll?style=for-the-badge" />
<img src="https://img.shields.io/github/issues/your-username/unscroll?style=for-the-badge" />
<img src="https://img.shields.io/github/license/your-username/unscroll?style=for-the-badge" />

<br/><br/>

<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask"/>
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
<img src="https://img.shields.io/badge/Machine%20Learning-FF6F00?style=for-the-badge"/>
<img src="https://img.shields.io/badge/TMDB-Dataset-01D277?style=for-the-badge"/>

</div>

---

<div align="center">

# 🎬 What is Unscroll?

### *An intelligent movie recommendation platform designed to eliminate decision fatigue.*

</div>

Unscroll is an AI-powered recommendation system that helps users discover movies they are most likely to enjoy using machine learning and content-based filtering.

The platform analyzes:
- Genres
- Cast
- Directors
- Keywords
- Overview descriptions
- User watch history

to generate highly relevant recommendations for both individuals and groups.

---

<div align="center">

<img src="https://github-profile-trophy.vercel.app/?username=shuvronil1406&theme=algolia&no-frame=true&row=1&column=6"/>

</div>

---

# ✨ Features

<table>
<tr>
<td width="50%">

## 🎯 Personalized Recommendations
Get recommendations based on your watch history and movie preferences.

## 👥 Group Recommendation System
Combine multiple user profiles to discover movies everyone can enjoy together.

## 🔍 Smart Search
Search through thousands of TMDB movies instantly.

## ⚡ Fast Recommendation Engine
Optimized vector similarity generation with cached preprocessing.

</td>

<td width="50%">

## 🎨 Modern Cinematic UI
Interactive movie cards with smooth transitions and responsive design.

## 🧠 NLP + Machine Learning
Uses text vectorization, stemming, and cosine similarity.

## 🖼️ Dynamic Poster Loading
Real-time TMDB poster fetching using API integration.

## 📦 Cached Dataset Pipeline
Avoids repeated preprocessing using local CSV caching.

</td>
</tr>
</table>

---

<div align="center">

# 🧠 Recommendation Pipeline

<img src="https://skillicons.dev/icons?i=python,flask,react,ts,nodejs"/>

</div>

```text
TMDB Movies Dataset
          ↓
Data Cleaning & Preprocessing
          ↓
Feature Extraction
(Genres + Cast + Crew + Keywords + Overview)
          ↓
Tag Generation
          ↓
NLP Processing
          ↓
Count Vectorization
          ↓
Cosine Similarity Matrix
          ↓
Recommendation Engine
          ↓
Flask REST API
          ↓
React Frontend
          ↓
Interactive Movie Discovery
```

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:232526,100:414345&height=2"/>

# 🚀 Tech Stack

<br/>

<table>
<tr>

<td align="center" width="33%">

<img src="https://skillicons.dev/icons?i=react,ts" height="55"/>

### Frontend

<div align="left">

- React 19  
- TypeScript  
- Axios  
- Three.js  
- React Three Fiber  
- CSS3  

</div>

</td>

<td align="center" width="33%">

<img src="https://skillicons.dev/icons?i=python,flask" height="55"/>

### Backend

<div align="left">

- Python  
- Flask  
- Flask-CORS  

</div>

</td>

<td align="center" width="33%">

<img src="https://skillicons.dev/icons?i=sklearn,tensorflow,pytorch" height="55"/>

### Machine Learning

<div align="left">

- scikit-learn  
- Pandas  
- NumPy  
- NLTK  

</div>

</td>

</tr>
</table>

</div>

---

<div align="center">

# 📂 Project Structure

</div>

```bash
unscroll/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── recommendation_engine/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.tsx
│   │
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
├── data/
│   ├── tmdb_5000_movies.csv
│   ├── tmdb_5000_credits.csv
│   ├── movies_processed.csv
│   ├── user_data.json
│   └── friends_data.json
│
├── start.sh
├── start_backend.sh
├── start_frontend.sh
└── README.md
```

---

<div align="center">

# ⚙️ Installation & Setup

</div>

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/unscroll.git

cd unscroll
```

---

## 2️⃣ Download Dataset

Download TMDB dataset from Kaggle:

```text
https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata
```

Place these files inside the `data/` directory:

```bash
tmdb_5000_movies.csv
tmdb_5000_credits.csv
```

---

## 3️⃣ Backend Setup

```bash
cd backend

pip install -r requirements.txt

python app.py
```

Backend runs on:

```text
http://localhost:5000
```

---

## 4️⃣ Frontend Setup

```bash
cd frontend

npm install

npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

<div align="center">

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png"/>

# 🎞️ TMDB Poster Integration

</div>

Create `.env` inside `frontend/`

```env
REACT_APP_TMDB_KEY=your_tmdb_api_key
```

Get API Key from:

```text
https://www.themoviedb.org/settings/api
```

---

<div align="center">

# 📡 API Endpoints

</div>

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/user` | Fetch current user profile |
| GET | `/api/friends` | Fetch friend profiles |
| GET | `/api/health` | Backend health check |
| GET | `/api/movies/search?q=` | Search movies |
| POST | `/api/recommendations/individual` | Individual recommendations |
| POST | `/api/recommendations/group` | Group recommendations |

---

# 📥 Example API Request

```json
{
  "watched_movies": [
    {
      "movie_id": 19995,
      "title": "Avatar"
    }
  ]
}
```

---

# 📤 Example API Response

```json
{
  "movie_1": {
    "movie_id": 123,
    "title": "Inception",
    "similarity": 0.87
  },
  "movie_2": {
    "movie_id": 456,
    "title": "Interstellar",
    "similarity": 0.82
  }
}
```

---

<div align="center">

# 🧪 Machine Learning Details
<br/><br/>
<img src="https://skillicons.dev/icons?i=python,sklearn,tensorflow,pytorch" />

<br/><br/>

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=24&duration=2500&pause=1000&color=00E7FF&center=true&vCenter=true&width=700&lines=Content-Based+Filtering;Cosine+Similarity+Engine;Natural+Language+Processing;Vectorized+Movie+Recommendations" />

</div>
## Feature Engineering

The recommendation engine extracts:
- Genres
- Keywords
- Cast
- Director
- Movie Overview

and combines them into a single textual representation called `tags`.

---

## NLP Processing

Applied preprocessing:
- Lowercasing
- Tokenization
- Stopword Removal
- Stemming
- Space Normalization

Example:

```text
Tom Hanks → TomHanks
Science Fiction → ScienceFiction
```

---

## Vectorization

```python
CountVectorizer(max_features=5000, stop_words='english')
```

---

## Similarity Computation

```python
cosine_similarity(movie_vectors)
```

---

<div align="center">

# 🎨 UI Highlights

</div>

- 🎬 Cinematic Interface
- ⚡ Smooth Card Animations
- 🌌 Modern Dark Theme
- 📱 Responsive Layout
- 🎞️ Interactive Recommendation Flow
- 🖼️ Dynamic Posters
- 🔥 Animated Transitions

---

<div align="center">

<img src="https://github-readme-activity-graph.vercel.app/graph?username=shuvronil1406&theme=react-dark&hide_border=true"/>

</div>

---

<div align="center">

# 🔥 Future Enhancements

</div>

- Hybrid Recommendation System
- Collaborative Filtering
- Federated Learning
- Blockchain-based Privacy
- AI Mood Detection
- Watch Party Integration
- Voice Search
- Streaming Platform Linking

---

<div align="center">

# 📊 Performance Metrics

</div>

| Operation | Time |
|---|---|
| Dataset Processing | 10-30 sec |
| Recommendation Generation | < 1 sec |
| Search Speed | Real-time |

---

<div align="center">

# 🛠️ Development Scripts

</div>

## Start Backend

```bash
./start_backend.sh
```

## Start Frontend

```bash
./start_frontend.sh
```

## Start Full Project

```bash
./start.sh
```

---

<div align="center">

# 🤝 Contributing

</div>

```bash
1. Fork Repository
2. Create Feature Branch
3. Commit Changes
4. Push Branch
5. Open Pull Request
```

---

<div align="center">

# 📜 License

Educational and Research Purpose Only

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=180&section=footer&color=0:0f0c29,50:302b63,100:24243e"/>

# ⭐ If you like this project, give it a star.

### Built for movie lovers tired of scrolling endlessly.

</div>
