import React, { Component } from "react";
import axios from 'axios';

/**
 * Displays a random motivatioal quote from our API
 * 
 */
class MotivationalQuote extends Component {
  state = {
    transcript: ['fdgadfg'],
  };

  /**
   * When the component is very first displayed on the webpage
   */
  // componentDidMount() {
  //   axios.get("/api/daily")
  //     .then(response => {
  //       console.log(response)
  //       this.setState({ transcript: response.data });
        
  //       // Pick a random quote and set the timer to pick another one later
  //     });
  // }


  getTranscript = () => {
    axios.get("/api/daily")
      .then(response => {
        console.log(response)
        this.setState({ transcript: response.data });
        
        // Pick a random quote and set the timer to pick another one later
      });
  }

  /**
   * Called when the component is first displayed, and when the props or state changes
   */
  render() {
    return (
      <span>
        {/* {this.getTranscript()} */}
        <div>{this.state.trancript}</div>
        <div>HELLO</div>
        <script>{console.log(this.state.transcript)}</script>
        {/* <script>{console.log(this.getTranscipt())}</script> */}
      </span>
    );
  }
}

export default MotivationalQuote;