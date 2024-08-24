import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import Modal from './Modal';
import { fetchGenres, filterMovies } from '/src//api';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];
  const [currentMovie, setCurrentMovie] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filter state
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  useEffect(() => {
    // Fetch genres on component mount
    const loadGenres = async () => {
      const genreList = await fetchGenres();
      setGenres(genreList);
    };
    loadGenres();
  }, []);

  const openModal = (movie) => {
    setCurrentMovie(movie);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentMovie(null);
  };

  const handleFilter = async () => {
    const filteredResults = await filterMovies(selectedGenre, selectedRating);
    navigate('/search-results', { state: { results: filteredResults } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Search Results</h2>

      {/* Filter Options */}
      <div className="flex gap-4 mb-8">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>

        <select
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Rating</option>
          <option value="8">8 and above</option>
          <option value="7">7 and above</option>
          <option value="6">6 and above</option>
        </select>

        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Apply Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.length > 0 ? (
          results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={() => openModal(movie)} />
          ))
        ) : (
          <p className="text-gray-400">No results found.</p>
        )}
      </div>

      {modalOpen && currentMovie && (
        <Modal movie={currentMovie} onClose={closeModal} />
      )}
    </div>
  );
};

export default SearchResults;
