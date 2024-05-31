const { exec } = require("child_process");

const executePy = (filepath) => {
  return new Promise((resolve, reject) => {
    exec(
      `python ${filepath}`,
      (error, stdout, stderr) => {
        stderr && reject(stderr);
        error && reject({ error });
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executePy,
};
