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
router.route("/user/:user").get(async function(req, res) {
  const accessToken = '02nbdpQX3gFagcjmTKKZVAdd21WAfcxbedkhbx8GQB_qRNZJTjm_tY5FEhyouEEorLpob9PMGbnS1kPsVTH9u2m5ZayLc';
  const client = new RevAiApiClient(accessToken);
  let user = req.param('user')
  console.log('route hit: ', user)
  db.Users
         .findOne({where: {email: user}}) // this should leter be the logged in usser 
         .then(async foundUser => {
            let job = await client.submitJobUrl(foundUser.link_to_audio);
            //let job = await client.submitJobUrl("https://www.rev.ai/FTC_Sample_1.mp3");
            res.json(job);
            //res.json(foundUser);
         });
});

router.route("/requestAudioJobStatus").get(async function(req, res) {
  console.log('This is  requestausiojobstatus');
  const accessToken = '02nbdpQX3gFagcjmTKKZVAdd21WAfcxbedkhbx8GQB_qRNZJTjm_tY5FEhyouEEorLpob9PMGbnS1kPsVTH9u2m5ZayLc';
  const client = new RevAiApiClient(accessToken);
  var jobDetails = await client.getJobDetails('zTHdxVpTraHX');
  res.json(jobDetails);
});

router.route("/getTranscriptText/:audioJobID").get(async function(req, res) {
  const accessToken = '02nbdpQX3gFagcjmTKKZVAdd21WAfcxbedkhbx8GQB_qRNZJTjm_tY5FEhyouEEorLpob9PMGbnS1kPsVTH9u2m5ZayLc';
  const client = new RevAiApiClient(accessToken);
  let audioJobID = req.param("audioJobID");
  var transcriptText = await client.getTranscriptText(audioJobID);
  res.json(transcriptText);
});






//let transcriptObject = await client.getTranscriptObject(job.id);

module.exports = router;

