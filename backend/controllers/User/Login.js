require("dotenv").config();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verifyUser } = require("./verifyUser");

exports.Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ success: false, error: "Login Failed!!! User email not found" });
        }
        // console.log(user);
        if(!user.verified){
            verifyUser(email);
            // console.log("Login Failed!!! First verify your Email accounnt")
            return res.status(401).json({ success: false, error: "Login Failed!!! First verify your Email accounnt" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: "Login Failed!!! Wrong Password" });
        }

        const secretKey = process.env.JWT_SECRET;
        const payload = {
            email: email,
            password:password
            // Avoid storing plain password in the payload
        };
        const options = {
            expiresIn: '24hr'
            // expiresIn: '30sec'
        };
        console.log("login successfully done... ", user.username);
       
        const token = jwt.sign(payload, secretKey, options);
        return res.status(200).json({ success: true,message: user.username,token:token});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};
