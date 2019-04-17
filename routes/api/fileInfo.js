const router = require("express").Router();
const db = require("../../models"); 




router.route("/").get(function(req, res) {
    db.UserData
           .findAll({where: {user_id: req.session.user_id}}) // this should leter be the logged in usser 
           .then(fileInfoList => {
              res.json({fileInfoList:fileInfoList});
           });
  });

  //api/fileInfo/:fileInfo
router.route("/revai_job_id/:revai_job_id").get(function(req, res) {
    
    db.UserData
           .findOne({where: {revai_job_id: req.params.revai_job_id , user_id: req.session.user_id}}) // this should leter be the logged in usser 
           .then(fileInfo => {
              res.json({fileInfo:fileInfo});
           });
  });

  

module.exports = router;