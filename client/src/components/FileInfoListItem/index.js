import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';



class FileInfoListItem extends React.Component {
  
    state = { audioJobStatus: 'Loading...' }

    intervalID = 0;

    componentDidMount(){
        this.requestAudioJobStatus(); //inmediattly ask for status
        
        this.intervalID = setInterval(() => {  
            this.requestAudioJobStatus(); //keep asking
        }, 10000);
    }

    componentWillUnmount(){
        clearInterval(this.intervalID);
    }

    requestAudioJobStatus = () => {
    // uses state to pass in the audio job id this.state.audioJobID
    axios.post("/api/motivation/requestAudioJobStatus" , {audioJobID:this.props.item.revai_job_id} )
      .then(response => {
        if (response.data.status === 'transcribed') {
            console.log('request audio status',response);
          this.setState({ 
            audioJobStatus: 'Transcribed' })
        } else {
          this.setState({  
            audioJobStatus: 'In Progress'
         });
        }
      });
    }

    //Convert from seconds to HR:MM:SS
    fancyTimeFormat = (time) => {   
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = ~~time % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }
    
  render() {

    let item = this.props.item;
    return (
        <tr>
            <td >{this.props.index+1}</td>
            <td >{item.audio_file_name}</td>
            <td >{this.fancyTimeFormat(item.audio_file_duration)}s</td>
            <td> <a href={item.link_to_audio}> Play</a></td> 
            <td>{item.createdAt}</td>
            <td><Link to={"/results/" + item.revai_job_id}>{this.state.audioJobStatus}</Link></td>
        </tr>
    )
  }

}

export default withRouter(FileInfoListItem);


