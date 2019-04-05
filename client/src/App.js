import React, { Component } from "react";
//import MotivationalQuote from "./components/MotivationalQuote";
import Home from "./pages/home";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import "./App.css";
import ButtonAppBar from "./components/navbar";
import BarChart from "./components/barChart";
import TextFields from "./components/filterBox";
import Signup from "./pages/signup";
import Signin from "./pages/signin";


/**
 * The main App component that holds our whole React app
 */
class App extends Component {

  state = {
    words: [],
    data: [],
    currentPage: "Home"
  };

  //Called from within <TextFields/> component provides words in input text box
  updateResults = (wordstoCount) => {
    
    this.setState({
      words: wordstoCount
    });

    this.wordCount("this is this is on test on on car car car car 3 3",wordstoCount.toString().trim())

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

  //Part of Routing. Sent to ButtonAppBar component to get the page and update state
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  //Comes from the main render() 
  decideLocation = () => {
    if (this.state.currentPage === "Home") {
      return <Home/>;
    } else if (this.state.currentPage === "Signup") {
      return (
        <div>
          <Signup/>
        </div>
      )
    } else if (this.state.currentPage === "Signin") {
      return (
        <div>
          <Signin/>
        </div>
      )
    }else if (this.state.currentPage === "Results") {
      return (
        <div>
          <TextFields updateResults={this.updateResults}/>
          <BarChart data={this.state.data}  />
        </div>
      )
    } 
  }

  render() {
    return (
      <Router>

        <ButtonAppBar 
            currentPage={this.state.currentPage}
            handlePageChange={this.handlePageChange}
        />

        {this.decideLocation()}

      </Router>
    );
  }
}

export default App;



{/* <Route exact path="/home" component={Home}/>
        <Link to="/home">Home</Link>

        <Route exact path="/results" component={Results}/>
        <Link to="/results">Results</Link> */}