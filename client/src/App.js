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
          { this.state.user ? <div>User: {this.state.user.username} UserID: {this.state.user.id}</div> : null }

        <Switch>
            {!this.state.user && <Route path="/RegistrationPage" component={RegistrationPage}/>}
            {!this.state.user && <Route path="/LoginPage/:reason?" component={LoginPage}/>}
            {/* {this.state.user && <Route exact path="/UserHomePage" component={Uploader}/>}  */}
            {this.state.user && <Route exact path="/UserHomePage" render={props =>
            <Uploader user_id={this.state.user.id}/>}
            />}
            {!this.state.user && <Route exact path="/" component={FrontPage}/>}
            {this.state.user && <Route exact path='/Results' render={props =>
              <div>
                <TextFields updateResults={this.updateResults} />
                <BarChart data={this.state.data}  />
                <MotivationalQuote getTranscript={this.getTranscript}/>
              </div>
            }/>}
        </Switch>

      </Router>
    );
  }
}

export default App;



