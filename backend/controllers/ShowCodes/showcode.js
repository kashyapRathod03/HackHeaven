const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const Job = require('../../models/Job');

exports.showcode = async (req, res) => {
    const token = req.query.token; // Assuming token is passed as a query parameter named 'token'
    
    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, secretKey);
        const useremail = decoded.email;
        
        // Find data in the Job collection based on user email
        const jobs = await Job.find({ useremail: useremail });

        // If jobs are found, send them in the response
        if (jobs) {
            // console.log(jobs);
            res.status(200).json({ success: true, data: jobs });
        } else {
            res.status(404).json({ success: false, message: "No jobs found for the user" });
        }
    } catch (error) {
        // If there's an error (e.g., token verification fails), send an error response
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Token has been expired..." });
    }
};
