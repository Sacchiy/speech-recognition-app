import React, { Component } from "react";
import MotivationalQuote from "./components/MotivationalQuote";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Link} from 'react-router-dom';
import "./App.css";
import Navbar from "./components/navbar";
import BarChart from "./components/barChart";
import TextFields from "./components/filterBox";
import RegistrationPage from "./pages/registrationpage";
import Uploader from "./components/Uploader";
import FrontPage from "./pages/FrontPage";
import LoginPage from "./pages/LoginPage";
import loginController from "./controllers/LoginController"
import FileInfoList from "./components/FileInfoList";

//import TranscriptTextBox from "./components/TranscriptTextBox"

/**
 * The main App component that holds our whole React app
 */
class App extends Component {

  state = {
    words: [],
    data: [],
    transcript: "Your transcript will appear here",
    user: null
  };

  
  //Authentication Methods

  componentDidMount() {
    console.log("componentDidMount");
    loginController.addUserChangedListener(this.setUser);
    loginController.recheckLogin();
  }

  componentWillUnmount() {
    console.log("WillUnmount");
    loginController.removeUserChangedListener(this.setUser);
  }

  setUser = (user) => {
    console.log("setUser", user);
    this.setState({ user: user });
  }

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

        <Navbar loginController={loginController}/>
        <br/><br/>
          

        <Switch>
            {!this.state.user && <Route path="/RegistrationPage" component={RegistrationPage}/>}
            {!this.state.user && <Route path="/LoginPage/:reason?" component={LoginPage}/>}
            {this.state.user && <Route exact path="/UserHomePage" render={props =>
            <div>
            
            <div class="container">
                        <div class="row ">
                          <div class="col col-lg-2">  
                          </div>
                          <div class="col col-lg-6">
                            <Uploader user_id={this.state.user.id}/>
                          </div>
                          <div class="col col-lg-2">  
                          </div>
                        </div>
                        <br></br>
                        <div class="row ">
                          <div class="col col-lg-1">  
                          </div>
                          <div class="col col-lg-10">
                            <FileInfoList/>
                          </div>
                          <div class="col col-lg-1">  
                          </div>
                        </div>
            </div>


            </div>}
            />}

            {!this.state.user && <Route exact path="/" component={FrontPage}/>}
            
            {this.state.user && <Route exact path='/Results/:fileInfoId?' render={props =>
              <div>
                  <div class="container">
                        <div class="row ">
                          
                          <div class="col col-lg-6">
                              <MotivationalQuote getTranscript={this.getTranscript}/>
                          </div>
                          <div class="col col-lg-6">
                              <TextFields updateResults={this.updateResults} />
                              <br></br>
                              <BarChart data={this.state.data}  />
                          </div>
                          
                        </div>
                  </div>
              </div>
            }/>}
            
        </Switch>

      </Router>
    );
  }
}

export default App;

{/* { this.state.user ? <div>User: {this.state.user.username} UserID: {this.state.user.id}</div> : null } */}



