const User = require('../models/UserDetails');
const bcrypt = require('bcrypt');
const upload = require('../middleware/multer'); 

exports.details = async (req, res) => {

  try {
    const { userId } = req.params; // Extract userId from params

    // Find the user in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with user details
    res.status(200).json({
      userId: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Update Username

exports.updateUsername = async (req, res) => {
  const { userId, newUsername } = req.body;

  if (!userId || !newUsername) {
    return res.status(400).json({ message: 'User ID and new username are required.' });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, { username: newUsername }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ message: 'Username updated successfully.', user });
  } catch (error) {
    console.error('Error updating username:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Update Email
exports.updateEmail = async (req, res) => {
  const { userId, newEmail } = req.body;

  if (!userId || !newEmail) {
    return res.status(400).json({ message: 'User ID and new email are required.' });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, { email: newEmail }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ message: 'Email updated successfully.', user });
  } catch (error) {
    console.error('Error updating email:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Update Password
exports.updatePassword = async (req, res) => {
  const { userId, newPassword } = req.body;
  if (!userId || !newPassword) {
    return res.status(400).json({ message: 'User ID and new email are required.' });
  }

  try {

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword
    await user.save(); 
   
    res.status(200).json({ message: 'Password updated successfully.', user });
  } catch (error) {
    console.error('Error updating password:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
};


exports.updateProfilePicture = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Process the uploaded file (e.g., store its URL in the database)
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ profilePicture: imageUrl });
};