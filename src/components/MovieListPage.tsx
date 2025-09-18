import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMovieStore from '../store/movieStore';
import { PencilIcon, TrashIcon, PlusCircleIcon, HomeIcon } from '@heroicons/react/24/solid';

const MovieListPage: React.FC = () => {
  const navigate = useNavigate();
  const { movies, fetchLocalMovies, loading, error } = useMovieStore();

  useEffect(() => {
    fetchLocalMovies(); // Fetch movies from local API on component mount
  }, [fetchLocalMovies]);

  const handleAddMovie = () => {
    console.log('Attempting to navigate to /add-movie');
    navigate('/add-movie');
  };

  const handleEditMovie = (imdbID: string) => {
    navigate(`/update-movie/${imdbID}`);
  };

  const handleDeleteMovie = (imdbID: string) => {
    if (window.confirm(`Are you sure you want to delete movie with ID: ${imdbID}?`)) {
      alert(`Delete functionality for movie ${imdbID} not yet implemented.`);
      console.log('Delete movie:', imdbID);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (loading) {
    return <div className="text-center p-4">Loading movies...</div>;
  }

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

      {error && (
        <div className="text-center p-4 mb-4 text-red-500 bg-red-100 border border-red-400 rounded">
          Error: {error}
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Judul Movie
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Genre
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tahun
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Poster
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Sutradara
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Pemeran
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <tr key={movie.imdbID}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{movie.Title}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{movie.Type}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{movie.Year}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <img src={movie.Poster} alt={movie.Title} className="w-16 h-24 object-cover rounded" />
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{movie.Director || 'N/A'}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{movie.Actors || 'N/A'}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditMovie(movie.imdbID)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded flex items-center"
                      >
                        <PencilIcon className="h-4 w-4 mr-1" /> EDIT
                      </button>
                      <button
                        onClick={() => handleDeleteMovie(movie.imdbID)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded flex items-center"
                      >
                        <TrashIcon className="h-4 w-4 mr-1" /> HAPUS
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-5 text-gray-500">No movies found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovieListPage;
