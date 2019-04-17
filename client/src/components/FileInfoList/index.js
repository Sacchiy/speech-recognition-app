import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';


class FileInfoList extends React.Component {
  state = { fileInfoList: [] }

    componentDidMount( ){

        axios.get("/api/fileInfo")
          .then(response => {
            this.setState({ fileInfoList: response.data.fileInfoList}); // 'data' object provided by axios
            console.log(response);
          });
        
    }


  render() {
    
    //const map1 = array1.map(x => x * 2);
    let list = this.state.fileInfoList.map(item  => <FileInfoItem fileInfo={item}/>)

    return (
            <div><ul>{list}</ul></div>
    )
  }
}

class FileInfoItem extends React.Component {
    
    render() {
    
      return (
            <div>
                <li>
                <Link to={"/results/" + this.props.fileInfo.revai_job_id}>Transcribe</Link>
                {this.props.fileInfo.audio_file_name} , {this.props.fileInfo.revai_job_id} , {this.props.fileInfo.link_to_audio}
                </li>
            </div>

      )
    }
}



export default withRouter(FileInfoList);





