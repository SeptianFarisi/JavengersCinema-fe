import { create } from 'zustand';
import axios from 'axios';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string; // Added Type field (Genre)
  Plot?: string; // Optional, fetched in detail (Deskripsi)
  imdbRating?: string; // Optional, fetched in detail
  Released?: string; // Optional, fetched in detail
  Director?: string; // Added Director field (Sutradara)
  Actors?: string; // Added Actors field (Pemeran)
  Trailer?: string; // Added Trailer field
}

interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  trailerLoading: boolean; // Added trailer loading state
  trailerError: string | null; // Added trailer error state
  fetchMovies: (searchTerm?: string) => Promise<void>;
  fetchMovieDetail: (imdbID: string) => Promise<Movie | null>;
  fetchMovieTrailer: (imdbID: string) => Promise<string | null>;
  fetchLocalMovies: () => Promise<void>; // Added fetchLocalMovies
}

const LOCAL_API_BASE_URL = 'http://localhost:8080/api/movies';
const OMDB_API_BASE_URL = 'http://localhost:8080/api/movies/omdb';
const TRAILER_API_BASE_URL = 'http://localhost:8080/api/trailers/tmdb';

const useMovieStore = create<MovieState>((set, get) => ({
  movies: [],
  loading: false,
  error: null,
  trailerLoading: false,
  trailerError: null,
  fetchMovies: async (searchTerm = 'not') => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<{ success: boolean; message: string; data: { Search: Movie[]; Response: string; Error?: string } }>(`${OMDB_API_BASE_URL}/search`, {
        params: {
          title: searchTerm,
        },
      });

      if (response.data.success && response.data.data.Response === 'True') {
        set({ movies: response.data.data.Search, loading: false });
      } else {
        set({ error: response.data.data.Error || response.data.message || 'Failed to fetch movies', loading: false });
      }
    } catch (error) {
      set({ error: 'Failed to fetch movies', loading: false });
    }
  },
  fetchLocalMovies: async () => { // New function to fetch from local API
    set({ loading: true, error: null });
    try {
      const response = await axios.get<{ success: boolean; message: string; data: Movie[] }>(`${LOCAL_API_BASE_URL}`);

      if (response.data.success) {
        set({ movies: response.data.data, loading: false });
      } else {
        set({ error: response.data.message || 'Failed to fetch local movies', loading: false });
      }
    } catch (error) {
      set({ error: 'Failed to fetch local movies', loading: false });
    }
  },
  fetchMovieDetail: async (imdbID: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<{ success: boolean; message: string; data: Movie & { Response: string; Error?: string } }>(`${OMDB_API_BASE_URL}/${imdbID}`);

      if (response.data.success) {
        const detailedMovie: Movie = {
          imdbID: response.data.data.imdbID,
          Title: response.data.data.Title,
          Year: response.data.data.Year,
          Poster: response.data.data.Poster,
          Type: response.data.data.Type,
          Plot: response.data.data.Plot,
          imdbRating: response.data.data.imdbRating,
          Released: response.data.data.Released,
          Director: response.data.data.Director,
          Actors: response.data.data.Actors,
          Trailer: response.data.data.Trailer,
        };

        set((state) => ({
          movies: state.movies.map((movie) =>
            movie.imdbID === imdbID ? { ...movie, ...detailedMovie } : movie
          ),
          loading: false,
        }));
        return detailedMovie;
      } else {
        set({ error: response.data.data.Error || response.data.message || 'Failed to fetch movie details', loading: false });
        return null;
      }
    } catch (error) {
      set({ error: 'Failed to fetch movie details', loading: false });
      return null;
    }
  },
  fetchMovieTrailer: async (imdbID: string) => {
  set({ trailerLoading: true, trailerError: null });
  try {
    const response = await axios.get(`${TRAILER_API_BASE_URL}/${encodeURIComponent(imdbID)}`);
    if (response.data.success) {
      const trailers = response.data.data; // array
      if (trailers.length === 0) {
        set({ trailerLoading: false, trailerError: 'No trailers found' });
        return null;
      }

      const trailerUrl = trailers[0].trailerUrl; // ambil trailer pertama
      set((state) => ({
        movies: state.movies.map((movie) =>
          movie.imdbID === imdbID
            ? { ...movie, Trailer: trailerUrl }
            : movie
        ),
        trailerLoading: false,
      }));
      return trailerUrl;
    } else {
      set({ trailerError: response.data.message || 'Failed to fetch trailer', trailerLoading: false });
      return null;
    }
  } catch (error) {
    set({ trailerError: 'Failed to fetch trailer', trailerLoading: false });
    return null;
  }
},

}));

export default useMovieStore;
