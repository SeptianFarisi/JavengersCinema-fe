import { create } from 'zustand';
import axios from 'axios';

export interface Movie { // Exported Movie interface
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
  currentPage: number; // Added for pagination
  totalPages: number; // Added for pagination
  totalResults: number; // Added for pagination
  trailerLoading: boolean;
  trailerError: string | null;
  fetchMovies: (searchTerm?: string, page?: number) => Promise<void>; // Modified to accept page
  fetchMovieDetail: (imdbID: string) => Promise<Movie | null>;
  fetchMovieTrailer: (imdbID: string) => Promise<string | null>;
  fetchLocalMovies: (type?: string) => Promise<void>;
  fetchMoviesByType: (type: string) => Promise<void>;
  setCurrentPage: (page: number) => void; // Added to update current page
}

const LOCAL_API_BASE_URL = 'https://8bfa0afe7c6c.ngrok-free.app/api/movies';
const OMDB_API_BASE_URL = 'https://8bfa0afe7c6c.ngrok-free.app/api/movies/omdb';
const TRAILER_API_BASE_URL = 'https://8bfa0afe7c6c.ngrok-free.app/api/trailers/tmdb';

const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  loading: false,
  error: null,
  currentPage: 1, // Initial page
  totalPages: 1, // Initial total pages
  totalResults: 0, // Initial total results
  trailerLoading: false,
  trailerError: null,
  fetchMovies: async (searchTerm = 'not', page = 1) => { // Added page parameter
    set({ loading: true, error: null });
    try {
      const response = await axios.get<{ success: boolean; message: string; data: { Search: Movie[]; totalResults: string; Response: string; Error?: string } }>(`${OMDB_API_BASE_URL}/search`, {
        params: {
          title: searchTerm,
          page: page, // Pass page to API
        },
      });

      if (response.data.success && response.data.data.Response === 'True') {
        const totalResults = parseInt(response.data.data.totalResults, 10);
        const moviesPerPage = 10; // OMDB API typically returns 10 results per page
        set({
          movies: response.data.data.Search,
          loading: false,
          currentPage: page,
          totalResults: totalResults,
          totalPages: Math.ceil(totalResults / moviesPerPage),
        });
      } else {
        set({ error: response.data.data.Error || response.data.message || 'Failed to fetch movies', loading: false, movies: [], totalResults: 0, totalPages: 1 });
      }
    } catch (error) {
      set({ error: 'Failed to fetch movies', loading: false, movies: [], totalResults: 0, totalPages: 1 });
    }
  },
  fetchLocalMovies: async (type?: string) => { // Modified to accept optional type
    set({ loading: true, error: null });
    try {
      const response = await axios.get<{ success: boolean; message: string; data: Movie[] }>(`${LOCAL_API_BASE_URL}`);

      if (response.data.success) {
        const filteredMovies = type ? response.data.data.filter(movie => movie.Type.toLowerCase() === type.toLowerCase()) : response.data.data;
        set({ movies: filteredMovies, loading: false });
      } else {
        set({ error: response.data.message || 'Failed to fetch local movies', loading: false });
      }
    } catch (error) {
      set({ error: 'Failed to fetch local movies', loading: false });
    }
  },
  fetchMoviesByType: async (type: string) => { // New function to fetch movies by type
    set({ loading: true, error: null });
    try {
      const response = await axios.get<{ success: boolean; message: string; data: Movie[] }>(`${LOCAL_API_BASE_URL}`);

      if (response.data.success) {
        const filteredMovies = response.data.data.filter(movie => movie.Type.toLowerCase() === type.toLowerCase());
        set({ movies: filteredMovies, loading: false });
      } else {
        set({ error: response.data.message || `Failed to fetch ${type}s`, loading: false });
      }
    } catch (error) {
      set({ error: `Failed to fetch ${type}s`, loading: false });
    }
  },
  fetchMovieDetail: async (imdbID: string) => {
    set({ loading: true, error: null, trailerError: null, trailerLoading: false });
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
    console.log('Fetching trailer for imdbID:', imdbID); // Added console log
    const response = await axios.get(`${TRAILER_API_BASE_URL}/${imdbID}`);
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
  } catch (error: any) {
    set({ trailerError: `Failed to fetch trailer: ${error.message || 'Network error'}`, trailerLoading: false });
    return null;
  }
},
  setCurrentPage: (page: number) => set({ currentPage: page }),
}));

export default useMovieStore;
