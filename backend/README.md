# Unscroll Backend (FastAPI)

## Setup
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

## Data prerequisites
Place the raw TMDB files in `backend/data/raw/`:
- `tmdb_5000_credits.csv`
- `tmdb_5000_movies.csv`

Then build processed artifacts:
```bash
python scripts/build_vector_data.py
```

This generates:
- `backend/data/processed/movies.csv` (movie_id, title, tags)
- `backend/data/processed/vectors.npz` (sparse matrix 4806 x 5000)

## Run
```bash
uvicorn app.main:app --reload
```