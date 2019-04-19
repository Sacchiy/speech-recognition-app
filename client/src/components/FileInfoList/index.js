import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FileInfoListItem from '../FileInfoListItem';



class FileInfoList extends React.Component {
  state = { fileInfoList: [] }

    componentDidMount(){
        this.getUploads();
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.uploaderUrl != prevProps.uploaderUrl){
            this.getUploads();
        }
    }

    getUploads(){
        //get all the files this user has uploaded
        axios.get("/api/fileInfo")
          .then(response => {
            this.setState({ fileInfoList: response.data.fileInfoList}); // 'data' object provided by axios
          }); 
    }

    

  render() {

     
    let row = this.state.fileInfoList.map((item,index)  => 
        <FileInfoListItem key ={index+1} item={item} index={index} />
        
    ) 

    return (
        <div>
            <table id="table" className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">File Name</th>
                        <th scope="col">Duration</th>
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





