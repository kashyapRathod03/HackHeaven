const Queue = require("bull");

const Job = require("../../models/Job");
const { executeCpp } = require("./executeCpp");
const { executeCppInput } = require("./executeCppInput");
const { executePy } = require("./executePy");
const { executePyInput } = require("./executePyInput");

const jobQueue = new Queue("job-runner-queue");
// it is for how many jobs done at once in queue
const NUM_WORKERS = 5;

jobQueue.process(NUM_WORKERS, async ({ data }) => {
  const jobId = data.id;
  const job = await Job.findById(jobId);
  // console.log("job started",job);
  if (job === undefined) {
    throw Error(`cannot find Job with id ${jobId}`);
  }
  try {
    let op;
    job["startedAt"] = new Date();

    // exeute c++ file here
    if (job.language === "cpp") {
      input = job.input;
      if(input){
        op = await executeCppInput(job.filepath,input);
      }
      else op = await executeCpp(job.filepath);
      // console.log(op);
    }

    // exeute python file here
    else if (job.language === "py") {
      input = job.input;
      if(input){
        op = await executePyInput(job.filepath,input);
      }
      else op = await executePy(job.filepath);
      // console.log(op);
    }

    job["completedAt"] = new Date();
    job["output"] = op;
    job["status"] = "success";
    await job.save();
    // console.log(job.output);
    return true;
  } catch (err) {
    job["completedAt"] = new Date();
    job["output"] = JSON.stringify(err);
    job["status"] = "error";
    await job.save();

    // removeJobFromQueue(job.jobId);
    throw Error(JSON.stringify(err));
  }
});

const removeJobFromQueue = async (jobId) => {
  await jobQueue.removeJobs(jobId);
  console.log(`Job ${jobId} removed from the queue.`);
};

// it is used to show errors
jobQueue.on("failed", (error,job) => {
  removeJobFromQueue(job.jobId);
  console.error("this is failed:", error.failedReason);
});

const addJobToQueue = async (jobId) => {
  jobQueue.add({
    id: jobId,
  });
  // console.log("job added");
};

module.exports = {
  addJobToQueue,
};