import React from 'react';

function AboutUs() {
  return (
    <section className="py-16 px-6 bg-gray-50 mt-10 ">
      {/* Container Wrapper */}
      <div className="container mx-auto text-center">
        {/* About Us Header */}
        <h2 className="text-4xl font-bold mb-4">About Us</h2>
        
        {/* Platform Introduction */}
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
          Welcome to <strong>Localify</strong>, a platform designed to help small and local businesses transition to the online world effortlessly. 
          Whether you want to <strong>shop, sell, or showcase products</strong>, Localify makes it easy. Our mission is to empower businesses 
          by offering customizable templates for creating websites that can help them engage with their customers and boost their sales.
        </p>

        {/* Platform Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-lg border-slate-300 border-2 hover:shadow-xl hover:scale-105">
            <h3 className="text-3xl font-bold text-blue-600">500+</h3>
            <p className="text-gray-600">Local Shops Registered</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border-slate-300 border-2 hover:shadow-xl hover:scale-105">
            <h3 className="text-3xl font-bold text-blue-600">10K+</h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border-slate-300 border-2 hover:shadow-xl hover:scale-105">
            <h3 className="text-3xl font-bold text-blue-600">50K+</h3>
            <p className="text-gray-600">Orders Placed</p>
          </div>
        </div>

        {/* Platform Description */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-slate-800 ">What is Localify?</h3>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Localify is a comprehensive solution for local businesses to create their own e-commerce website using pre-built templates. 
            With easy-to-follow steps, business owners can set up online stores, showcase their products, and reach new customers with minimal effort. 
            Localify ensures that businesses can thrive in the digital world while staying connected to their local community.
          </p>
        </div>

        {/* Developer Team Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Meet Our Developer Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <img
                src="https://via.placeholder.com/150" 
                alt="Het Patel"
                className="w-24 h-24 rounded-full mb-4"
              />
              <h4 className="text-xl font-semibold">Het Patel</h4>
              <p className="text-gray-600">Backend Developer</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://via.placeholder.com/150" 
                alt="Aditya Pitroda"
                className="w-24 h-24 rounded-full mb-4"
              />
              <h4 className="text-xl font-semibold">Aditya Pitroda</h4>
              <p className="text-gray-600">Backend Developer</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://via.placeholder.com/150" 
                alt="Karan Suthar"
                className="w-24 h-24 rounded-full mb-4"
              />
              <h4 className="text-xl font-semibold">Karan Suthar</h4>
              <p className="text-gray-600">Frontend Developer</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://via.placeholder.com/150" 
                alt="Shiv Patel"
                className="w-24 h-24 rounded-full mb-4"
              />
              <h4 className="text-xl font-semibold">Shiv Patel</h4>
              <p className="text-gray-600">Frontend Developer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
