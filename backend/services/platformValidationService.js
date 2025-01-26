const axios = require('axios');

// Validate LeetCode User
const validateLeetCodeUser = async (username) => {
    fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Referer: "https://leetcode.com",
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
        body: JSON.stringify({ query: query, variables: { username } }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.errors) {
                // Username is invalid
                return res.status(400).json({ validUser: false, error: "Invalid LeetCode username" });
            }

            // Username is valid
            res.json({ validUser: true });
        })
        .catch((error) => {
            console.error("Error validating LeetCode username:", error);
            res.status(500).json({ error: "Internal server error", details: error.message });
        });
};

// Validate GeeksForGeeks User
const validateGFGUser = async (username) => {
    try {
        const response = await axios.get(`https://api.geeksforgeeks.org/user/${username}`);
        return response.data.exists; // Assume the API has an `exists` field
    } catch (error) {
        console.error("Error validating GFG user:", error);
        return false;
    }
};

// Validate CodeChef User
const validateCodeChefUser = async (username) => {
    try {
        const response = await axios.get(`https://api.codechef.com/users/${username}`);
        return response.data.exists; // Assume the API has an `exists` field
    } catch (error) {
        console.error("Error validating CodeChef user:", error);
        return false;
    }
};

module.exports = {
    validateLeetCodeUser,
    validateGFGUser,
    validateCodeChefUser,
};
