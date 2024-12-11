import React, { useState } from "react";
import axios from "axios";

const AddProfileForm = ({ onProfileAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    description: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/profiles", formData);
      onProfileAdded(response.data); // Callback to update the list
      setFormData({ name: "", photo: "", description: "", address: "" }); // Clear the form
      alert("Profile added successfully!");
    } catch (error) {
      console.error("Error adding profile:", error);
      alert("Failed to add profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="photo"
          placeholder="Photo URL"
          value={formData.photo}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
      >
        Add Profile
      </button>
    </form>
  );
};

export default AddProfileForm;
