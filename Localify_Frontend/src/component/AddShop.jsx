import React, { useState } from "react";
import axios from "axios";

const AddShop = () => {
  const [wait, setWait] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: {
      city: "",
      state: "",
      country: "",
      pincode: "",
      latitude: "",
      longitude: "",
    },
    keyPeople: [{ name: "", position: "", info: "", keyPeopleImage: null }],
    tagline: "",
    brief_info: "",
    email: "",
    contact: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    video_url: "",
    theme: "theme_1",
    category: "",
    establishedYear:"",
    logo: null,
    banner_image: null,
    other_images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("location")) {
      const field = name.split("[")[1].split("]")[0];
      setFormData((prevData) => ({
        ...prevData,
        location: { ...prevData.location, [field]: value },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "logo" || name === "banner_image") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Only handle the first file
      }));
    } else if (name === "other_images") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: Array.from(files), // Convert FileList to array
      }));
    } else if (name.startsWith("keyPeopleImage")) {
      const index = parseInt(name.match(/\d+/)[0], 10);
      const newKeyPeople = [...formData.keyPeople];
      newKeyPeople[index].keyPeopleImage = files[0]; // Assign the file to keyPeopleImage
      setFormData((prevData) => ({
        ...prevData,
        keyPeople: newKeyPeople,
      }));
    }
  };

  const handleKeyPeopleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedKeyPeople = [...formData.keyPeople];
    updatedKeyPeople[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      keyPeople: updatedKeyPeople,
    }));
  };

  const addKeyPerson = () => {
    setFormData((prevData) => ({
      ...prevData,
      keyPeople: [
        ...prevData.keyPeople,
        { name: "", position: "", info: "", keyPeopleImage: null },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("tagline", formData.tagline);
    data.append("brief_info", formData.brief_info);
    data.append("email", formData.email);
    data.append("contact", formData.contact);
    data.append("linkedin", formData.linkedin);
    data.append("twitter", formData.twitter);
    data.append("instagram", formData.instagram);
    data.append("video_url", formData.video_url);
    data.append("theme", formData.theme);
    data.append("establishedYear", formData.establishedYear);
    data.append("category", formData.category);

    // Add location fields
    Object.keys(formData.location).forEach((key) => {
      data.append(`location[${key}]`, formData.location[key]);
    });

    // Add files
    if (formData.logo) data.append("logo", formData.logo);
    if (formData.banner_image) data.append("banner_image", formData.banner_image);
    formData.other_images.forEach((image) =>
      data.append("other_images", image)
    );

    // Add keyPeople to FormData, excluding the 'image' field
    const keyPeopleImages = [];
    formData.keyPeople.forEach((person, index) => {
      data.append(`keyPeople[${index}][name]`, person.name);
      data.append(`keyPeople[${index}][position]`, person.position);
      data.append(`keyPeople[${index}][info]`, person.info);
      const hasImage = person.keyPeopleImage ? true : false;
      data.append(`keyPeople[${index}][image]`, hasImage);
      if (person.keyPeopleImage) {
        keyPeopleImages.push(person.keyPeopleImage);
      }
    });

    // Append keyPeopleImages to FormData
    keyPeopleImages.forEach((image, index) => data.append(keyPeopleImages, image));
    const logFormData = (formData) => {
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: ${value.name}`); // For files, log the file name
        } else {
          console.log(`${key}: ${value}`); // For other values, log the value
        }
      }
    };
    
    try {
      setWait(true);

      logFormData(data)
      const response = await axios.post(
        "http://localhost:3000/api/shop/add",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setWait(false);
      alert("Shop added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding shop:", error);
      setWait(false);
      alert("Failed to add shop");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Shop</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label className="block mb-2">
          Shop Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>

        <fieldset className="border border-gray-200 rounded-md p-4 mb-4">
          <legend className="text-lg font-semibold mb-2">Location</legend>
          <label className="block mb-2">
            City:
            <input
              type="text"
              name="location[city]"
              value={formData.location.city}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label className="block mb-2">
            State:
            <input
              type="text"
              name="location[state]"
              value={formData.location.state}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label className="block mb-2">
            Country:
            <input
              type="text"
              name="location[country]"
              value={formData.location.country}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label className="block mb-2">
            Pincode:
            <input
              type="text"
              name="location[pincode]"
              value={formData.location.pincode}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label className="block mb-2">
            Latitude:
            <input
              type="number"
              name="location[latitude]"
              value={formData.location.latitude}
              onChange={handleChange}
              className="form-input"
              step="0.01"
              required
            />
          </label>
          <label className="block mb-2">
            Longitude:
            <input
              type="number"
              name="location[longitude]"
              value={formData.location.longitude}
              onChange={handleChange}
              className="form-input"
              step="0.01"
              required
            />
          </label>
        </fieldset>

        <fieldset className="border border-gray-200 rounded-md p-4 mb-4">
          <legend className="text-lg font-semibold mb-2">Key People</legend>
          {formData.keyPeople.map((person, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  name="name"
                  value={person.name}
                  onChange={(e) => handleKeyPeopleChange(index, e)}
                  className="form-input"
                  required
                />
              </label>
              <label className="block mb-2">
                Position:
                <input
                  type="text"
                  name="position"
                  value={person.position}
                  onChange={(e) => handleKeyPeopleChange(index, e)}
                  className="form-input"
                  required
                />
              </label>
              <label className="block mb-2">
                Info:
                <textarea
                  name="info"
                  value={person.info}
                  onChange={(e) => handleKeyPeopleChange(index, e)}
                  className="form-textarea"
                  required
                />
              </label>
              <label className="block mb-2">
                Image:
                <input
                  type="file"
                  name={`keyPeopleImage[${index}]`}
                  onChange={handleFileChange}
                  className="form-input"
                />
              </label>
            </div>
          ))}
          <button type="button" onClick={addKeyPerson} className="btn btn-blue">
            Add Key Person
          </button>
        </fieldset>
       
        <label className="block mb-2">
          Established Year:
          <input
            type="date"
            name="establishedYear"
            value={formData.establishedYear}
            onChange={handleChange}
            className="form-input"
          />
        </label>

        <label className="block mb-2">
          Tagline:
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="block mb-2">
          Brief Info:
          <textarea
            name="brief_info"
            value={formData.brief_info}
            onChange={handleChange}
            className="form-textarea"
          />
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="block mb-2">
          Contact:
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="block mb-2">
          LinkedIn:
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="block mb-2">
          Twitter:
          <input
            type="url"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="block mb-2">
          Instagram:
          <input
            type="url"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="block mb-2">
          Video URL:
          <input
            type="url"
            name="video_url"
            value={formData.video_url}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="block mb-2">
          Theme:
          <select
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            className="form-select"
          >
            <option value="theme_1">Theme 1</option>
            <option value="theme_2">Theme 2</option>
            <option value="theme_3">Theme 3</option>
            {/* Add more options as needed */}
          </select>
        </label>
        <label className="block mb-2">
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="block mb-2">
          Logo:
          <input
            type="file"
            name="logo"
            onChange={handleFileChange}
            className="form-input"
          />
        </label>
        <label className="block mb-2">
          Banner Image:
          <input
            type="file"
            name="banner_image"
            onChange={handleFileChange}
            className="form-input"
          />
        </label>
        <label className="block mb-2">
          Other Images:
          <input
            type="file"
            name="other_images"
            multiple
            onChange={handleFileChange}
            className="form-input"
          />
        </label>
        <button
          type="submit"
          disabled={wait}
          className={`btn ${wait ? "btn-disabled" : "btn-primary"}`}
        >
          {wait ? "Adding..." : "Add Shop"}
        </button>
      </form>
    </div>
  );
};

export default AddShop;