import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhotoIcon, FilmIcon } from '@heroicons/react/24/solid'; // Using FilmIcon for general movie context

const AddMoviePage: React.FC = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    Title: '',
    Type: '', // Genre
    Year: '',
    Plot: '', // Deskripsi
    Director: '', // Sutradara
    Actors: '', // Pemeran
    Poster: '', // Poster Movie URL or base64
    Trailer: '',
  });
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPosterFile(file);
      setPosterPreview(URL.createObjectURL(file));
    } else {
      setPosterFile(null);
      setPosterPreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding movie:', movieData);
    console.log('Poster file:', posterFile);
    // Here you would typically send movieData to your backend
    alert('Add movie functionality not yet implemented.');
    navigate('/movies'); // Navigate back to movie list after submission
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">TAMBAH MOVIE JAVENGERS CINEMA</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label htmlFor="Title" className="block text-gray-700 text-sm font-bold mb-2">Judul Movie</label>
            <input
              type="text"
              id="Title"
              name="Title"
              value={movieData.Title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Type" className="block text-gray-700 text-sm font-bold mb-2">Genre</label>
            <select
              id="Type"
              name="Type"
              value={movieData.Type}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Pilih Genre Movie</option>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Horror">Horror</option>
              <option value="Thriller">Thriller</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="Year" className="block text-gray-700 text-sm font-bold mb-2">Tahun</label>
            <input
              type="text"
              id="Year"
              name="Year"
              value={movieData.Year}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Director" className="block text-gray-700 text-sm font-bold mb-2">Sutradara</label>
            <input
              type="text"
              id="Director"
              name="Director"
              value={movieData.Director}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4 col-span-full">
            <label htmlFor="Plot" className="block text-gray-700 text-sm font-bold mb-2">Deskripsi</label>
            <textarea
              id="Plot"
              name="Plot"
              value={movieData.Plot}
              onChange={handleChange}
              rows={4}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>

          <div className="mb-4 col-span-full">
            <label htmlFor="Actors" className="block text-gray-700 text-sm font-bold mb-2">Pemeran</label>
            <input
              type="text"
              id="Actors"
              name="Actors"
              value={movieData.Actors}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4 col-span-full">
            <label htmlFor="Poster" className="block text-gray-700 text-sm font-bold mb-2">Poster Movie</label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                id="Poster"
                name="Poster"
                accept="image/*"
                onChange={handlePosterChange}
                className="hidden"
              />
              <label
                htmlFor="Poster"
                className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                <PhotoIcon className="h-5 w-5 mr-2" /> Pilih Gambar
              </label>
              {posterPreview && (
                <img src={posterPreview} alt="Poster Preview" className="w-24 h-32 object-cover rounded" />
              )}
            </div>
          </div>

          <div className="mb-6 col-span-full">
            <label htmlFor="Trailer" className="block text-gray-700 text-sm font-bold mb-2">Trailer</label>
            <input
              type="text"
              id="Trailer"
              name="Trailer"
              value={movieData.Trailer}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline flex items-center"
          >
            <FilmIcon className="h-5 w-5 mr-2" /> Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMoviePage;
