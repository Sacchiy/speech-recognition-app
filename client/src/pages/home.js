import React from "react";
import API from '../RevAPI';
import React, { Component } from "react";

class Home extends Components {
  state = {
    text: '',
    mp3File: ''
  }

  submitJob = mp3File => {
    this.setState()
    API.submitJob(mp3File)
  }

  render() {
  return (
    <div>
      <h1>Home</h1>
      <p>
        Nunc pharetra finibus est at efficitur. Praesent sed congue diam. Integer gravida dui
        mauris, ut interdum nunc egestas sed. Aenean sed mollis diam. Nunc aliquet risus ac finibus
        porta. Nam quis arcu non lectus tincidunt fermentum. Suspendisse aliquet orci porta quam
        semper imperdiet. Praesent euismod mi justo, faucibus scelerisque risus cursus in. Sed
        rhoncus mollis diam, sit amet facilisis lectus blandit at.
      </p>
      
      
    </div>
  )};
}

export default Home;