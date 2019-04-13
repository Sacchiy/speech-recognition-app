const router = require("express").Router();
const db = require("../../models");
const authMiddleware = require("./authMiddleware");
const bcrypt = require('bcrypt');

// For logging in with a username and password
router.post("/login", (req, res) => {
  const username = req.body.username; 
  const password = req.body.password;

  // Find the user in the database
  db.Users.findOne({ where: { username: username }}).then(
    user => {
      try {
        if (!user) {
          throw new Error("Username not found");
        }

        // See if the password hash matches what we have in the database
        if (!bcrypt.compareSync(password, user.pass_hash)) {
          throw new Error("Password invalid");
        }

        // This is not super secure, but a random token is all we need right now.
        const authToken = Math.random();

        // Now do two things
        //  1. Set the user information in our session. This gets stored in the db.
        //  2. Set the user information in our cookie. This gets stored on the client side.
        // When the client sends another request to the server, 
        //  we with validate that the session and cookie info match using authMiddleware

        // Update session with our auth info    
        console.log(req.session);  
        req.session.user_id = user.id;  //FIX --> REQ.SESSION IS UNDEFINED
        req.session.auth_token = authToken;

        // Send back cookie
        res.cookie("user_id", user.id);
        res.cookie("auth_token", authToken);

        // Good to go, let the client know
        res.json({ user: user });
      } catch(err) {
        console.log('This is api/users.js routers.post /login');
        res.status(401).json({ error: err.message });
      }
    }
  )
});

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

router.post("/logout", (req, res) => {
  // Destroy the session so there's no longer any user data held
  //  A new session will be generated for the user on their next request
  req.session.destroy();

  // Clear our auth cookies
  res.clearCookie("user_id");
  res.clearCookie("auth_token");

  res.json({ success: true });
})

router.get("/getUser", authMiddleware, (req, res) => {
  db.Users.findOne({ where: { id: req.session.user_id }}).then(user => {
    // This either worked, or we'll send down null. 
    res.send({ user: user });
  })
});

module.exports = router;