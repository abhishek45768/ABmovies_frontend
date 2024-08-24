import React from 'react';
import {Link} from 'react-router-dom'
const About = () => {
  return (
    <section className="about-section bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <h2 className="text-5xl font-extrabold text-center mb-12 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500">
          About ABmovies
        </h2>

        {/* Welcome Section */}
        <div className="mb-16 text-center">
          <h3 className="text-3xl font-bold mb-6 text-yellow-400">Your Ultimate Movie Destination</h3>
          <p className="text-xl leading-relaxed max-w-3xl mx-auto">
            At <span className="text-yellow-500">ABmovies</span>, we live and breathe cinema. From the latest blockbusters to the timeless classics, our platform is your gateway to an exceptional movie experience. Whether it's thrilling action, deep drama, or hilarious comedy, <span className="text-yellow-500">ABmovies</span> brings something special to every movie lover.
          </p>
        </div>

        {/* Why Choose ABmovies Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-yellow-400">Why Choose ABmovies?</h3>
            <ul className="space-y-4 text-lg leading-relaxed">
              <li className="flex items-start">
                <span className="inline-block text-yellow-500 text-2xl mr-4">🎬</span>
                <div><span className="font-bold">Extensive Library:</span> Dive into our expansive collection of movies spanning every genre.</div>
              </li>
              <li className="flex items-start">
                <span className="inline-block text-yellow-500 text-2xl mr-4">🔍</span>
                <div><span className="font-bold">Personalized Recommendations:</span> Discover movies tailored just for you.</div>
              </li>
              <li className="flex items-start">
                <span className="inline-block text-yellow-500 text-2xl mr-4">⚡</span>
                <div><span className="font-bold">Seamless Experience:</span> Enjoy a smooth, responsive interface on any device.</div>
              </li>
              <li className="flex items-start">
                <span className="inline-block text-yellow-500 text-2xl mr-4">🌟</span>
                <div><span className="font-bold">Community Driven:</span> Join a passionate community of movie enthusiasts.</div>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <div className="p-8 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105">
              <h4 className="text-2xl font-bold text-yellow-400 mb-2">What Sets Us Apart</h4>
              <p className="text-lg">
                We go beyond just streaming movies. ABmovies is about delivering a cinematic experience that stays with you. Our unique combination of curation, community, and cutting-edge technology makes movie watching extraordinary.
              </p>
            </div>
            <div className="p-8 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105">
              <h4 className="text-2xl font-bold text-yellow-400 mb-2">Our Vision</h4>
              <p className="text-lg">
                To be the ultimate destination for movie lovers worldwide, where every film you watch leaves a lasting impression.
              </p>
            </div>
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="mb-16 text-center">
          <h3 className="text-3xl font-bold mb-6 text-yellow-400">Our Mission</h3>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto">
            At <span className="text-yellow-500">ABmovies</span>, we strive to create a space where finding, watching, and discussing films is effortless. We believe in the power of movies to inspire, challenge, and bring people together. Every moment spent with <span className="text-yellow-500">ABmovies</span> is designed to be unforgettable.
          </p>
        </div>

        {/* Join Community Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-6 text-yellow-400">Join the ABmovies Community</h3>
          <p className="text-xl leading-relaxed mb-12 max-w-3xl mx-auto">
            Become part of a vibrant community that shares your passion for cinema. With <span className="text-yellow-500">ABmovies</span>, every movie night becomes an extraordinary experience.
          </p>
         <Link to="/"> <button className="bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500 text-gray-900 font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105">
            Get Started
          </button></Link>
        </div>
      </div>
    </section>
  );
};

export default About;
