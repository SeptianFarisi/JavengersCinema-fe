import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieDetailPage from './components/MovieDetailPage';
import useMovieStore from './store/movieStore';

function App() {
  const fetchMovies = useMovieStore((state) => state.fetchMovies);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <Header />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
        </Routes>
        <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
          Powered by OMDb API
        </footer>
      </div>
    </Router>
  );
}

export default App;
