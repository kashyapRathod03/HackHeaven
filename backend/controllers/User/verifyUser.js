require("dotenv").config();
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

exports.verifyUser = async (user_email) => {

        const secretKey = process.env.JWT_SECRET;
            try {

                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    secure: false,
                    auth: {
                        user: 'kashyaprathod03@gmail.com',
                        pass: 'ydintcequcjecphk'
                    }
                });

                const payload = {
                    email: user_email,
                };
                const options = {
                    expiresIn: '24hr'
                };
                const token = jwt.sign(payload, secretKey, options);
                const url = `http://192.168.56.1:5000/confirm-user/${token}`
                const mailOptions = {
                    from: 'kashyaprathod03@gmail.com',
                    to: user_email,
                    subject: "Verify your account!!!",
                    html: `This is your verification link: <a href=${url}>${url}</a>`
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("Error" + error)
                    } else {
                        console.log("Email sent:" + info.response);
                    }
                });
            } catch (error) {
                console.log("Error" + error);
                res.send(false);
            }
};
