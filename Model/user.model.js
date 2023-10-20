const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email addresses are unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'Project Manager', 'Team Member'],
    default: 'Team Member', // Default role if not specified
  },
  profilePicture: {
    type: String, // You can store the file path or a URL to the user's profile picture here
  },
});

// Create and export the User model
const UserModel = mongoose.model('User', userSchema);

module.exports = {UserModel};
