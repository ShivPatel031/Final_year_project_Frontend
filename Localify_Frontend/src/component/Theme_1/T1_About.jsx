import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhone, MdOutlineEmail } from "react-icons/md";

function T1_About({ shopData }) {
  return (
    <section className="w-full py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            {shopData.name}
          </h1>
          <p className="text-2xl text-gray-500 italic mb-6">
            {shopData.tagline}
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            {shopData.brief_info}
          </p>
        </div>

        {/* Banner Image */}
        <div className="mt-10 w-full">
          <img
            src={shopData.banner_image}
            alt="Shop Banner"
            className="w-full h-72 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Shop Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Shop Information
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              <span className="font-semibold">Established:</span>{" "}
              {new Date(shopData.establishedYear).getFullYear()}
            </p>
            <p className="text-lg text-gray-600 mb-4">
              <span className="font-semibold">Category:</span> {shopData.category}
            </p>
            <p className="text-lg text-gray-600 mb-4">
              <span className="font-semibold">Ratings:</span>{" "}
              {shopData.ratings?.average || "Not rated yet"}
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Visitors:</span> {shopData.visitors?.count || "N/A"}
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Shipping Information</h2>
            <p className="text-lg text-gray-600 mb-4">
              <span className="font-semibold">Shipping Zones:</span> {shopData.shipping_info?.zones || "Global"}
            </p>
            <p className="text-lg text-gray-600 mb-4">
              <span className="font-semibold">Delivery Time:</span>{" "}
              {shopData.shipping_info?.delivery_time?.min || 1}-{
                shopData.shipping_info?.delivery_time?.max || 5
              } business days
            </p>
            <a
              href={shopData.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Watch Our Introduction Video
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-800 mt-16 p-8 rounded-lg shadow-lg text-white">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email */}
            <div className="flex items-center space-x-4">
              <MdOutlineEmail className="text-3xl" />
              <div>
                <p className="text-xl font-semibold">Email</p>
                <p>{shopData.email}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-4">
              <MdOutlinePhone className="text-3xl" />
              <div>
                <p className="text-xl font-semibold">Phone</p>
                <p>{shopData.contact}</p>
              </div>
            </div>

            {/* Location */}
            {shopData.location && (
              <div className="flex items-center space-x-4">
                <IoLocationOutline className="text-3xl" />
                <div>
                  <p className="text-xl font-semibold">Location</p>
                  <p>
                    {shopData.location.city}, {shopData.location.state},{" "}
                    {shopData.location.pincode}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Social Links Section */}
        <div className="flex justify-center space-x-6 mt-12">
          {shopData.linkedin && (
            <a
              href={shopData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-blue-700 text-3xl"
            >
              <FaLinkedin />
            </a>
          )}
          {shopData.twitter && (
            <a
              href={shopData.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-blue-500 text-3xl"
            >
              <FaTwitter />
            </a>
          )}
          {shopData.instagram && (
            <a
              href={shopData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-pink-500 text-3xl"
            >
              <FaInstagram />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default T1_About;