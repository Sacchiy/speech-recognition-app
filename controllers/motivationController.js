const db = require("../models");

module.exports = {
   findAll: function (req, res) {
      db.MotivationalQuotes
         .findAll({})
         .then(dbModel => {
            res.json(dbModel);
         });
   },
   findOne: function (req, res) {
      db.Users
         .findOne({where: {email: 'fe'}}) // this should leter be the logged in usser 
         .then(foundUser => {
            res.json(foundUser);
            console.log(foundUser);
         });
   },
};

