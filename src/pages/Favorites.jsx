import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard'; // Adjust the import path if necessary
import Modal from './Modal';
import axios from 'axios'; // Import axios for HTTP requests

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (movie) => {
    setCurrentMovie(movie);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentMovie(null);
  };

  useEffect(() => {
    // Load favorites from localStorage on component mount
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);

    // Initial log of movie IDs
    savedFavorites.forEach(movie => {
      console.log(`Movie ID: ${movie.id}`);
    });
  }, []);

  useEffect(() => {
    // Log updated movie IDs whenever favorites change
    console.log('Updated Favorite Movie IDs:');
    favorites.forEach(movie => {
      console.log(`Movie ID: ${movie.id}`);
    });
  }, [favorites]); // Dependency on favorites

  const removeFromFavorites = async (movieId) => {
    const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);

    // Send request to the backend
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Log token to verify

      const response = await axios.post('http://localhost:5000/favorites/remove', { movieId }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true // Ensure credentials are sent with request
      });

      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  const addToFavorites = async (movieId) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Log token to verify

      const response = await axios.post('http://localhost:5000/favorites/add', { movieId }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        withCredentials: true // Ensure credentials are sent with request
      });

      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.length > 0 ? (
          favorites.map(movie => (
            <div key={movie.id} className="relative">
              <MovieCard
                movie={movie}
                onClick={() => openModal(movie)}
              />
              <button
                onClick={() => removeFromFavorites(movie.id)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No favorite movies found.</p>
        )}
      </div>
      {modalOpen && currentMovie && (
        <Modal
          movie={currentMovie}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Favorites;
