import React from "react";

import LoginBox from "../components/LoginBox";

export default class LoginPage extends React.Component {
  render() {
    const newUser = this.props.match.params.reason === "newUser";
    console.log(this.props.match);
    return (
      <div>
        { newUser && <div className="center">Your account has been successfully created. Login to get your file transcribed!</div> }
        <div>
          <LoginBox newUser={newUser}/>
        </div>
      </div>
    )
  }
}