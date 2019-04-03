import React, { Component } from "react";
import MotivationalQuote from "./components/MotivationalQuote";
import Home from "./pages/home";
import Results from "./pages/results";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import "./App.css";
import ButtonAppBar from "./components/navbar";
import BarChart from "./components/barChart";
import WordCount from "./components/wordCount";
import TextFields from "./components/filterBox";




const data = [
  {
    name: 'Data 2',  pv: 800, 
  },
  {
    name: 'Page B',  pv: 967, 
  },
  {
    name: 'Page C',  pv: 1098,
  }
];

  

/**
 * The main App component that holds our whole React app
 */
class App extends Component {

  state = {
    words: [],
    data: []
  };

  updateResults = (result) => {
    
    this.setState({
      words: result,
      data: data//this.wordCount('this text text is test', result)
    });

    console.log(this.wordCount('this text text is test', result));
  }

  wordCount = (text, words) => {

    let counter = 0;
    let textArray = text.split(" ");
    let searchTerms = words.split(" ");
    let result = [];

    for(let k=0;k<searchTerms.length;k++){ 
        for(let i=0; i<textArray.length; i++){
            if(textArray[i]==searchTerms[k]){
                counter++;
            }
        }
        result[k]=counter;
        counter = 0;
    }
    
    return result;
    
  }

  createObject = (array) => {
    
    array.forEach(element => {
      console.log(element)
    });
    
  }

  //this.createObject([4,5,6]);


  render() {
    return (
      <Router>

      <ButtonAppBar/>
      <MotivationalQuote />
      
      <Route exact path="/home" component={Home}/>
      <Link to="/home">Home</Link>

      <Route exact path="/results" component={Results}/>
      <Link to="/results">Results</Link>

    
      <TextFields updateResults={this.updateResults}/>
      

      <BarChart data={this.state.data}  />

      
       
       

      </Router>
    );
  }
}

export default App;