require("dotenv").config();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const {verifyUser} = require('./verifyUser');
const jwt = require('jsonwebtoken');

exports.Signup = async (req, res, ) => {
    const bcryptSalt = bcrypt.genSaltSync(10);
    const { username, email, password } = req.body;
    // password hashing done
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

    const user_name = await User.findOne({ username: username });
    const user_email = await User.findOne({ email: email });
    if (user_name) {
        res.status(200).json({ success: false, error: "Duplicate username" });
    }
    else if (user_email) {
        res.status(200).json({ success: false, error: "Duplicate user email" });
    }
    else {
        try {
            const newUser = new User({ username, email, password: hashedPassword });
            const done = await newUser.save();
            if (done) {
                // console.log(newUser);
                // Email verification link sended
                verifyUser(email);
                return res.status(200).json({ success:true });
            }
        }
        catch (error) {
            console.log(err);
            return res.status(400).json(error);
        }
    }
};

exports.verify = async(req,res)=>{
    const token = req.params.token;

    try{
        let data = jwt.verify(token,process.env.JWT_SECRET);
        const {email} = data;
        await User.updateOne({email:email,verified:true});
        res.redirect(`http://192.168.56.1:3000/`);
    }
    catch(err){
        console.log("error: ",err);
        await User.deleteOne({ email:email });
        res.redirect(`http://192.168.56.1:3000/`);
        res.status(500).json({success:false,error:"please try to recreate account..."});
    }
}