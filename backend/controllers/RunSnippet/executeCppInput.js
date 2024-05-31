const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const Job = require("../../models/Job");

const outputPath = path.join(__dirname, "outputs");
const inputPath = path.join(__dirname, "inputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}
if (!fs.existsSync(inputPath)) {
  fs.mkdirSync(inputPath, { recursive: true });
}

const executeCppInput = (filepath,input) => {
  return new Promise((resolve, reject) => {
    const jobId = path.basename(filepath, path.extname(filepath)); // Get filename without extension
    const outPath = path.join(outputPath, `${jobId}.exe`); // Use .exe extension for Windows

    // console.log(input);
    const inputFilePath = path.join(inputPath, `${jobId}.txt`);
    fs.writeFileSync(inputFilePath, input)
    exec(
      `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ${outPath} < ${inputFilePath}`,
      (error, stdout, stderr) => {
        fs.unlinkSync(inputFilePath); // Delete input file after execution
        stderr && reject(stderr);
        error && reject({ error });
        resolve(stdout);
      }
    );
  
  });
};

module.exports = {
  executeCppInput,
};
