import React from "react";

import LoginBox from "../components/LoginBox";

export default class LoginPage extends React.Component {
  render() {
    const newUser = this.props.match.params.reason === "newUser";
    console.log(this.props.match);
    return (
      <div>
        <br/>
        Login Page
        <br/>
        { newUser && <div>Your account has been created. Login to continue</div> }
        <br/>
        <div>
          <LoginBox newUser={newUser}/>
        </div>
      </div>
    )
  }
}