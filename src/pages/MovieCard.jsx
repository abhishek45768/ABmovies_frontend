// src/components/MovieCard.jsx
import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg cursor-pointer" onClick={onClick}>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-full h-auto rounded-lg" />
      <h3 className="mt-2 text-lg font-bold">{movie.title}</h3>
      <p className="text-gray-400">{movie.release_date}</p>
    </div>
  );
};

export default MovieCard;
