'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserData = sequelize.define('UserData', {
    user_id: DataTypes.INTEGER,
    link_to_audio: DataTypes.STRING, //link to audiofile
    audio_file_name: DataTypes.STRING,
    revai_job_id: DataTypes.STRING,
    audio_transcript: DataTypes.TEXT, 
    word_count_results: DataTypes.TEXT  
  }, {});
  UserData.associate = function(models) {
    // associations can be defined here
  };
  return UserData;
};

