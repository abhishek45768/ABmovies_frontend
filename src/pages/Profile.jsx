import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || null);
  const userName = localStorage.getItem('userName') || 'Guest User';
  const userEmail = localStorage.getItem('userEmail') || 'guest@example.com';
  const defaultImage = 'https://via.placeholder.com/150';
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      localStorage.setItem('profileImage', imageUrl);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={profileImage || defaultImage}
              alt="Profile"
              className="w-32 h-32 object-cover bg-black rounded-full border-2 border-gray-300"
            />
            <label
              htmlFor="profileImage"
              className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition duration-300"
            >
              <FaCamera size={20} />
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold mb-2">{userName}</h2>
            <p className="text-gray-600 mb-4">{userEmail}</p>
            <button
              className="py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={() => navigate('/favorites')}
            >
              Go to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
