import React, { useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    description: "",
    address: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/profiles", formData);
      setSuccessMessage("Profile added successfully!");
      setFormData({ name: "", photo: "", description: "", address: "" }); // Reset form
      console.log("Profile added:", response.data);
    } catch (error) {
      console.error("Error adding profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-10 px-5">
      <div className="w-full max-w-2xl bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Add New Profile</h1>
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Photo URL:</label>
            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Add Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
