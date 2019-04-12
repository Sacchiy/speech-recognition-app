import React, { Component } from "react";
import MotivationalQuote from "./components/MotivationalQuote";
import Home from "./pages/home";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Link} from 'react-router-dom';
import "./App.css";
import Navbar from "./components/navbar";
import BarChart from "./components/barChart";
import TextFields from "./components/filterBox";
import RegistrationPage from "./pages/registrationpage";
import Signup from "./pages/signup";
import Login from "./pages/signin";
import axios from 'axios';
import Uploader from "./components/Uploader";

/**
 * The main App component that holds our whole React app
 */
class App extends Component {

  state = {
    words: [],
    data: [],
    transcript: "hello my name is kevin",
    user: null
  };

  //Called from within <TextFields/> component provides words in input text box
  updateResults = (wordstoCount) => {
    
    this.setState({
      words: wordstoCount
    });

    this.wordCount(this.state.transcript, wordstoCount.toString().trim())
  }

  getTranscript = (transcript) => {
    // console.log('getTranscript text', transcript)
    this.setState({ transcript: transcript })
    
  }

  //Receives a string with transcript and string with words to search
  wordCount = (text, words) => {

    let counter = 0;
    let textArray = text.split(" ");
    let searchTerms = words.split(" ");
    let result = [];

    for(let k=0;k<searchTerms.length;k++){ 
        for(let i=0; i<textArray.length; i++){
            if(textArray[i]===searchTerms[k]){
                counter++;
            }
        }
        result[k]=counter;
        counter = 0;
    }
    
    this.createObject(result,searchTerms)
    
    return result;
    
  }

  //takes wordCount results creates object and updates state to refresh chart
  createObject = (result,searchTerms) => {
    
    let data = [];

    for(let i=0;i<searchTerms.length;i++){
      data.push({
        name: searchTerms[i],  pv: result[i] 
      })
    }

    //Update state to refresh chart
    this.setState({      
      data: data
    });    
  }

  render() {
  
    return (
      <Router>

        <Navbar/>

        <Switch>
            {!this.state.user && <Route exact path="/UserHomePage" component={Uploader}/>} 
            {!this.state.user && <Route path="/RegistrationPage" component={RegistrationPage}/>}
            <Route exact path='/Results' render={props =>
              <div>
                <TextFields updateResults={this.updateResults} />
                <BarChart data={this.state.data}  />
                <MotivationalQuote getTranscript={this.getTranscript}/>
              </div>
            }/>
        </Switch>

      </Router>
    );
  }
}

export default App;



