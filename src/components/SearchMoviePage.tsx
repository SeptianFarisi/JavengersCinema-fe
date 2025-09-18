import React, { useState } from 'react';
import useMovieStore from '../store/movieStore';
import MovieList from './MovieList';

const SearchMoviePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { movies, loading, error, fetchMovies } = useMovieStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMovies(searchTerm);
  };

  return (
    <div className="search-movie-page">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {loading && <p>Loading movies...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && movies.length > 0 && <MovieList />}
      {!loading && !error && movies.length === 0 && searchTerm && <p>No movies found for "{searchTerm}".</p>}
      {!loading && !error && movies.length === 0 && !searchTerm && <p>Start searching for movies!</p>}
    </div>
  );
};

export default SearchMoviePage;
