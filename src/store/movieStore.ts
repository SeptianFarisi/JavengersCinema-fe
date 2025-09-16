import { create } from 'zustand';
import axios from 'axios';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string; // Added Type field
  Plot?: string; // Optional, fetched in detail
  imdbRating?: string; // Optional, fetched in detail
  Released?: string; // Optional, fetched in detail
}

interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  fetchMovies: (searchTerm?: string) => Promise<void>;
  fetchMovieDetail: (imdbID: string) => Promise<Movie | null>;
}

const LOCAL_API_BASE_URL = 'http://localhost:8080/api/movies/omdb';

const useMovieStore = create<MovieState>((set, get) => ({
  movies: [],
  loading: false,
  error: null,
  fetchMovies: async (searchTerm = 'not') => { // Default search term 'a'
    set({ loading: true, error: null });
    try {
      const response = await axios.get<{ success: boolean; message: string; data: { Search: Movie[]; Response: string; Error?: string } }>(`${LOCAL_API_BASE_URL}/search`, {
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
  fetchMovieDetail: async (imdbID: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<{ success: boolean; message: string; data: Movie & { Response: string; Error?: string } }>(`${LOCAL_API_BASE_URL}/${imdbID}`);

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
        };

        // Update the movies array with the detailed movie
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
}));

export default useMovieStore;
