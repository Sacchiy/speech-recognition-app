import React, { Component } from "react";
import axios, { AxiosInstance } from 'axios';
import { RevAiApiClient } from 'revai-node-sdk';
import * as FormData from 'form-data';
import * as fs from 'fs';



class API extends Component {

    async submitJobUrl(mediaUrl) {
        try {
            const response = await axios.post('/jobs' {
                headers: {'Content-Type': 'application/json'}
            })
            return response.data;
        } catch (error) {
            switch (error.response.status) {
                case 400:
                    throw new InvalidParameterError(error);
                case 401:
                    throw new RevAiApiError(error);
                case 403:
                    throw new InsufficientCreditsError(error);
                default:
                    throw error;
            }
    }


    // search = () => {
    //     const accessToken = "02nbdpQX3gFagcjmTKKZVAdd21WAfcxbedkhbx8GQB_qRNZJTjm_tY5FEhyouEEorLpob9PMGbnS1kPsVTH9u2m5ZayLc";
    //     let client = new RevAiApiClient(accessToken);

    //     let job = client.submitJobLocalFile('./sampleaudio/Recording.m4a');

    //     // If we upload file by URL
    //     // let job = client.submitJobUrl("https://www.rev.ai/FTC_Sample_1.mp3");//file or

    //     // let jobDetails = await client.getJobDetails(job.id);

    //     let transcriptText = client.getTranscriptText(job.id);

    //     // Can receive as JSON file to save to database easier?
    //     // let transcriptObject = await client.getTranscriptObject(job.id);

    //     return transcriptText
    // }
}


// Deleting a job
// await client.deleteJob(job.id);

export default API;

