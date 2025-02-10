const axios = require("axios");
const cheerio = require('cheerio');  


const validateLeetCodeUser = async (username) => {
    if (!username) {
        throw new Error("Username is required");
    }

    const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

    // Updated query without contestRanking, using contestBadge instead
    const query = `
        query userPublicProfile($username: String!) {
            matchedUser(username: $username) {
                username
                profile {
                    realName
                    reputation
                    ranking
                }
                submitStatsGlobal {
                    acSubmissionNum {
                        difficulty
                        count
                    }
                }
                contestBadge {
                    name
                    icon
                }
            }
        }
    `;

    try {
        console.log("Validating username:", username); // Log username

        const response = await axios.post(
            LEETCODE_GRAPHQL_URL,
            {
                query,
                variables: { username },
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Referer: "https://leetcode.com",
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                },
            }
        );

        // Log the API response for debugging
        console.log("LeetCode API response:", response.data);

        if (response.data.errors) {
            console.error("LeetCode API errors:", response.data.errors);
            return { validUser: false, error: "Invalid LeetCode username" };
        }

        const userData = response.data.data.matchedUser;

        if (!userData) {
            return { validUser: false, error: "User not found" };
        }

        // Extracting data
        const {
            username: userName,
            profile,
            submitStatsGlobal,
            contestBadge,
        } = userData;

        // Extracting the problem solved counts for each difficulty level
        const problemsSolved = submitStatsGlobal.acSubmissionNum.reduce((acc, item) => {
            acc[item.difficulty] = item.count;
            return acc;
        }, {});

        // Return the user data along with problem counts and contest badge
        return {
            validUser: true,
            username: userName,
            profile,
            problemsSolved: {
                easy: problemsSolved.Easy || 0,
                medium: problemsSolved.Medium || 0,
                hard: problemsSolved.Hard || 0,
            },
            contestBadge: contestBadge
                ? {
                      name: contestBadge.name,
                      icon: contestBadge.icon,
                  }
                : "No Badge",
        };
    } catch (error) {
        console.error("Error validating LeetCode username:", error.message);
        if (error.response) {
            console.error("Response error data:", error.response.data); // Log full response error
        }
        throw new Error("Internal server error");
    }
};


// Validate GeeksForGeeks User

const validateGFGUser = async (username) => {
    try {

        if (!username) {
            return { validUser: false, message: "Username and platform are required" };
        }

        // Construct the URL for scraping the GFG user's problem stats
        const url = `https://auth.geeksforgeeks.org/user/${username}/practice/`;

        // Fetch the HTML of the GFG user's page
        const html = await axios.get(url);

        // Load the HTML into Cheerio
        const $ = cheerio.load(html.data);

        // Extract rank, streak, overallScore, and other data using selectors
        let rank = $(".rank .value").text().trim();
        let streak = $(".streak .value").text().trim();
        let overallScore = $(".totalScore .value").text().trim();
        let monthlyScore = $(".monthlyScore .value").text().trim();
        let totalSolved = $(".solvedProblems .value").text().trim();

        // Extract problem counts by difficulty (easy, medium, hard)
        let problemDifficultyTag = ["easy", "medium", "hard"];
        let values = {
            easy: 0,
            medium: 0,
            hard: 0,
            totalSolved: totalSolved || 0,
            rank: rank || "N/A",
            streak: streak || "N/A",
            overallScore: overallScore || "N/A",
            monthlyScore: monthlyScore || "N/A",
            UserName: username,
        };

        // Extract the problem counts (easy, medium, hard) dynamically from the page
        let data = $(".tabs.tabs-fixed-width.linksTypeProblem");
        let rawData = $(data[0]).text();  // Assuming the data is in text format

        // Loop through the raw data to extract problem counts by difficulty
        let k = 0;
        for (let i = 0; i < rawData.length; i++) {
            if (rawData[i] === "(") {
                let tempStart = i + 1;
                while (rawData[i] !== ")") {
                    i++;
                }
                let tempProblems = parseInt(rawData.substring(tempStart, i));
                if (problemDifficultyTag[k]) {
                    values[problemDifficultyTag[k]] = tempProblems;
                }
            }
        }

        // Add the total problems solved dynamically
        values["totalSolved"] = values.easy + values.medium + values.hard;

        // Return the data in the desired format
        return {
            validUser: true,
            data: values,
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            validUser: false,
            message: "Internal Server Error",
            error: error.message,
        };
    }
};



const validateCodeChefUser= async (username) => {
    try {
        if (!username) {
            return { validUser: false, message: "Username is required" };
        }

        // Construct the CodeChef profile URL
        const url = `https://www.codechef.com/users/${username}`;

        // Fetch the HTML content of the profile page
        const { data } = await axios.get(url);

        // Load HTML into Cheerio
        const $ = cheerio.load(data);

        // Extract user information from the profile page
        let rating = $(".rating-number").text().trim() || "N/A";
        let stars = $(".rating-star").text().trim() || "N/A";
        let globalRank = $(".rating-ranks .inline-list span").first().text().trim() || "N/A";
        let countryRank = $(".rating-ranks .inline-list span").eq(2).text().trim() || "N/A";

        // Extract number of problems solved
        let problemsSolved = $(".problems-solved .content p").first().text().trim() || "0";

        // Return extracted details
        return {
            validUser: true,
            data: {
                username: username,
                rating: rating,
                stars: stars,
                globalRank: globalRank,
                countryRank: countryRank,
                problemsSolved: problemsSolved,
            },
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            validUser: false,
            message: "User not found or an error occurred.",
            error: error.message,
        };
    }
};



module.exports = {
    validateLeetCodeUser,
    validateGFGUser,
    validateCodeChefUser,
};
