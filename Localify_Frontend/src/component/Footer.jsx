import { SiFacebook, SiInstagram, SiSnapchat } from "react-icons/si";

function Footer() {
  return (
    <footer className="w-full bg-black border-t  text-white py-8 px-6 lg:px-32">
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

export { Footer };
