// src/components/Footer.jsx

import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Social Media Links */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
            <FaInstagram size={24} />
          </a>
        </div>

        {/* App Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
        <Link to="/about" className="hover:text-teal-400">About</Link>
          <Link to="/contact" className="hover:text-teal-400">Contact</Link>
          <Link to="/policy" className="hover:text-teal-400">Privacy Policy</Link>
        </div>

        {/* Copyright */}
        <div className="text-sm">
          © {new Date().getFullYear()} ABmovies. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
