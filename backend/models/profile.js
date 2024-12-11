const mongoose = require("mongoose");

// Define the schema for the Profile model
const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
});

// Create and export the Profile model
const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
