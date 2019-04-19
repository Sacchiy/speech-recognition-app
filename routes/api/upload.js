const cloudinary = require('cloudinary').v2;
const axios = require('axios');
const multer = require('multer');
const router = require("express").Router();
const db = require("../../models"); 
const { RevAiApiClient } = require('revai-node-sdk');
const accessToken = process.env.REV_AI_ACCESS_TOKEN;
const client = new RevAiApiClient(accessToken);

// Configure cloudinary with information from your .env file
cloudinary.config({
cloud_name: 'dhvoh66p9',
api_key: '584522465788177',
api_secret: 'LNt3WNdI2WkxlXVCXYIWMeEIHcA',
});

// Multer helps us with multi-part form data (Forms with files)
// We're going to use memory storage since we're not saving to disk
// The file will be streamed from the upload straight to cloudinary via our middleware
const storage = multer.memoryStorage();
const multerUpload = multer({ storage });

// Express route where we receive files from the client
// passing multer middleware
router.post('/', multerUpload.single('file'), (req, res) => {

    console.log('Got file with file_name:', req.file.originalname); //this is the filename
    console.log('Extra form fields:', req.body);

    // Send the file to Cloudinary
    // resource_type should be "video" for audio files!
    // https://cloudinary.com/documentation/image_upload_api_reference
    cloudinary.uploader.upload_stream({ resource_type: "video" }, cloudinaryDone).end(req.file.buffer);
    // After the upload is completed, this callback gets called
    async function cloudinaryDone(error, result) {
      if (error) {
        console.log("Error in cloudinary.uploader.upload_stream\n", error);
        return;
      }
      console.log("Cloudinary audio info: ", result);
      // If you want to see all the data that Cloudinary comes back with
      // console.log(result);

      //console.log('Cloudinary url', result.url);
      const link = result.url;  //result is cloudinary object
      let job = await client.submitJobUrl(link); // send file to REVAI
      
      db.UserData.create({ user_id: req.body.user_id,
          link_to_audio: link ,
          audio_file_name: req.file.originalname,
          audio_file_duration: result.duration,
          revai_job_id: job.id
         })
        .then(() => {
          res.json({ urlReceived: link , revai_job_id : job.id, job_status : job.status});  //send URL to client for display
          console.log("mySQL table" + urlReceived);
        })
      // Send back the working URL for the client to display.
      //res.json({ cdn_url: result.url });
    }
});

module.exports = router;
