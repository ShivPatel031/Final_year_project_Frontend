import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

const T1_Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl p-8 mx-auto">
        {/* Contact Information Section */}
        <div
  className="bg-gradient-to-br rounded-lg p-8 text-white flex flex-col justify-between"
  style={{
    backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)"
  }}
>
  <div>

            <h2 className="text-3xl font-bold mb-4 overflow-hidden">Contact Information</h2>
            <p className="mb-6">Let's connect</p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-white" />
                <a href="mailto:localify5@gmail.com" className="text-white">localify5@gmail.com</a>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-white" />
                <p>Vadodara, Gujarat, India</p>
              </div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-8">
            <a href="#" className="text-white bg-white/20 p-2 rounded-full hover:bg-white/30">
              <FaLinkedin />
            </a>
            <a href="#" className="text-white bg-white/20 p-2 rounded-full hover:bg-white/30">
              <FaInstagram />
            </a>
            <a href="#" className="text-white bg-white/20 p-2 rounded-full hover:bg-white/30">
              <FaFacebook />
            </a>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700">Select Subject</label>
              <div className="flex gap-3 mt-1">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="subject"
                    value="General Inquiry"
                    onChange={handleChange}
                    className="text-blue-500 focus:ring-blue-500"
                    required
                  />
                  <span>General Inquiry</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="subject"
                    value="Technical Support"
                    onChange={handleChange}
                    className="text-blue-500 focus:ring-blue-500"
                    required
                  />
                  <span>Technical Support</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="subject"
                    value="Event Inquiry"
                    onChange={handleChange}
                    className="text-blue-500 focus:ring-blue-500"
                    required
                  />
                  <span>Event Inquiry</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="subject"
                    value="Feedback"
                    onChange={handleChange}
                    className="text-blue-500 focus:ring-blue-500"
                    required
                  />
                  <span>Feedback</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-700">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="mt-1 p-2 block w-full bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              ></textarea>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="px-6 py-3 bg-slate-800/90 text-white rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              
  style={{
    backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)"
  }}>
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default T1_Contact;