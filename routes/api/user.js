const router = require("express").Router();
const db = require("../../models");
const bcrypt = require('bcrypt');

router.post("/register", (req, res) => {
    const { username, password } = req.body;
  
    console.log("registering", username, password);
  
    // TODO: Validate username & password. Make sure they're long enough / secure enough
    
    // Hash password so nobody can look at the database and get your password
    let passHash = bcrypt.hashSync(password, 10);
  
    // Store new user in the database
    db.Users.create({ username: username, pass_hash: passHash }).then(user => {
      if (!user) {
        res.status({ error: "Error creating user in database"});
        return;
      }
  
      // Don't authenticate just yet, just tell the client this worked ok.
      res.json({ success: true });
    });
  })

  module.exports = router;