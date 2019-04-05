import API from '../RevAPI';

import React, { Component } from "react";

class TranscribedText extends Component {

state = {
    text: 'hrshsfghs'
  }

  submit = () => {
    console.log('RAN')
    var transcript = API.search()
    // console.log (transcript)
    this.setState({ text: transcript })
  }
  
  render() {
      return (
          <div>
            <button></button>
          {this.state.text}
          </div>
      )
  }
}

export default TranscribedText;