import React, { Component } from 'react';
import axios from 'axios';
import UploadButton from './Buttons';
import FileInfoList from "./FileInfoList";
import './upload.css'
import img from './upload2.png'


class Uploader extends Component {
  state = { cdn_url: null, job_status:null, fileName: '' }

  onChange = e => {

    switch (e.target.name) {
      // Updated this
      case 'selectedFile':
        if(e.target.files.length > 0) {
            // Accessed .name from file 
            this.setState({ fileName: e.target.files[0].name });
            console.log(e.target.files[0].name)
        }
      break;
      default:
        this.setState({ [e.target.name]: e.target.value });
     }
  };

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

    // Send audio file link to our upload API route 
    // which a) uploads to cloudinary and Makes call to REVai and returns
    // cloudinary link and revai job status
    axios.post('/api/upload', data).then((response) => {
      this.setState({
        cdn_url: response.data.urlReceived,//cdn_url
        job_status: response.data.job_status
      })
      
      window.location.reload();
    })
  }
  //urlReceived
    
  render() {
    const { fileName } = this.state;
    let file2 = null;

    file2 = fileName 
    ? ( <span>     File Selected - {fileName}</span>) 
    : ( <span>     Select an audio file...</span> );
    return(
      <div>
        

          <label className="custom-file-upload">
          <img src={img} />
          {file2}
          <input className="hidden" type="file" name="selectedFile" ref={this.fileInput} onChange={ (event) => this.onChange(event) } />
          </label>
          <UploadButton uploadFile={this.uploadFile}/> 

      </div>
    )
  }
}

export default Uploader