const router = require("express").Router();
const signupController = require("../../controllers/signupController");
const db = require("../../models"); 

// Matches with "/api/signup"
// You can test this route at http://localhost:3001/api/signup/
// Note its 3001 not 3000
router.route("/").get(signupController.findAll)
// You can test this route at http://localhost:3001/api/signup/createNewUser
router.route("/createNewUser").get(signupController.createNewUser)




module.exports = router;