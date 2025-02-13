const User = require("../models/UserDetails");

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const { _id, username, email, phone, location, profession} = req.body;
        console.log(_id, email, username)
        const updatedUser = await User.findOneAndUpdate(
            { _id}, 
            { email, username, location, phone, profession},
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { updateProfile };
