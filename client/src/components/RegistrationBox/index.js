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
      <form onSubmit={this.login}>
        <div>
          Username: <input type="text" name="username" onChange={this.inputChanged}/>
        </div>
        <div>
          Password: <input type="password" name="password" onChange={this.inputChanged}/>
        </div>
        <input type="submit" value="Login"/>
        {this.state.error && <div>{this.state.error}</div>}
      </form>
    )
  }
}