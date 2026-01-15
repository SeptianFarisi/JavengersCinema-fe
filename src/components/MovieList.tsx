import React from 'react'; // Removed useState as internal pagination is removed
import MovieCard from './MovieCard';
import type { Movie } from '../store/movieStore'; // Import Movie interface as type

interface MovieListProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  currentPage: number; // Added for pagination
  totalPages: number; // Added for pagination
  onPageChange: (page: number) => void; // Added for pagination
}

const MovieList: React.FC<MovieListProps> = ({ movies = [], loading, error, currentPage, totalPages, onPageChange }) => { // Destructure new props
  // Removed internal pagination logic as it's now handled by SearchMoviePage and movieStore
  // const [currentPage, setCurrentPage] = useState(1);
  // const moviesPerPage = 12; // Default to 12 cards per page

  // Pagination logic is now handled by the parent component and movieStore
  // const indexOfLastMovie = currentPage * moviesPerPage;
  // const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  // const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  // const totalPages = Math.ceil(movies.length / moviesPerPage);

  if (loading) {
    return <div className="text-center p-8">Loading movies...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-8 justify-items-center">
        {movies.length > 0 ? (
          // Filter out duplicate movies based on imdbID to prevent key errors
          Array.from(new Map(movies.map(movie => [movie.imdbID, movie])).values()).map((movie) => (
            <MovieCard
                key={movie.imdbID}
                id={movie.imdbID}
                title={movie.Title}
                type={movie.Type || 'N/A'} // Use movie.Type from OMDB API, default to 'N/A'
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
            onClick={() => onPageChange(currentPage - 1)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          {/* Render page numbers */}
          {(() => {
            const pageButtons = [];
            const maxPageButtons = 5; // Number of page buttons to show
            let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
            let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

            if (endPage - startPage + 1 < maxPageButtons) {
              startPage = Math.max(1, endPage - maxPageButtons + 1);
            }

            if (startPage > 1) {
              pageButtons.push(
                <button key={1} onClick={() => onPageChange(1)} className={`px-3 py-1 rounded bg-gray-200`}>1</button>
              );
              if (startPage > 2) {
                pageButtons.push(<span key="ellipsis-start" className="px-3 py-1">...</span>);
              }
            }

            for (let i = startPage; i <= endPage; i++) {
              pageButtons.push(
                <button
                  key={i}
                  onClick={() => onPageChange(i)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {i}
                </button>
              );
            }

            if (endPage < totalPages) {
              if (endPage < totalPages - 1) {
                pageButtons.push(<span key="ellipsis-end" className="px-3 py-1">...</span>);
              }
              pageButtons.push(
                <button key={totalPages} onClick={() => onPageChange(totalPages)} className={`px-3 py-1 rounded bg-gray-200`}>{totalPages}</button>
              );
            }
            return pageButtons;
          })()}
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieList;
