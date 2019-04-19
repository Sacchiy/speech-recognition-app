import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import loginController from '../../controllers/LoginController';

class LoginBox extends React.Component {
  state = { username: "", password: "", error: null, loggedIn: false }

  login = (e) => {
    e.preventDefault();

    loginController.login(this.state.username, this.state.password, (err, user) => {
      if (err) {
        this.setState({ error: err });
      } else {
        this.props.history.push("/UserHomePage"); //triggers router to update page
      }
    });
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
      <h2 className="LogIn">Log in</h2>
      <form onSubmit={this.login}>
        <input type="text" className="box" name="username" placeholder= "Username" onChange={this.inputChanged}/>
        <input type="password" className="box" name="password" placeholder="Password" onChange={this.inputChanged}/>
        <input type="submit" className="box" id="submit" onClick={this.login} value="LOG IN"/>
        {this.state.error && <div>{this.state.error}</div>}
      </form>
      </div>
    )
  }
}

export default withRouter(LoginBox);