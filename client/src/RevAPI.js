import React from 'react';
import React, { Component } from "react";

import { RevAiApiClient } from 'revai-node-sdk';

class API extends Component {


    submitJob = props => {
        const accessToken = "02nbdpQX3gFagcjmTKKZVAdd21WAfcxbedkhbx8GQB_qRNZJTjm_tY5FEhyouEEorLpob9PMGbnS1kPsVTH9u2m5ZayLc";
        let client = new RevAiApiClient(accessToken);

        let job = await client.submitJobLocalFile(props.mp3File);

        // If we upload file by URL
        // let job = var job = await client.submitJobUrl("https://www.rev.ai/FTC_Sample_1.mp3");

        // let jobDetails = await client.getJobDetails(job.id);

        let transcriptText = await client.getTranscriptText(job.id);

        // Can receive as JSON file to save to database easier?
        // let transcriptObject = await client.getTranscriptObject(job.id);

        return transcriptText
    }
}


// Deleting a job
await client.deleteJob(job.id);

export default API;

