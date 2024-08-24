import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import Home from '../pages/Home';
import MovieDetails from '../pages/MovieDetails';
import Favorites from '../pages/Favorites';
import SearchResults from '../pages/SearchResults';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import About from '../pages/About';
import ContactUs from '../pages/ContactUs';
import PrivacyPolicy from '../pages/PrivacyPolicy';
const RouterComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/about" element={<About />} />
      <Route path="/policy" element={<PrivacyPolicy />} />
      <Route
        path="/login"
        element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/profile" />}
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/profile"
        element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
      />
      <Route
        path="/favorites"
        element={isLoggedIn ? <Favorites /> : <Navigate to="/login" />}
      />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/search-results" element={<SearchResults />} />
    </Routes>
  );
};

export default RouterComponent;
