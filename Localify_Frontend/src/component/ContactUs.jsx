import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    subject: 'General', // Default subject
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 p-2 block w-full bg-gray-200 rounded border border-gray-300 focus:border-gray-500 focus:ring-gray-500"
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
              className="mt-1 p-2 block w-full bg-gray-200 rounded border border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full bg-gray-200 rounded border border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Subject</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 p-2 block w-full bg-gray-200 rounded border border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              required
            >
              <option value="General">General</option>
              <option value="Technical">Technical</option>
              <option value="Inquiry">Inquiry</option>
              <option value="Feedback">Feedback</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="mt-1 p-2 block w-full bg-gray-200 rounded border border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
