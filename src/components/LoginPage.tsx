import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilmIcon } from '@heroicons/react/24/solid';
import axios from 'axios'; // Import axios

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // State for login errors
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => { // Make handleLogin async
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const response = await axios.post('http://localhost:8080/api/users/authenticate', {
        username,
        password,
      });

      console.log('Login API Response:', response.data); // Log the full response data

      if (response.data.id) { // Check for id or username to indicate success
        // Assuming the backend returns user info directly on success.
        // If a specific token is expected, please clarify its location in the response.
        localStorage.setItem('userToken', response.data.username); // Temporarily store username as token
        console.log('Login successful, redirecting to /');
        navigate('/'); // Redirect to home page
      } else {
        console.error('Login failed:', response.data.message);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during login. Please try again.');
      console.error('Login error:', err.response?.data || err.message); // Log the full error object
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-6 text-2xl font-bold text-gray-800">
          <FilmIcon className="h-8 w-8 text-red-600 mr-2" />
          <span className="text-red-600">JAVENGERS</span> CINEMA
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              LOGIN
            </button>
            <button
              type="button"
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleGoHome}
            >
              HOME
            </button>
          </div>
        </form>

        {error && (
          <div className="text-red-500 text-center mt-4">
            {error}
          </div>
        )}

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={handleGoRegister}
            className="text-blue-600 hover:underline"
          >
            Belum punya akun? Daftar sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
