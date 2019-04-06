'use strict';

module.exports = (sequelize, DataTypes) => {
  
  const Users = sequelize.define('Users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    link_to_audio: DataTypes.STRING,
    audio_transcript: DataTypes.TEXT,
    word_count_results: DataTypes.TEXT  
    // NOTE word_count_results : 
    //Stringify the object before saving to the database !
    //parse the text to turn it into an object when loading !
  }, {});

  return Users;
};