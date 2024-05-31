const { generateFile } = require('./generateFile');
const ExecutedProblem = require("../../models/ExecutedProblem");
const jsonData = require('./stub.json');
const {executeCpp} = require('./executeCpp');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

var op,err;
exports.ProblemRunSnippet = async (req, res) => {
  const {pId, language = "cpp", code, token } = req.body;
  let codeLet = code;
  try {
    const decoded = jwt.verify(token, secretKey);
    let userEmail = decoded.email;
    console.log(userEmail);
    console.log(pId);

      if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code body!" });
      }
      const filteredCode = jsonData.filter(item => item.id === pId);
      // console.log(filteredCode[0].code);
      codeLet = codeLet+filteredCode[0].code;
      console.log(codeLet);    
      // generates file path
      const exeutedfilePath = await generateFile(language, codeLet);

      const job = await new ExecutedProblem({pId, userEmail, exeutedfilePath }).save();
      const jobId = job["_id"];
      // await addJobToQueue(jobId);
      console.log("this is problem",jobId);
      
        if (!job) console.log("n job");

        // Use Promise.all to await all async operations inside map
        await executeCpp(exeutedfilePath)
              .then((output) => {
                op = output;
                console.log("Execution successful. Output:", output);
              })
              .catch((error) => {
                err = error;
                console.error("Error:", error);
              });

        console.log("this is op : ................................................................................", op);
        if(op) job["status"] = "success";
        if(err) job["status"] = "error";
        await job.save();
        return res.status(201).json({ jobId });
      
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


exports.ProblemStatus = async (req, res) => {
  const jobId = req.query.id;
  
  // console.log("job in status: ",jobId);
  if (jobId === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "missing id query param" });
  }

  const job = await ExecutedProblem.findById(jobId);

  if (job === undefined) {
    return res.status(400).json({ success: false, error: "couldn't find job" });
  }
  if(err) op = err;
  err="";
  return res.status(200).json({ success: true, job , op});
};