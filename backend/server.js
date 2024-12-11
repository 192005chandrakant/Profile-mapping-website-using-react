const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017/profilesDB'; // Replace with your MongoDB URI
mongoose
.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if the connection fails
  });;

// Mongoose Schema and Model
const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
});

const Profile = mongoose.model('Profile', profileSchema);

// Routes

// Get all profiles
app.get('/api/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
});

// Get a single profile by ID
app.get('/api/profiles/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Add a new profile
app.post('/api/profiles', async (req, res) => {
  const { name, photo, description, address } = req.body;
  try {
    const newProfile = new Profile({ name, photo, description, address });
    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (err) {
    console.error('Error while saving profile:', err);
    res.status(500).json({ error: 'Failed to create profile' });
  }
});

// Update an existing profile by ID
app.put('/api/profiles/:id', async (req, res) => {
  const { name, photo, description, address } = req.body;
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      { name, photo, description, address },
      { new: true }
    );
    if (!updatedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Delete a profile by ID
app.delete('/api/profiles/:id', async (req, res) => {
  try {
    const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
    if (!deletedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json({ message: 'Profile deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete profile' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});