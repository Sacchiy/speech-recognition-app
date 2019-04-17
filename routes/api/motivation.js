const router = require("express").Router();
const motivationController = require("../../controllers/motivationController");
const db = require("../../models"); 

const { RevAiApiClient } = require('revai-node-sdk');

const accessToken = '02mVOymB3ZAC-EBcW9_z2KV5xiEifvfhJc2gvfM_Vtd8QXh4Q3B17gTgk0CdAr7etfcuFZSsD9Gl2PwAkYwXa0hhO9_aM';

// const API_KEY = "02nbdpQX3gFagcjmTKKZVAdd21WAfcxbedkhbx8GQB_qRNZJTjm_tY5FEhyouEEorLpob9PMGbnS1kPsVTH9u2m5ZayLc"

// const accessToken = API_KEY
// let client = client = new RevAiApiClient(accessToken);

// Matches with "/api/motivation"
// You can test this route at http://localhost:3001/api/motivation/
// router.route("/")
//   .get(motivationController.findAll)

// THIS GET REQUEST FINDS USER BY ID AND RETURNS ITS link_to_audio
// IT THEN USES THE link_to_audio to SUBMIT A JOB TO THE REV API
// You can test this route at http://localhost:3001/api/motivation
router.route("/").get(async function(req, res) {
  const client = new RevAiApiClient(accessToken);
  console.log('this is the logged in userid',req.session.user_id)
  db.UserData
         .findOne({where: {user_id: req.session.user_id}}) // this should leter be the logged in usser 
         .then(async foundUser => {
            console.log('this is the link sent to rev',foundUser.link_to_audio);
            let job = await client.submitJobUrl(foundUser.link_to_audio);
            res.json(job);
         });
});

router.route("/requestAudioJobStatus").post(async function(req, res) {
  // Audio job ID sent in body of the  POST request from client: req.body.audioJobID
  const client = new RevAiApiClient(accessToken);
  var jobDetails = await client.getJobDetails(req.body.audioJobID); // This one is transcrived and works always'zTHdxVpTraHX' // does not work with new token
  res.json(jobDetails);
});

router.route("/getTranscriptText/:audioJobID").get(async function(req, res) {
  const client = new RevAiApiClient(accessToken);
  let audioJobID = req.param("audioJobID");
  var transcriptText = await client.getTranscriptText(audioJobID);
  res.json(transcriptText);
});

module.exports = router;

// old token - 02nbdpQX3gFagcjmTKKZVAdd21WAfcxbedkhbx8GQB_qRNZJTjm_tY5FEhyouEEorLpob9PMGbnS1kPsVTH9u2m5ZayLc
// works on old token - zTHdxVpTraHX

