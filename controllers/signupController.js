const db = require("../models");

module.exports = {

   findAll: function (req, res) {
      db.Users
         .findAll({})
         .then(dbModel => {
            res.json(dbModel);
            console.log(dbModel);
         });
   },

   createNewUser: function(req,res){
      db.Users
         .create({  
            email: 'testemail@test.com',
            password: 'this_would_be_a_password',
          })
         .then(newUser => {
            console.log(`New ${newUser.email}, with pass ${newUser.password} has been created.`);
         });
   }

};

