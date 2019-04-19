import React from "react";

import RegistrationBox from "../components/RegistrationBox";

export default class RegistrationPage extends React.Component {
  render() {
    return (
      <div>
      <h2 className="center">Create Account</h2>
          {/* this.props.history gets passed down by ReactRouter */}
          <RegistrationBox history={this.props.history}/>
      </div>
    )
  }
}