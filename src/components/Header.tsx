import React from 'react';
import { FaVideo, FaSearch } from 'react-icons/fa'; // Import Hero Icons

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center">
        <FaVideo className="h-8 w-8 text-red-600 mr-2" /> {/* Using Hero Icon for logo */}
        <span className="text-2xl font-bold text-red-600">JAVENGERS <span className="text-gray-800">CINEMA</span></span>
      </div>
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
        <input type="text" placeholder="Search..." className="p-2 outline-none text-base" />
        <button className="bg-gray-100 p-2 cursor-pointer">
          <FaSearch className="h-5 w-5 text-gray-600" /> {/* Using Hero Icon for search */}
        </button>
      </div>
      <nav className="flex items-center">
        <a href="#" className="ml-6 text-gray-800 font-medium hover:text-red-600">HOME</a>
        <a href="#" className="ml-6 text-gray-800 font-medium hover:text-red-600">MOVIE</a>
        <a href="#" className="ml-6 text-gray-800 font-medium hover:text-red-600">SERIES</a>
        <a href="#" className="ml-6 text-gray-800 font-medium hover:text-red-600">EPISODE</a>
        {/* <button className="bg-red-600 text-white px-4 py-2 rounded-md ml-6 hover:bg-red-700">EPISODE</button> */}
      </nav>
    </header>
  );
};

export default Header;
