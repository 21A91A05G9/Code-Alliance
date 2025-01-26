const {
    validateLeetCodeUser,
    validateGFGUser,
    validateCodeChefUser,
} = require('../services/platformValidationService');

const validateUsername = async (req, res) => {
    const { username, platform } = req.body;

    if (!username || !platform) {
        return res.status(400).json({ error: "Username and platform are required" });
    }

    try {
        let validUser = false;

        if (platform === "LeetCode") {
            validUser = await validateLeetCodeUser(username);
        } else if (platform === "GeeksForGeeks") {
            validUser = await validateGFGUser(username);
        } else if (platform === "CodeChef") {
            validUser = await validateCodeChefUser(username);
        }

        if (validUser) {
            res.json({ validUser: true });
        } else {
            res.json({
                validUser: false,
                error: "Invalid username for this platform",
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

module.exports = validateUsername;
