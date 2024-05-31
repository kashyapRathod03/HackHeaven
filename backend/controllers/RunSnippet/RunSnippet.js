// const fs = require("fs");
const { generateFile } = require('./generateFile');
const Job = require("../../models/Job");
const { addJobToQueue } = require('./jobQueue');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

exports.RunSnippet = async (req, res) => {
  const { language = "cpp", code, input, token } = req.body;
  
  try {
    const decoded = jwt.verify(token, secretKey);
    let useremail = decoded.email;
    // console.log(decoded);

      if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code body!" });
      }

      // generates file path
      const filepath = await generateFile(language, code);

      const job = await new Job({ useremail, language, filepath, input }).save();
      const jobId = job["_id"];
      console.log(jobId);
      await addJobToQueue(jobId);
      
      return res.status(201).json({ success: true, jobId });
      // fs.unlinkSync(job.filepath); // Delete code file after execution
    } catch (error) {
      console.error(error);
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ success: false, error: "Token has expired!" }); // Return a proper response object
      } else if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ success: false, error: "Invalid token!" });
      } else {
        throw error; // Rethrow other errors
      }
    }
};


exports.status = async (req, res) => {
  const jobId = req.query.id;
  
  // console.log("job in status: ",jobId);
  if (jobId === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "missing id query param" });
  }

  const job = await Job.findById(jobId);

  if (job === undefined) {
    return res.status(400).json({ success: false, error: "couldn't find job" });
  }

  return res.status(200).json({ success: true, job });
};






// const { generateFile } = require('./generateFile');
// const Job = require("../../models/Job");
// const { executeCpp } = require('./executeCpp');
// const { executePy } = require('./executePy');
// exports.RunSnippet = async (req, res) => {
//   const { language = "cpp", code } = req.body;

//   console.log(language, "Length:", code.length);
//   if (code === undefined || code.length === 0) {
//     return res.status(400).json({ success: false, error: "Empty code body!" });
//   }

//   const filepath = await generateFile(language, code);
//   // write into DB
//   const job = await new Job({ language, filepath }).save();
//   const jobId = job["_id"];
//   console.log("this is job: ");
//   console.log(job);
//   let op;
//   if (!job) console.log("n job");
//   if (job.language === "cpp") {
//     await executeCpp(filepath)
//       .then((output) => {
//         op = output;
//         console.log("Execution successful. Output:", output);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   } else if (job.language === "py") {
//     output = await executePy(filepath).then((output) => {
//       op = output;
//       console.log("Execution successful. Output:", output);
//     })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }
//   console.log("this is op : ................................................................................", op);
//   //   addJobToQueue(jobId);
//   return res.status(201).json({ jobId, op });

//   // return res.json({filepath});
//   // return res.status(201).json({ language, code });
// };