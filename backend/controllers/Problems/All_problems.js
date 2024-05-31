const Problem = require('../../models/Problem');

exports.Allproblems = async (req, res) => {
    try {
        const problems = await Problem.find();
        // console.log(problems);
        if (problems) {
            res.status(200).json({ success: true, data: problems });
        } else {
            res.status(404).json({ success: false, message: "No problems found for the user" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
