const User = require('../models/UserDetails');

// Register User
exports.registerUser = async (req, res) => {
  const { username, email, password, confirmPassword, codingProfiles } = req.body;

  // Basic validation
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Create and save new user
    const newUser = new User({
      username,
      email,
      password,
      codingProfiles, // Includes leetcode, codechef, geekforgeeks profiles
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
};
