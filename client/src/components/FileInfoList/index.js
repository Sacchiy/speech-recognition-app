import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';



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
     
    let row = this.state.fileInfoList.map(item  => 
        <tr key ={item.id}>
            <td >{item.id}</td>
            <td >{item.audio_file_name}</td>
            <td> <a href={item.link_to_audio}> Play</a></td> 
            <td>{item.createdAt}</td>
            <td><Link to={"/results/" + item.revai_job_id}>See Transcript (If Ready)</Link></td>
        </tr>
    ) 

    return (
        <div>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">File Name</th>
                        <th scope="col">Audio</th>
                        <th scope="col">Uploaded</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>

                    {row}
                
                </tbody>
            </table>  
        </div>
            
    )
  }
}

export default withRouter(FileInfoList);





