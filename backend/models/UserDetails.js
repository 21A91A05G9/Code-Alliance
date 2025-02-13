const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    trim: true,
    default: '',
  },
  profession: {
    type: String,
    trim: true,
    default: '',
  },
  phone: {
    type: String,
    trim: true,
    default: '',
  },
  codingProfiles: {
    leetcode: {
      username: { type: String, trim: true, default: '' },
    },
    codechef: {
      username: { type: String, trim: true, default: '' },
    },
    geeksforgeeks: {
      username: { type: String, trim: true, default: '' },
    },
  },
  profilePicture: { type: String, default: '' },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
