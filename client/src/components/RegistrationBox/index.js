import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class LoginBox extends React.Component {
  state = { username: "", password: "", error: null, loggedIn: false }

  login = (event) => {
    event.preventDefault();

    const postData = { username: this.state.username, password: this.state.password };
    
    axios.post("/api/user/register", postData)
      .then(response => {
          // Got here, we should have a cookie set and can go forward
          console.log("User logged in");

          // https://tylermcginnis.com/react-router-programmatically-navigate/
          this.props.history.push('/LoginPage/newUser')
        })
      .catch(err => {
        this.setState({ error: err.message });
      })
  }

  inputChanged = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/UserHomePage"/>;
    }

    return (
      <div className="center">
      <form onSubmit={this.login}>
        <div>
          <div>Username:</div>
          <input type="text" className="box" name="username" onChange={this.inputChanged}/>
        </div>
        <div>
        <div> Password: </div>
        <input type="password" className="box" name="password" onChange={this.inputChanged}/>
        </div>
        <input type="submit" id="submit" className="box" value="SIGN UP"/>
        {this.state.error && <div>{this.state.error}</div>}
      </form>
      </div>
    )
  }
}