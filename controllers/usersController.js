const db = require("../models");

module.exports = {
   findAll: function (req, res) {
      db.Users
         .findAll({})
         .then(dbModel => {
            res.json(dbModel);
         });
   }
};