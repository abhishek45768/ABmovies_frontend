// src/api.js
import axios from 'axios';

const API_KEY = 'f03702d5a953691626be0bb254ff43ee'; // Replace with your TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrendingMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
      params: {
        api_key: API_KEY,
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

export const fetchTopRatedMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
      params: {
        api_key: API_KEY,
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching top-rated movies:', error);
    return [];
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return {};
  }
};

export const fetchMovieCast = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.cast;
  } catch (error) {
    console.error('Error fetching movie cast:', error);
    return [];
  }
};

export const searchMovies = async (query = '', genre = '', rating = '') => {
  try {
    const params = {
      api_key: API_KEY,
      query: query || undefined,
      with_genres: genre || undefined,
      'vote_average.gte': rating || undefined,
    };

    const response = await axios.get(`${BASE_URL}/search/movie`, { params });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const filterMovies = async (genre = '', rating = '') => {
  try {
    const params = {
      api_key: API_KEY,
      with_genres: genre || undefined,
      'vote_average.gte': rating || undefined,
    };

    const response = await axios.get(`${BASE_URL}/discover/movie`, { params });
    return response.data.results;
  } catch (error) {
    console.error('Error filtering movies:', error);
    return [];
  }
};

  
  
  

  
  export const fetchGenres = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
        params: {
          api_key: API_KEY,
        },
      });
      return response.data.genres;
    } catch (error) {
      console.error('Error fetching genres:', error);
      return [];
    }
  };
  export const fetchMovies = async ({ term = '', genre = '', rating = '' }) => {
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        query: term,
        with_genres: genre,
        'vote_average.gte': rating,
      },
    });
  
    return response.data.results;
  };
  // src/api.js


  
  
export const fetchMovieTrailer = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
      params: {
        api_key: API_KEY,
      },
    });
    const trailer = response.data.results.find(video => video.type === 'Trailer');
    return trailer ? trailer : {};
  } catch (error) {
    console.error('Error fetching movie trailer:', error);
    return {};
  }
};
const handleSearch = async () => {
  // Avoid empty query
  if (!searchQuery.trim() && !selectedGenre && !selectedRating) return;

  let results = [];

  // Handle search with or without filters
  if (searchQuery.trim()) {
    results = await searchMovies(searchQuery, selectedGenre, selectedRating);
  } else {
    // If there's no search query, only apply filters
    results = await filterMovies(selectedGenre, selectedRating);
  }

  console.log('Search Results:', results); // Check the results
  navigate('/search-results', { state: { results } });
  toggleSearch();
};

  