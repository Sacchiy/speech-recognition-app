import React, { Component } from "react";
import axios from 'axios';

/**
 * Displays a random motivatioal quote from our API
 * 
 */
class MotivationalQuote extends Component {
  state = {
    transcript: ['fdgadfg'],
    audioJobID: "",
    audioJobStatus: "in_progress"
  };

  submitAudioJob = () => {
    axios.get("/api/motivation")
      .then(response => {
        console.log('This is MotivationalQuote Component: ')
        console.log('Response.data.id: ', response.data.id); 
        console.log('Response.data.status: ', response.data.status); 
        this.setState({ 
            audioJobID: response.data.id,
            audioJobStatus: response.data.status
         });
      });
  }

  componentDidMount(){
    this.submitAudioJob();
  }

  requestAudioJobStatus = () => {
    axios.get("/api/motivation/requestAudioJobStatus" )
      .then(response => {
        console.log('This is requestAudioJobStatus Function: ')
        console.log('Response.data.status: ', response.data.status); 
      });
  }

  getTranscriptText = () => {
    axios.get("/api/motivation/getTranscriptText")
      .then(response => {
        console.log('This is getTranscript Function: ')
        console.log('Response: ', response.data); 
      });
    
  }

  

  //zTHdxVpTraHX
 
  render() {
    return (
      <span>
        <div>HELLO</div>
        <p> Audio Job ID: {this.state.audioJobID} </p>
        <p> Audio Job Status:{this.state.audioJobStatus} </p>
        {/* {this.requestAudioJobStatus(this.state.audioJobID)} */}
        {this.requestAudioJobStatus()};
        {this.getTranscriptText()}
      </span>
    );
  }
}

export default MotivationalQuote;