import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export interface Movie {
  movie_id: number;
  title: string;
  similarity?: number;
  tags?: string;
}

export interface User {
  user_id: string;
  username: string;
  watched_movies: Movie[];
}

export interface Friend {
  friend_id: string;
  friend_name: string;
  watched_movies: Movie[];
}

export interface RecommendationResult {
  movie_1: Movie;
  similarity_1: number;
  movie_2: Movie;
  similarity_2: number;
  combined_watch_count?: number;
  requires_feedback?: false;
}

export interface RecommendationFeedbackRequired {
  requires_feedback: true;
  pending_recommendations: Movie[];
}

export interface LastRecommendationsState {
  pending_recommendations: Movie[];
}

export interface RecommendationFeedbackResult {
  added_to_watchlist: Movie[];
  watchlist_count: number;
}

export const getUser = (): Promise<User> =>
  API.get("/api/user").then(r => r.data);

export const getFriends = (): Promise<Friend[]> =>
  API.get("/api/friends").then(r => r.data);

export const getIndividualRecommendations = (): Promise<RecommendationResult | RecommendationFeedbackRequired> =>
  API.post("/api/recommendations/individual", {}).then(r => r.data);

export const getGroupRecommendations = (friend_ids: string[]): Promise<RecommendationResult> =>
  API.post("/api/recommendations/group", { friend_ids }).then(r => r.data);

export const searchMovies = (q: string): Promise<Movie[]> =>
  API.get("/api/movies/search", { params: { q } }).then(r => r.data);

export const getLastRecommendations = (): Promise<LastRecommendationsState> =>
  API.get("/api/recommendations/last").then(r => r.data);

export const submitRecommendationFeedback = (watched_movie_ids: number[]): Promise<RecommendationFeedbackResult> =>
  API.post("/api/recommendations/feedback", { watched_movie_ids }).then(r => r.data);
