import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaHeart, FaUser, FaFilter, FaTimes } from 'react-icons/fa';
import { searchMovies, fetchGenres } from '/src/api';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: localStorage.getItem('userName') || 'Guest',
    email: localStorage.getItem('userEmail') || '',
    image: localStorage.getItem('profileImage') || 'https://via.placeholder.com/150'
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadGenres = async () => {
      const genresData = await fetchGenres();
      setGenres(genresData);
    };
    loadGenres();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const fetchSuggestions = async () => {
        const results = await searchMovies(searchQuery);
        setSuggestions(results);
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      // Assuming you fetch user details based on token
      const user = {
        name: localStorage.getItem('userName') || 'John Doe',
        email: localStorage.getItem('userEmail') || 'john.doe@example.com',
        image: localStorage.getItem('profileImage') || 'https://via.placeholder.com/150'
      };
      setUserInfo(user);
    }
  }, []);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    const results = await searchMovies(searchQuery, selectedGenre, selectedRating);
    navigate('/search-results', { state: { results } });
    toggleSearch();
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('profileImage');
    setIsLoggedIn(false);
    setUserInfo({
      name: 'Guest',
      email: '',
      image: 'https://via.placeholder.com/150'
    });
    setShowLogoutModal(false);
    window.location.reload();  // Refresh the page
    navigate('/login');  // Redirect to login page
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-teal-400 mr-8 hover:text-teal-300 transition-colors duration-300">
          ABmovies
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-lg hover:text-teal-400 transition-colors duration-300">Home</Link>
          <Link to="/favorites" className="text-lg hover:text-teal-400 transition-colors duration-300">Favorites</Link>
          <Link to="/about" className="text-lg hover:text-teal-400 transition-colors duration-300">About</Link>
          <Link to="/contact" className="text-lg hover:text-teal-400 transition-colors duration-300">Contact</Link>
        </nav>

        {/* Search Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSearch}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-full p-3 flex items-center transition-colors duration-300 transform hover:scale-105"
          >
            <FaSearch size={22} />
            <span className="ml-2 hidden md:inline text-lg">Search</span>
          </button>

          {/* User Profile or Sign In */}
          <div className="flex items-center space-x-4">
            <Link to="/favorites" className="hover:text-teal-400 transition-colors duration-300">
              <FaHeart size={24} />
            </Link>
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
               <Link to="/profile"> <img src={userInfo.image} alt="Profile" className="w-8 h-8 rounded-full" /></Link>
                <span className="hidden md:inline text-lg"></span>
                <button onClick={handleLogout} className="text-sm hover:text-teal-400 transition-colors duration-300">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-2 hover:text-teal-400 transition-colors duration-300">
                <FaUser size={24} />
                <span className="hidden md:inline text-lg">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Search Section */}
      {showSearch && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center p-6 z-50">
          <div className="bg-gray-800 text-white p-8 rounded-lg relative w-full md:max-w-2xl lg:max-w-3xl">
            <button
              className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full p-2"
              onClick={toggleSearch}
            >
              <FaTimes size={24} />
            </button>
            <h2 className="text-3xl font-bold mb-4">Search Movies</h2>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <FaSearch className="absolute top-2 right-4 text-gray-500" size={20} />
              {suggestions.length > 0 && (
                <div className="absolute w-full bg-gray-800 mt-1 rounded-md shadow-lg">
                  {suggestions.map((movie) => (
                    <div
                      key={movie.id}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        setSearchQuery(movie.title);
                        setSuggestions([]);
                      }}
                    >
                      {movie.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-4">
            
              
              <div className="flex justify-center">
                <button
                  onClick={handleSearch}
                  className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6 py-3 flex items-center"
                >
                  
                  SEARCH
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center p-6 z-50">
          <div className="bg-gray-800 text-white p-8 rounded-lg relative w-full max-w-sm">
            <button
              className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full p-2"
              onClick={() => setShowLogoutModal(false)}
            >
              <FaTimes size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-around">
              <button
                onClick={confirmLogout}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-3 flex items-center"
              >
                Yes, Log Out
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white rounded-full px-6 py-3 flex items-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
