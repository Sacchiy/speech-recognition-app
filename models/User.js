'use strict';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    pass_hash: DataTypes.STRING,
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};


    //link_to_audio: DataTypes.STRING, //link to audiofile
    //audio_transcript: DataTypes.TEXT, 
    //word_count_results: DataTypes.TEXT  
    // NOTE word_count_results : 
    //Stringify the object before saving to the database !
    //parse the text to turn it into an object when loading !