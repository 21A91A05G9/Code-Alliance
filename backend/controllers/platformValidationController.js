const {
    validateLeetCodeUser,
    validateGFGUser,
    validateCodeChefUser,
} = require('../services/platformValidationService');

const validateUsername = async (req, res) => {
    const { username, platform } = req.body;

    console.log("Request received:", { username, platform });

    if (!username || !platform) {
        console.log("Validation failed: Missing username or platform");
        return res.status(400).json({ error: "Username and platform are required" });
    }

    try {
        let validUser = false;

        if (platform === "LeetCode") {
            console.log("Validating LeetCode user:", username);
            validUser = await validateLeetCodeUser(username);
        } else if (platform === "GeeksForGeeks") {
            console.log("Validating GFG user:", username);
            validUser = await validateGFGUser(username); // Call and return result
        } else if (platform === "CodeChef") {
            console.log("Validating CodeChef user:", username);
            validUser = await validateCodeChefUser(username);
        }

        console.log("Validation result:", validUser);

        if (validUser) {
            return res.json(validUser);
        } else {
            return res.status(400).json({
                validUser: false,
                error: "Invalid username for this platform",
            });
        }
    } catch (error) {
        console.error("Error in validateUsername:", error); // Log the error
        return res.status(500).json({ error: "Internal server error", details: error.message });
    }
};



module.exports = validateUsername;
