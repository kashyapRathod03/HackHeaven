require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.use(cors({
    credentials: true,
    origin: true,
  }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const {Home} = require('./controllers/home');
const {RunSnippet, status} = require('./controllers/RunSnippet/RunSnippet');
// const {RunSnippet} = require('./controllers/RunSnippet/RunSnippet');
const {Signup, verify} = require('./controllers/User/reginstration');
const {Login} = require('./controllers/User/Login');
const {showcode} = require('./controllers/ShowCodes/showcode');
const {Allproblems} = require('./controllers/Problems/All_problems');
const Problem = require('./models/Problem');

const {ProblemRunSnippet, ProblemStatus} = require('./controllers/RunProblem/RunProblemSnippet');

mongoose.set('strictQuery',false);
const db = mongoose.connect("mongodb+srv://kashyaprathod03:idle@compilerdb.4oyzvxk.mongodb.net/?retryWrites=true&w=majority&appName=compilerdb").then(()=>{console.log("database connection successfull")}).catch((err)=>{console.log("this is error "+err)}); 
app.use('/codes', express.static(path.join(__dirname, 'controllers', 'RunSnippet', 'codes')));


app.post('/login',Login);
app.post('/signup',Signup);
app.post('/run',RunSnippet);
app.get('/status',status);
app.get('/confirm-user/:token',verify);
app.get('/codes',showcode);
app.get('/problems-all',Allproblems);

app.post('/runproblem',ProblemRunSnippet);
app.get('/problemstatus',ProblemStatus);

// app.post('/pro',async(req,res)=>{
//   const {id,titleslug,title,difficulty} = req.body;
//   try {
//     const newUser = new Problem({ id, titleSlug:titleslug, title, difficulty });
//     console.log(id)
//     const done = await newUser.save();
//     if (done) {
//       console.log(done);
//     }
// }
// catch (error) {
//     console.log(error);
//     return res.status(400).json(error);
// }
// });

app.listen(5000, () => {
    console.log(`Listening on port 5000!`);
});