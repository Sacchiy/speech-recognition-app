import React, { Component } from "react";
import MotivationalQuote from "./components/MotivationalQuote";
import Home from "./pages/home";
import Results from "./pages/results";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import logo from "./logo.svg";
import "./App.css";
import Button from '@material-ui/core/Button';
import ButtonAppBar from "./components/navbar";
import ComposedChart from "./components/barChart";


/**
 * The main App component that holds our whole React app
 */
class App extends Component {
  render() {
    return (
      <Router>

      <ButtonAppBar/>

      
      <Route exact path="/home" component={Home}/>
      <Link to="/home">Home</Link>

      <Route exact path="/results" component={Results}/>
      <Link to="/results">Results</Link>

      <Button variant="contained" color="primary">
      Hello World
    </Button>

      <ComposedChart/>

      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>YOU'RE GONNA TURN THIS BAREBONES BOILERPLATE INTO SOMETHING AMAZING!</h2>
        </div>
        <p className="App-intro">
          <MotivationalQuote />
        </p>
      </div>

      </Router>
    );
  }
}

export default App;