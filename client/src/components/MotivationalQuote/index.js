import React, { Component } from "react";
import axios from 'axios';
import TranscriptTextBox from '../TranscriptTextBox'


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
    transcript: "",
    audioJobID: "",
    audioJobStatus: ""
  };

  submitAudioJob = () => {
    axios.get("/api/motivation")
      .then(response => {
        this.setState({ 
            audioJobID: response.data.id, 
            audioJobStatus: response.data.status
         });
      });
  }

  getTranscriptText = (audioJobID) => {
    axios.get("/api/motivation/getTranscriptText/" + audioJobID)
      .then(response => {
        this.setState({ transcript: response.data})
        this.props.getTranscript(response.data)  //sets the state of transcript to response.data in app.js component
      });
    
  }

  requestAudioJobStatus = () => {
    // uses state to pass in the audio job id this.state.audioJobID
    console.log('hello')
    console.log(this.state.audioJobID);
    axios.post("/api/motivation/requestAudioJobStatus" , {audioJobID:this.state.audioJobID} )
      .then(response => {
        if (response.data.status === 'transcribed') {
          this.setState({ audioJobStatus: response.data.status })
          this.getTranscriptText(response.data.id)
        } else {
          console.log('no response');
          console.log(response.data.status);
          this.setState({ 
            audioJobID: response.data.id,  
            audioJobStatus: response.data.status
         });
        }
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
        <p> Audio Job ID: {this.state.audioJobID} </p>
        <p> Audio Job Status:{this.state.audioJobStatus} </p>
        <button onClick={() => this.submitAudioJob()}>submitAudioJob</button> 
        <button onClick={() => this.requestAudioJobStatus()}>audioJobStatus</button> 
        <TranscriptTextBox transcript = {this.state.transcript}/>
      </span>
    );
  }
}

export default MotivationalQuote;

