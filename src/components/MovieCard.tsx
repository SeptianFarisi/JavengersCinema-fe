import React from 'react';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  id: string; // Changed to string for imdbID
  title: string;
  type: string; // Changed from genre to type
  year: string;
  imageUrl: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, type, year, imageUrl }) => {
  return (
    <Link to={`/movie/${id}`} className="w-52 rounded-lg overflow-hidden shadow-lg m-4 relative cursor-pointer">
      <img src={imageUrl} alt={title} className="w-full h-72 object-cover block" />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 flex justify-between text-sm">
        <span className="bg-red-600 px-2 py-1 rounded-md">{type}</span> {/* Display type instead of genre */}
        <span className="bg-gray-800 px-2 py-1 rounded-md">{year}</span>
      </div>
    </Link>
  );
};

export default MovieCard;
