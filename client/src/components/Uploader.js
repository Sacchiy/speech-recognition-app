import React, { Component } from 'react';
import axios from 'axios';

class Uploader extends Component {
  state = { cdn_url: null }

  // File input fields cannot be controlled by React since React cannot set their value
  // So we will hold a reference to it so we can access the field later
  // https://reactjs.org/docs/refs-and-the-dom.html
  // https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
  fileInput = React.createRef();
  
  uploadFile = () => {
    if (!this.fileInput.current.files.length) {
      console.log('No file was selected');
      return;
    }

    // Grab the file from our ref
    const file = this.fileInput.current.files[0];

    // Build some FormData to submit to our server
    const data = new FormData()
    data.append('file', file);

    console.log(file);

    // If you want to add any extra info to this post
    data.append('description', 'blah blah blah');
    data.append('ausio_file_name', 'some other meta data');
    data.append('user_id', this.props.user_id); //user name comming from App

    console.log("data" + data);

    // Send it to our upload API route
    axios.post('/api/upload', data).then((response) => {
      this.setState({
        cdn_url: response.data.cdn_url
      })
    })
  }
    
  render() {
    return(
      <div>
        This is the UPLOADER in User Home Page
        <div>
          <input type="file" ref={this.fileInput}/>
          <button onClick={this.uploadFile}>Submit</button>
        </div>
        {this.state.cdn_url && <a href={this.state.cdn_url}>CDN Link</a>}  
      </div>
    )
  }
}

export default Uploader