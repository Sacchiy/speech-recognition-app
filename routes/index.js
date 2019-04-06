const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// API Routes
// Adds the prefix /api to all the routes defined in ./api folder ?
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
