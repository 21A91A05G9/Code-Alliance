const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure 'uploads' folder exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // Store files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    // Use timestamp and original file extension for unique filenames
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with storage configuration
const upload = multer({
  storage: storage,  // Use the storage configuration
  limits: { fileSize: 10 * 1024 * 1024 },  // Limit file size to 10 MB
}).single('profilePicture');  // Accept a single file with the name 'profilePicture'

module.exports = upload;  // Export multer middleware
