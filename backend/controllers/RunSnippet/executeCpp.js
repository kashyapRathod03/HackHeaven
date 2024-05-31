const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath) => {
  // console.log("c++");
  return new Promise((resolve, reject) => {
    const jobId = path.basename(filepath, path.extname(filepath)); // Get filename without extension
    const outPath = path.join(outputPath, `${jobId}.exe`); // Use .exe extension for Windows

    exec(
      `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ${outPath}`,
      // `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ${jobId}.exe`,
      (error, stdout, stderr) => {
        stderr && reject(stderr);
        error && reject({ error });
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executeCpp,
};