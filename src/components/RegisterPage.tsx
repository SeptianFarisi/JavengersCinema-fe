import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilmIcon } from '@heroicons/react/24/solid';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert('Registrasi berhasil! Silakan login.');
        navigate('/login');
      } else {
        alert('Registrasi gagal. Username mungkin sudah digunakan.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan pada server.');
    }
  };

  const handleGoLogin = () => navigate('/login');
  const handleGoHome = () => navigate('/');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-6 text-2xl font-bold text-gray-800">
          <FilmIcon className="h-8 w-8 text-red-600 mr-2" />
          <span className="text-red-600">JAVENGERS</span> CINEMA
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              REGISTER
            </button>

            <button
              type="button"
              onClick={handleGoHome}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              HOME
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={handleGoLogin}
            className="text-blue-600 hover:underline"
          >
            Sudah punya akun? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
