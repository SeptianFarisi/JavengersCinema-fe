import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMovieStore from '../store/movieStore';
import MovieCard from './MovieCard';
import { PlusCircleIcon, HomeIcon } from '@heroicons/react/24/solid';

const MovieTypePage: React.FC = () => {
  const navigate = useNavigate();
  const { movies, fetchMoviesByType, loading, error } = useMovieStore();
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12; // Changed to 12 cards per page

  useEffect(() => {
    fetchMoviesByType('movie');
  }, [fetchMoviesByType]);

  // Pagination logic
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const handleAddMovie = () => navigate('/add-movie');
  const handleGoHome = () => navigate('/');

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">DAFTAR MOVIE JAVENGERS CINEMA</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleAddMovie}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" /> TAMBAH MOVIE
          </button>
          <button
            onClick={handleGoHome}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <HomeIcon className="h-5 w-5 mr-2" /> HOME
          </button>
        </div>
      </div>

      {loading && <div className="text-center p-8">Loading movies...</div>}
      {error && <div className="text-center p-8 text-red-500">{error}</div>}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentMovies.length > 0 ? (
          currentMovies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              id={movie.imdbID}
              title={movie.Title}
              type={movie.Type}
              year={movie.Year}
              imageUrl={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/500x750?text=No+Image'}
            />
          ))
        ) : (
          !loading && <div className="col-span-full text-center text-gray-500">No movies found.</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieTypePage;
