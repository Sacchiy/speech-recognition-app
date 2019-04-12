import React from "react";

import RegistrationBox from "../components/RegistrationBox";

export default class RegistrationPage extends React.Component {
  render() {
    return (
      <div>
        Create a new user
        <div>
          {/* this.props.history gets passed down by ReactRouter */}
          <RegistrationBox history={this.props.history}/>
        </div>
      </div>
    )
  }
}