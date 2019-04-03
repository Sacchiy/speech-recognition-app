import API from '../RevAPI';

import React, { Component } from "react";

class TranscribedText extends Components {

state = {
    text: '',
    mp3File: ''
  }

  submitJob = mp3File => {
    this.setState()
    API.submitJob(mp3File)
  }
  
  render() {
      return
  }
}

export default TranscribedText;