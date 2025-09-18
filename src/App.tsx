import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieDetailPage from './components/MovieDetailPage';
import LoginPage from './components/LoginPage';
import MovieListPage from './components/MovieListPage';
import AddMoviePage from './components/AddMoviePage';
import UpdateMoviePage from './components/UpdateMoviePage';
import useMovieStore from './store/movieStore';

function App() {
  const { fetchMovies, fetchLocalMovies } = useMovieStore();

  useEffect(() => {
    // Fetch movies from the local API when the app mounts
    fetchLocalMovies();
  }, [fetchLocalMovies]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        {/* Header and Footer can be conditionally rendered or placed outside Routes if needed on all pages except login */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <>
              <Header />
              <MovieList />
              <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
                Powered by OMDb API
              </footer>
            </>
          } />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/movies" element={<MovieListPage />} />
          <Route path="/add-movie" element={<AddMoviePage />} />
          <Route path="/update-movie/:imdbID" element={<UpdateMoviePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
