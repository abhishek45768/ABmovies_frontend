import React, { useState, useEffect } from 'react';
import { fetchTrendingMovies, fetchTopRatedMovies } from '/src/api';
import MovieCard from './MovieCard'; // Adjust the path accordingly
import Modal from './Modal'; // Component to show movie details
import { FaFire, FaStar } from 'react-icons/fa'; // Import icons

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [trendingPage, setTrendingPage] = useState(1);
  const [topRatedPage, setTopRatedPage] = useState(1);
  const [loadingTrending, setLoadingTrending] = useState(false);
  const [loadingTopRated, setLoadingTopRated] = useState(false);

  // Load trending movies
  useEffect(() => {
    const loadTrendingMovies = async () => {
      setLoadingTrending(true);
      try {
        const trending = await fetchTrendingMovies(trendingPage);
        setTrendingMovies(prev => [...prev, ...trending]);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      } finally {
        setLoadingTrending(false);
      }
    };

    loadTrendingMovies();
  }, [trendingPage]);

  // Load top-rated movies
  useEffect(() => {
    const loadTopRatedMovies = async () => {
      setLoadingTopRated(true);
      try {
        const topRated = await fetchTopRatedMovies(topRatedPage);
        setTopRatedMovies(prev => [...prev, ...topRated]);
      } catch (error) {
        console.error('Error fetching top-rated movies:', error);
      } finally {
        setLoadingTopRated(false);
      }
    };

    loadTopRatedMovies();
  }, [topRatedPage]);

  const openModal = (movie) => {
    setCurrentMovie(movie);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentMovie(null);
  };

  const loadMoreTrending = () => {
    setTrendingPage(prev => prev + 1);
  };

  const loadMoreTopRated = () => {
    setTopRatedPage(prev => prev + 1);
  };

  return (
    <div className="p-4">
      <section className="relative bg-gray-100 rounded-lg overflow-hidden mb-8">
        <div className="relative z-10 pb-16">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-gray-800 relative inline-block">
              <span className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-gray-500 opacity-50 rounded-lg blur-md"></span>
              <span className="relative">Trending Movies</span>
            </h2>
            <FaFire className="text-4xl text-red-500 absolute right-0 top-1/2 transform -translate-y-1/2 mr-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingMovies.map(movie => (
              <MovieCard key={`trending-${movie.id}`} movie={movie} onClick={() => openModal(movie)} />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button
              className={`p-3 bg-teal-600 text-white rounded-lg shadow-lg transition-transform transform ${loadingTrending ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} ${loadingTrending ? 'bg-teal-400' : 'bg-teal-600'}`}
              onClick={loadMoreTrending}
              disabled={loadingTrending}
            >
              {loadingTrending ? 'Loading...' : 'Load More Trending'}
            </button>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-gray-800 to-transparent"></div>
      </section>
      
      <section className="relative bg-gray-100 rounded-lg overflow-hidden">
        <div className="relative z-10 pb-16">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-gray-800 relative inline-block">
              <span className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-red-500 opacity-50 rounded-lg blur-md"></span>
              <span className="relative">Top Rated Movies</span>
            </h2>
            <FaStar className="text-4xl text-yellow-500 absolute right-0 top-1/2 transform -translate-y-1/2 mr-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {topRatedMovies.map(movie => (
              <MovieCard key={`top-rated-${movie.id}`} movie={movie} onClick={() => openModal(movie)} />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button
              className={`p-3 bg-teal-600 text-white rounded-lg shadow-lg transition-transform transform ${loadingTopRated ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} ${loadingTopRated ? 'bg-teal-400' : 'bg-teal-600'}`}
              onClick={loadMoreTopRated}
              disabled={loadingTopRated}
            >
              {loadingTopRated ? 'Loading...' : 'Load More Top Rated'}
            </button>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-gray-800 to-transparent"></div>
      </section>

      {modalOpen && currentMovie && (
        <Modal movie={currentMovie} onClose={closeModal} />
      )}
    </div>
  );
};

export default Home;
