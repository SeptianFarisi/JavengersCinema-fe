import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useMovieStore from '../store/movieStore';
import Header from './Header'; // Import Header component

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { movies, fetchMovieDetail, fetchMovieTrailer, loading, error, trailerLoading, trailerError } = useMovieStore();
  const movie = movies.find((m) => m.imdbID === id);

  useEffect(() => {
    if (id && (!movie || !movie.Plot)) { // Fetch details if movie not found or plot is missing
      fetchMovieDetail(id);
    }
  }, [id]); // Added movie to dependency array

  useEffect(() => {
    if (!id || !movie) return;
    if ((movie.Trailer && movie.Trailer !== 'N/A') || trailerLoading || trailerError) return;
    fetchMovieTrailer(id);
}, [id, movie?.Trailer, trailerLoading, trailerError]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <Header />
        <div className="text-center p-8">Loading movie details...</div>
        <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
          Powered by OMDb API
        </footer>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <Header />
        <div className="text-center p-8 text-red-500">Error: {error}</div>
        <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
          Powered by OMDb API
        </footer>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <Header />
        <div className="text-center p-8">Movie not found.</div>
        <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
          Powered by OMDb API
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />
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
            {movie.Director && <p className="text-md text-gray-600">Director: {movie.Director}</p>}
            {movie.Actors && <p className="text-md text-gray-600">Actors: {movie.Actors}</p>}
            {trailerLoading && <p className="text-md text-gray-600">Loading trailer...</p>}
            {trailerError && <p className="text-md text-red-500">Error loading trailer: {trailerError}</p>}
            {movie.Trailer && (
              <div className="mt-4">
                <h2 className="text-2xl font-bold mb-2">Trailer</h2>
                <iframe
                  width="560"
                  height="315"
                  src={movie.Trailer.replace('watch?v=', 'embed/')} // <-- Ubah URL ke embed
                  title="Movie Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg shadow-lg"
                ></iframe>
              </div>
            )}
            {/* Add more details as needed */}
          </div>
        </div>
      </div>
      <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
        Powered by OMDb API
      </footer>
    </div>
  );
};

export default MovieDetailPage;
