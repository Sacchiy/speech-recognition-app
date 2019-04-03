import React, { Component } from "react";
import MotivationalQuote from "./components/MotivationalQuote";
import Home from "./pages/home";
import Results from "./pages/results";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import "./App.css";
import ButtonAppBar from "./components/navbar";
import BarChart from "./components/barChart";
//import WordCount from "./components/wordCount";
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

  updateResults = (wordstoCount) => {
    
    this.setState({
      words: wordstoCount,
      data: data
    });

    this.wordCount("this is this is on test on on car car car car 3 3",wordstoCount.toString().trim())

  }

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

  createObject = (result,searchTerms) => {
    console.log("This is result : ", result);
    
    let data = [];

    for(let i=0;i<searchTerms.length;i++){
      data.push({
        name: searchTerms[i],  pv: result[i] 
      })
    }

    

    // result.forEach(element => {
    //    console.log(element)
    //    data.push({
    //     name: searchTerms[1],  pv: element 
    //     })
    // });

    console.log(data);

    this.setState({
      
      data: data
    });
  
    
  }

  

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