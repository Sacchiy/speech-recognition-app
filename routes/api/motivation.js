const router = require("express").Router();
const motivationController = require("../../controllers/motivationController");
const db = require("../../models"); 

const { RevAiApiClient } = require('revai-node-sdk');

// const API_KEY = "02nbdpQX3gFagcjmTKKZVAdd21WAfcxbedkhbx8GQB_qRNZJTjm_tY5FEhyouEEorLpob9PMGbnS1kPsVTH9u2m5ZayLc"

// const accessToken = API_KEY
// let client = client = new RevAiApiClient(accessToken);

// Matches with "/api/motivation"
// You can test this route at http://localhost:3001/api/motivation/
// router.route("/")
//   .get(motivationController.findAll)



// You can test this route at http://localhost:3001/api/motivation
router.route("/").get(async function(req, res) {
  const accessToken = '02nbdpQX3gFagcjmTKKZVAdd21WAfcxbedkhbx8GQB_qRNZJTjm_tY5FEhyouEEorLpob9PMGbnS1kPsVTH9u2m5ZayLc';
  const client = new RevAiApiClient(accessToken);
  let job = await client.submitJobUrl("https://www.rev.ai/FTC_Sample_1.mp3");
  res.json(job);
});

router.route("/requestAudioJobStatus").get(async function(req, res) {
  const accessToken = '02nbdpQX3gFagcjmTKKZVAdd21WAfcxbedkhbx8GQB_qRNZJTjm_tY5FEhyouEEorLpob9PMGbnS1kPsVTH9u2m5ZayLc';
  const client = new RevAiApiClient(accessToken);
  var jobDetails = await client.getJobDetails('zTHdxVpTraHX');
  res.json(jobDetails);
});

router.route("/getTranscriptText").get(async function(req, res) {
  const accessToken = '02nbdpQX3gFagcjmTKKZVAdd21WAfcxbedkhbx8GQB_qRNZJTjm_tY5FEhyouEEorLpob9PMGbnS1kPsVTH9u2m5ZayLc';
  const client = new RevAiApiClient(accessToken);
  var transcriptText = await client.getTranscriptText('zTHdxVpTraHX');
  res.json(transcriptText);
});



//let transcriptObject = await client.getTranscriptObject(job.id);

module.exports = router;

