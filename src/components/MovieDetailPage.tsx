import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useMovieStore from '../store/movieStore';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { movies, fetchMovieDetail, loading, error } = useMovieStore();
  const movie = movies.find((m) => m.imdbID === id);

  useEffect(() => {
    if (id && (!movie || !movie.Plot)) { // Fetch details if movie not found or plot is missing
      fetchMovieDetail(id);
    }
  }, [id, fetchMovieDetail]);

  if (loading) {
    return <div className="text-center p-8">Loading movie details...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  }

  if (!movie) {
    return <div className="text-center p-8">Movie not found.</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/500x750?text=No+Image'}
          alt={movie.Title}
          className="w-64 h-96 object-cover rounded-lg shadow-lg md:mr-8 mb-8 md:mb-0"
        />
        <div className="text-left">
          <h1 className="text-4xl font-bold mb-4">{movie.Title} ({movie.Year})</h1>
          <p className="text-lg mb-4">{movie.Plot}</p>
          {movie.imdbRating && <p className="text-md text-gray-600">Rating: {movie.imdbRating}/10</p>}
          {movie.Released && <p className="text-md text-gray-600">Release Date: {movie.Released}</p>}
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
