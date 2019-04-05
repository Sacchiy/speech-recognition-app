const router = require("express").Router();
const motivationController = require("../../controllers/motivationController");
const db = require("../../models");

const { RevAiApiClient } = require('revai-node-sdk');

const API_KEY = "02nbdpQX3gFagcjmTKKZVAdd21WAfcxbedkhbx8GQB_qRNZJTjm_tY5FEhyouEEorLpob9PMGbnS1kPsVTH9u2m5ZayLc"

const accessToken = API_KEY
let client = client = new RevAiApiClient(accessToken);

// Matches with "/api/motivation"
// You can test this route at http://localhost:3001/api/motivation/
router.route("/")
  .get(motivationController.findAll)

// You can test this route at http://localhost:3001/api/daily/
router.route("/daily").get((req, res) => {
  testJob(req, res)
})

async function testJob(req, res) {
  let job = await client.submitJobUrl("https://www.rev.ai/FTC_Sample_1.mp3");
  console.log('job', job);

  let transcriptObject = await client.getTranscriptObject(job.id);
  res.json(transcriptObject);
}

module.exports = router;


// const accessToken = "02nbdpQX3gFagcjmTKKZVAdd21WAfcxbedkhbx8GQB_qRNZJTjm_tY5FEhyouEEorLpob9PMGbnS1kPsVTH9u2m5ZayLc";
// let client = new RevAiApiClient(accessToken);

// // let job = await client.submitJobLocalFile(props.mp3File);

// // If we upload file by URL
// let job = await client.submitJobUrl("https://www.rev.ai/FTC_Sample_1.mp3");

// // let jobDetails = await client.getJobDetails(job.id);

// let transcriptText = await client.getTranscriptText(job.id);