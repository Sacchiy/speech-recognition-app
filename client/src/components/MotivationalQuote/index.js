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
    transcript: "",
    audioJobID: "",
    audioJobStatus: "in_progress"
  };

  submitAudioJob = (user) => {
    console.log('SUBMITTED');
    console.log(user)
    axios.get("/api/motivation/user/" + user)
    
      .then(response => {
        // console.log('This is MotivationalQuote Component: ')
        // console.log('Response.data.id: ', response.data.id); 
        // console.log('Response.data.status: ', response.data.status); 
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
        
        if (response.data.status === 'transcribed') {
          this.setState({ audioJobStatus: response.data.status })
          this.getTranscriptText(response.data.id)
        } else {
          this.setState({ audioJobStatus: response.data.status })
        }

        //passing in wordCount OR updateResults to grab results
        // if (this.props.count) {
        //   this.props.count(this.state.transcript)
        // }
      });
  }

  getTranscriptText = (audioJobID) => {
    axios.get("/api/motivation/getTranscriptText/" + audioJobID)
      .then(response => {
        // console.log('This is getTranscript Function: ')
        // console.log('Response: ', response.data); 
        this.setState({ transcript: response.data})
        let x = response.data.toString()
          
        this.props.getTranscript(x)
        // console.log(this.state.transcript)
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
        <p> { this.state.transcript } </p>

        <button onClick={() => this.submitAudioJob(this.props.user)}>submitAudioJob</button> 

        <button onClick={() => this.requestAudioJobStatus()}>audioJobStatus</button> 

      </span>
    );
  }
}

export default MotivationalQuote;

// {/* {this.requestAudioJobStatus(this.state.audioJobID)} */}
// {/* {this.requestAudioJobStatus()};
//         {this.getTranscriptText(audioJobID)} */}