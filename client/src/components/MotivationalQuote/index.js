import React, { Component } from "react";
import axios from 'axios';
import TranscriptTextBox from '../TranscriptTextBox'
import { Redirect, withRouter } from 'react-router-dom';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});


class MotivationalQuote extends Component {
  state = {
    transcript: "",
    audioJobID: "",
    audioJobStatus: "",
    fileInfo: null
  };

  componentDidMount(){
    axios.get("/api/fileInfo/revai_job_id/"+this.props.match.params.fileInfoId)
      .then(response => {
        console.log(response.data);
        this.setState({ 
            audioJobID: response.data.fileInfo.revai_job_id,
            fileInfo: response.data
        });
        this.getTranscriptText(response.data.fileInfo.revai_job_id);
    })
  }

  // submitAudioJob = () => {
  //   axios.get("/api/motivation")
  //     .then(response => {
  //       this.setState({ 
  //           audioJobID: response.data.id, 
  //           audioJobStatus: response.data.status
  //        });
  //     });
  // }

  getTranscriptText = (audioJobID) => {
    axios.get("/api/motivation/getTranscriptText/" + audioJobID)
      .then(response => {
        this.setState({ transcript: response.data})
        this.props.getTranscript(response.data)  //sets the state of transcript to response.data in app.js component
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
        {/* <p> Audio Job ID: {this.state.audioJobID} </p> */}
        {/* <p> Audio Job Status:{this.state.audioJobStatus} </p> */}
        {/* <button onClick={() => this.submitAudioJob()}>submitAudioJob</button>  */}
        {/* <button onClick={() => this.requestAudioJobStatus()}>audioJobStatus</button>  */}
        <TranscriptTextBox transcript = {this.state.transcript}/>
      </span>
    );
  }
}

export default withRouter(MotivationalQuote);


