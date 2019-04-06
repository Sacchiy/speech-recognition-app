import React, { Component } from "react";
import axios from 'axios';



const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

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

  requestAudioJobStatus = () => {
    console.log('this is ausiojobstatus');
    axios.get("/api/motivation/requestAudioJobStatus"  )
      .then(response => {
        console.log('This is requestAudioJobStatus Function: ')
        console.log('Response.data.status: ', response.data.status); 
      });
  }

  getTranscriptText = (audioJobID) => {
    axios.get("/api/motivation/getTranscriptText/" + audioJobID)
      .then(response => {
        console.log('This is getTranscript Function: ')
        console.log('Response: ', response.data); 
      });
    
  }

  
  //zTHdxVpTraHX //works
  //m2ti7qTRCYOT
  //IJq1HL1Xd9pj //fails
  //NjOlhq5rqtQV
  //0UpQFgtBu6wH
 
  render() {
    
    return (
      <span>
        <div>HELLO</div>
        <p> Audio Job ID: {this.state.audioJobID} </p>
        <p> Audio Job Status:{this.state.audioJobStatus} </p>

        <button onClick={() => this.submitAudioJob()}>submitAudioJob</button> 

        <button onClick={() => this.requestAudioJobStatus()}>audioJobStatus</button> 

      </span>
    );
  }
}

export default MotivationalQuote;

// {/* {this.requestAudioJobStatus(this.state.audioJobID)} */}
// {/* {this.requestAudioJobStatus()};
//         {this.getTranscriptText(audioJobID)} */}