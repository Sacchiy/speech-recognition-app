import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';


class FileInfoList extends React.Component {
    state = { fileInfoList: [] }

    componentDidMount() {
        this.getUploads();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.uploaderUrl != prevProps.uploaderUrl) {
            this.getUploads();
        }
    }

    getUploads() {
        //get all the files this user has uploaded
        axios.get("/api/fileInfo")
            .then(response => {
                this.setState({ fileInfoList: response.data.fileInfoList }); // 'data' object provided by axios
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


        let row = this.state.fileInfoList.map(item =>
            <tr key={item.id}>
                <td >{item.id}</td>
                <td >{item.audio_file_name}</td>
                <td >{this.fancyTimeFormat(item.audio_file_duration)}s</td>
                <td> <a href={item.link_to_audio}> Play</a></td>
                <td>{item.createdAt}</td>
                <td><Link to={"/results/" + item.revai_job_id}>See Transcript (If Ready)</Link></td>
            </tr>
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





