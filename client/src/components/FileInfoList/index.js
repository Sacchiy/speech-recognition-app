import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from '../FileInfoTable';


class FileInfoList extends React.Component {
  state = { fileInfoList: [] }

    componentDidMount( ){
        //get all the files this user has uploaded
        axios.get("/api/fileInfo")
          .then(response => {
            this.setState({ fileInfoList: response.data.fileInfoList}); // 'data' object provided by axios
          }); 
    }

  render() {

    let list = this.state.fileInfoList.map(item  => <FileInfoItem fileInfo={item}/>)
    return (
            
            <div class="container">
                <div class="row ">
                    <div class="col col-lg-1">
                        
                    </div>
                    <div class="col col-lg-9">
                        <div>
                            <ul>{list}</ul>
                            <Table/>
                        </div>
                    </div>
                    <div class="col col-lg-1">
                        
                    </div>
                </div>
            </div>
            
    )
  }
}

class FileInfoItem extends React.Component {
    
    render() {
    
      return (
            <div>
                <li>
                <Link to={"/results/" + this.props.fileInfo.revai_job_id}>See Transcript (If Ready)</Link>
                {this.props.fileInfo.audio_file_name} , {this.props.fileInfo.revai_job_id} , {this.props.fileInfo.link_to_audio}
                </li>
                
            </div>
      )
    }
}



export default withRouter(FileInfoList);





