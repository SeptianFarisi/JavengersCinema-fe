import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useMovieStore from '../store/movieStore';
import MovieList from './MovieList';
import Header from './Header'; // Import Header component

const SearchMoviePage: React.FC = () => {
  const { movies, loading, error, fetchMovies } = useMovieStore();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('query') || '';

  useEffect(() => {
    if (searchTerm) {
      fetchMovies(searchTerm);
    }
  }, [searchTerm, fetchMovies]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800"> {/* Added main div wrapper */}
      <Header /> {/* Added Header */}
      <div className="search-movie-page"> {/* Original content wrapper */}
        {loading && <p>Loading movies...</p>}
        {error && <p className="error-message">{error}</p>}
        {<MovieList />}
        {!loading && !error && movies.length === 0 && searchTerm && <p>No movies found for "{searchTerm}".</p>}
        {!loading && !error && movies.length === 0 && !searchTerm && <p>Start searching for movies!</p>}
      </div>
      <footer className="bg-gray-800 text-white text-center p-4 mt-auto"> {/* Added Footer */}
        Powered by OMDb API
      </footer>
    </div>
  );
};

export default SearchMoviePage;
