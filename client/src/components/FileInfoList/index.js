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
    let x=[];
    let list = this.state.fileInfoList.map(item  => <FileInfoItem fileInfo={item}/>)
    // let rows = [{id: 1, dessert: "mine", calories: 888, fat: 9, carbs: 37}]
    // console.log('this is file info list',this.state.fileInfoList);

    // for(let i=0; i<this.state.fileInfoList.length; i++){
    //     x[i] = {'file_name': this.state.fileInfoList[i].audio_file_name,
    //             'createdAt':this.state.fileInfoList[i].createdAt,
    //             'revai_job_id':this.state.fileInfoList[i].revai_job_id
    //             };
    // }
    // console.log('this is x',x);

    return (
        <div>
            
                            {/* <ul>{list}</ul> */}
                        
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">File Name</th>
                                        <th scope="col">Play</th>
                                        <th scope="col">Uploaded</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>

                                    <tbody>

                                        {list}
                                        

                                    </tbody>
                            </table>
                    
        </div>
            
    )
  }
}

class FileInfoItem extends React.Component {
    
    render() {
    
      return (
            <div>

                    <tr>
                        <td >{this.props.fileInfo.id}</td>
                        <td >{this.props.fileInfo.audio_file_name}</td>
                        {/* <td>{this.props.fileInfo.link_to_audio}</td> */}
                        <td>{this.props.fileInfo.createdAt}</td>
                        <td><Link to={"/results/" + this.props.fileInfo.revai_job_id}>See Transcript (If Ready)</Link></td>
                    </tr>

                {/* <li>
                <Link to={"/results/" + this.props.fileInfo.revai_job_id}>See Transcript (If Ready)</Link>
                {this.props.fileInfo.audio_file_name} , {this.props.fileInfo.revai_job_id} , {this.props.fileInfo.link_to_audio}
                </li> */}
                
            </div>
      )
    }
}



export default withRouter(FileInfoList);





