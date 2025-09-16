import React, { useEffect } from 'react';
import MovieCard from './MovieCard';
import useMovieStore from '../store/movieStore';

const MovieList: React.FC = () => {
  const { movies, loading, error, fetchMovies } = useMovieStore();

  useEffect(() => {
    fetchMovies('not'); // Fetch some initial movies with title 'a'
  }, [fetchMovies]);

  if (loading) {
    return <div className="text-center p-8">Loading movies...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-8 justify-items-center">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          id={movie.imdbID}
          title={movie.Title}
          type={movie.Type || 'N/A'} // Use movie.Type from OMDB API, default to 'N/A'
          year={movie.Year}
          imageUrl={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/500x750?text=No+Image'}
        />
      ))}
    </div>
  );
};

export default MovieList;
