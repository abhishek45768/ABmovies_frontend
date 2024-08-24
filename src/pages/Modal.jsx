import React, { useState, useEffect } from 'react';
import { FaTimes, FaHeart, FaPlay, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { fetchMovieDetails, fetchMovieTrailer, fetchMovieCast } from '../api'; // Ensure these functions are implemented in your API file

const Modal = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const loadDetails = async () => {
      const movieDetails = await fetchMovieDetails(movie.id);
      setDetails(movieDetails);

      const trailer = await fetchMovieTrailer(movie.id);
      setTrailer(trailer);

      const movieCast = await fetchMovieCast(movie.id);
      setCast(movieCast);
    };

    loadDetails();
  }, [movie.id]);

  const handleAddToFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!savedFavorites.some(fav => fav.id === movie.id)) {
      savedFavorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(savedFavorites));
      alert('Added to favorites!');
    } else {
      alert('Movie is already in favorites.');
    }
  };

  const toggleShowMore = () => setShowMore(!showMore);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center z-50 items-center p-4">
      <div className="bg-gray-800 text-white p-6 rounded-lg relative max-w-full md:max-w-2xl lg:max-w-3xl w-full shadow-lg">
        <button
          className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full p-2"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </button>
        {details && (
          <div className="flex flex-col md:flex-row">
            <img
              src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
              alt={details.title}
              className="w-full md:w-1/3 lg:w-1/4 h-auto rounded-lg shadow-md"
            />
            <div className="p-4 md:w-2/3 lg:w-3/4">
              <h2 className="text-2xl md:text-3xl font-bold mt-4">{details.title}</h2>
              <p className="mt-2 text-gray-300">{details.overview}</p>
              <p className="mt-2">Release Date: <span className="font-semibold">{details.release_date}</span></p>
              <p className="mt-2">Rating: <span className="font-semibold">{details.vote_average}</span></p>
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-4">
                <button
                  className="p-2 bg-teal-600 hover:bg-teal-700 text-white rounded flex items-center space-x-2 transition duration-300"
                  onClick={handleAddToFavorites}
                >
                  <FaHeart size={18} />
                  <span>Add to Favorites</span>
                </button>
                {trailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 md:mt-0 p-2 bg-teal-600 hover:bg-teal-700 text-white rounded flex items-center space-x-2 transition duration-300"
                  >
                    <FaPlay size={18} />
                    <span>Watch Trailer</span>
                  </a>
                )}
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold">Cast</h3>
                <div
                  className={`mt-4 text-gray-300 ${showMore ? 'overflow-y-scroll max-h-48' : ''}`}
                >
                  {cast.length > 0 ? (
                    showMore
                      ? cast.map(member => <span key={member.id} className="block text-sm">{member.name}</span>)
                      : cast.slice(0, 5).map(member => <span key={member.id} className="block text-sm">{member.name}</span>)
                  ) : (
                    'No cast information available.'
                  )}
                  {cast.length > 5 && (
                    <button
                      onClick={toggleShowMore}
                      className="ml-2 text-teal-500 hover:underline"
                    >
                      {showMore ? 'Show Less' : `Show More (${cast.length - 5} more)`}
                      {showMore ? <FaChevronUp className="inline ml-1" /> : <FaChevronDown className="inline ml-1" />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
