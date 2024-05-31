const { exec } = require("child_process");

const executePyInput = (filepath, input) => {
  return new Promise((resolve, reject) => {
    exec(
      `echo ${input} | python ${filepath}`, // Pass input to the Python script via echo command
      (error, stdout, stderr) => {
        stderr && reject(stderr);
        error && reject({ error });
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executePyInput,
};
