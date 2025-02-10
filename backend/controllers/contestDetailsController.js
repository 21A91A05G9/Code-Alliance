const { DateTime } = require('luxon');

// Function to fetch contests from GeeksforGeeks
const getGfgContests = async () => {
    try {
        const response = await fetch("https://practiceapi.geeksforgeeks.org/api/vr/events/?page_number=1&sub_type=all&type=contest");
        if (!response.ok) throw new Error("Failed to fetch GFG contests");
        
        const data = await response.json();
        const contests = data.results.upcoming;
        
        return contests.map(contest => ({
            name: contest.name,
            url: `https://practice.geeksforgeeks.org/contest/${contest.slug}`,
            start_time: DateTime.fromISO(contest.start_time).toISO(),
            end_time: DateTime.fromISO(contest.end_time).toISO(),
            duration: DateTime.fromISO(contest.end_time).diff(DateTime.fromISO(contest.start_time)).as("seconds"),
            status: "UPCOMING",
            site: "GeeksforGeeks"
        }));
    } catch (error) {
        console.error("Error fetching GFG contests:", error);
        return [];
    }
};

// Function to fetch contests from LeetCode
// const getLeetCodeContests = async () => {
//     try {
//         const response = await fetch("https://leetcode.com/contest/api/list/");
//         if (!response.ok) throw new Error("Failed to fetch LeetCode contests");
        
//         const data = await response.json();
//         const contests = [...(data.contest ? [data.contest] : []), ...data.upcoming];
        
//         return contests.map(contest => ({
//             name: contest.title,
//             url: `https://leetcode.com/contest/${contest.titleSlug}`,
//             start_time: DateTime.fromSeconds(contest.startTime).toISO(),
//             end_time: DateTime.fromSeconds(contest.startTime + contest.duration).toISO(),
//             duration: contest.duration,
//             status: contest.isVirtual ? "VIRTUAL" : "UPCOMING",
//             site: "LeetCode"
//         }));
//     } catch (error) {
//         console.error("Error fetching LeetCode contests:", error);
//         return [];
//     }
// };

// Function to fetch contests from CodeChef
// const getCodeChefContests = async () => {
//     try {
//         const response = await fetch("https://www.codechef.com/api/list/contests/all");
//         if (!response.ok) throw new Error("Failed to fetch CodeChef contests");
        
//         const data = await response.json();
//         const contests = [...data.current_contests, ...data.future_contests];
        
//         return contests.map(contest => ({
//             name: contest.contest_name,
//             url: `https://www.codechef.com/${contest.contest_code}`,
//             start_time: DateTime.fromISO(contest.contest_start_date_iso).toISO(),
//             end_time: DateTime.fromISO(contest.contest_end_date_iso).toISO(),
//             duration: DateTime.fromISO(contest.contest_end_date_iso).diff(DateTime.fromISO(contest.contest_start_date_iso)).as("seconds"),
//             status: contest.contest_status.toUpperCase(),
//             site: "CodeChef"
//         }));
//     } catch (error) {
//         console.error("Error fetching CodeChef contests:", error);
//         return [];
//     }
// };

// Controller function to fetch all contest details
const fetchContestDetails = async (req, res) => {
    try {
        const [gfg, leetcode, codechef] = await Promise.all([
            getGfgContests(),
            // getLeetCodeContests(),
            // getCodeChefContests()
        ]);
        
        const allContests = [...gfg, ];
        res.json(allContests);
    } catch (error) {
        console.error("Error fetching contests:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = fetchContestDetails;
