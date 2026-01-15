import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useMovieStore from '../store/movieStore';
import MovieList from './MovieList';
import Header from './Header'; // Import Header component

const SearchMoviePage: React.FC = () => {
  const { movies, loading, error, currentPage, totalPages, fetchMovies, setCurrentPage } = useMovieStore(); // Destructure new state and action
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('query') || '';

  useEffect(() => {
    if (searchTerm) {
      fetchMovies(searchTerm, currentPage); // Pass currentPage to fetchMovies
    }
  }, [searchTerm, currentPage, fetchMovies]); // Add currentPage to dependency array

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800"> {/* Added main div wrapper */}
      <Header /> {/* Added Header */}
      <div className="search-movie-page"> {/* Original content wrapper */}
        {/* MovieList now handles its own loading/error messages and pagination */}
        <MovieList
          movies={movies}
          loading={loading}
          error={error}
          currentPage={currentPage} // Pass currentPage
          totalPages={totalPages} // Pass totalPages
          onPageChange={setCurrentPage} // Pass setCurrentPage
        />
        {!loading && !error && movies.length === 0 && searchTerm && <p className="text-center p-8">No movies found for "{searchTerm}".</p>}
        {!loading && !error && movies.length === 0 && !searchTerm && <p className="text-center p-8">Start searching for movies!</p>}
      </div>
      <footer className="bg-gray-800 text-white text-center p-4 mt-auto"> {/* Added Footer */}
        Powered by OMDb & TMDB API
      </footer>
    </div>
  );
};

export default SearchMoviePage;
