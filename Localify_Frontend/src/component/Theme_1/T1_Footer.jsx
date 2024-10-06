// import { SiFacebook, SiInstagram, SiSnapchat } from "react-icons/si";

// function T1_Footer() {
//   return (
//     <footer className="w-full bg-gray-900 text-white py-8 px-6 lg:px-32">
//       <div className="flex justify-between items-center">
//         {/* Logo and Socials */}
//         <div className="flex flex-col items-start space-y-4">
//           <a href="/" className="flex items-center ">
           
//             <h1 className="text-3xl font-bold h-[65px] p-2 fancyFont  overflow-hidden">Localify</h1>
//           </a>
//           <div className="flex space-x-6">
//             <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
//               <SiFacebook className="text-2xl hover:text-blue-500" />
//             </a>
//             <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
//               <SiInstagram className="text-2xl hover:text-pink-500" />
//             </a>
//             <a href="https://www.snapchat.com" target="_blank" rel="noreferrer">
//               <SiSnapchat className="text-2xl hover:text-yellow-500" />
//             </a>
//           </div>
//         </div>

//         {/* Additional Links */}
//         <div className="grid grid-cols-2 gap-4 text-sm">
//           <div>
//             <h3 className="font-semibold mb-3">Company</h3>
//             <ul className="space-y-2">
//               <li><a href="#" className="hover:underline">About Us</a></li>
//               <li><a href="#" className="hover:underline">Careers</a></li>
//               <li><a href="#" className="hover:underline">Blog</a></li>
//               <li><a href="#" className="hover:underline">Contact</a></li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="font-semibold mb-3">Support</h3>
//             <ul className="space-y-2">
//               <li><a href="#" className="hover:underline">Help Center</a></li>
//               <li><a href="#" className="hover:underline">Terms of Service</a></li>
//               <li><a href="#" className="hover:underline">Privacy Policy</a></li>
//               <li><a href="#" className="hover:underline">FAQ</a></li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Copyright */}
//       <div className="mt-8 text-center text-sm text-gray-400">
//         &copy; 2024 Localify. All rights reserved.
//       </div>
//     </footer>
//   );
// }

// export { T1_Footer };

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

// const T1_Footer = ({ shopData, shopLogo }) => {
//   const currentYear = new Date().getFullYear();

//   const socialLinks = [
//     { icon: FaFacebookF, url: shopData.socialMedia?.facebook || '#' },
//     { icon: FaTwitter, url: shopData.socialMedia?.twitter || '#' },
//     { icon: FaInstagram, url: shopData.socialMedia?.instagram || '#' },
//     { icon: FaLinkedinIn, url: shopData.socialMedia?.linkedin || '#' },
//   ];

//   const footerLinks = [
//     { title: 'Home', path: `/shops/${shopData._id}/` },
//     { title: 'Products', path: `/shops/${shopData._id}/product` },
//     { title: 'About Us', path: `/shops/${shopData._id}/about` },
//     { title: 'Contact', path: `/shops/${shopData._id}/contact` },
//     { title: 'Privacy Policy', path: `/shops/${shopData._id}/privacy-policy` },
//     { title: 'Terms of Service', path: `/shops/${shopData._id}/terms-of-service` },
//   ];

//   return (
//     <footer className="bg-gray-900 text-white">
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Shop Logo and Info */}
//           <div className="flex flex-col items-center md:items-start">
//             <Link to={`/shops/${shopData._id}/`} className="mb-4">
//               <img src={shopLogo} alt={`${shopData.name} logo`} className="w-16 h-16 object-contain" />
//             </Link>
//             <h3 className="text-2xl font-bold mb-2">{shopData.name}</h3>
//             <p className="mb-4 text-gray-400 text-center md:text-left">{shopData.tagline}</p>
//             <div className="flex space-x-4">
//               {socialLinks.map((social, index) => (
//                 <a
//                   key={index}
//                   href={social.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
//                 >
//                   <social.icon className="text-xl" />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2">
//               {footerLinks.map((link, index) => (
//                 <li key={index}>
//                   <Link
//                     to={link.path}
//                     className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
//                   >
//                     {link.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
//             <ul className="space-y-2">
//               <li className="flex items-center text-gray-400">
//                 <FaEnvelope className="mr-2 text-indigo-400" />
//                 <a href={`mailto:${shopData.email}`} className="hover:text-indigo-400 transition-colors duration-300">
//                   {shopData.email}
//                 </a>
//               </li>
//               <li className="flex items-center text-gray-400">
//                 <FaPhone className="mr-2 text-indigo-400" />
//                 <a href={`tel:${shopData.contact}`} className="hover:text-indigo-400 transition-colors duration-300">
//                   {shopData.contact}
//                 </a>
//               </li>
//               {shopData.location && (
//                 <li className="flex items-start text-gray-400">
//                   <FaMapMarkerAlt className="mr-2 mt-1 text-indigo-400" />
//                   <span>
//                     {shopData.location.city}, {shopData.location.state}, {shopData.location.pincode}
//                   </span>
//                 </li>
//               )}
//             </ul>
//           </div>

//           {/* Newsletter Signup */}
//           <div>
//             <h4 className="text-xl font-semibold mb-4">Stay Updated</h4>
//             <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
//             <form className="flex flex-col sm:flex-row">
//               <input
//                 type="email"
//                 placeholder="Your email address"
//                 className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2 sm:mb-0"
//               />
//               <button
//                 type="submit"
//                 className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition-colors duration-300"
//               >
//                 Subscribe
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
//           <p>&copy; {currentYear} {shopData.name}. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default T1_Footer;

import { SiFacebook, SiInstagram, SiSnapchat } from "react-icons/si";

function T1_Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-8 px-6 lg:px-32">
      <div className="flex justify-between items-center">
        {/* Logo and Socials */}
        <div className="flex flex-col items-start space-y-4">
          <a href="/" className="flex items-center ">
           
            <h1 className="text-3xl font-bold h-[65px] p-2 fancyFont  overflow-hidden">Localify</h1>
          </a>
          <div className="flex space-x-6">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <SiFacebook className="text-2xl hover:text-blue-500" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              <SiInstagram className="text-2xl hover:text-pink-500" />
            </a>
            <a href="https://www.snapchat.com" target="_blank" rel="noreferrer">
              <SiSnapchat className="text-2xl hover:text-yellow-500" />
            </a>
          </div>
        </div>

        {/* Additional Links */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm text-gray-400">
        &copy; 2024 Localify. All rights reserved.
      </div>
    </footer>
  );
}

export { T1_Footer };
