import React, { useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/contact', formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Error sending message. Please try again later.');
    }
  };

  return (
    <section className="contact-us bg-gray-900 text-white py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-yellow-500">Contact Us</h2>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <label htmlFor="name" className="block text-lg font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-lg font-semibold mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded-full hover:bg-yellow-400 transition duration-300"
          >
            Send Message
          </button>
          {status && <p className="mt-4 text-center text-lg">{status}</p>}
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
