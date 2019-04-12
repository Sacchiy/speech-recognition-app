import React from "react";
import LoginBox from "../components/LoginBox";

export default class FrontPage extends React.Component {
  render() {
    return (
      <div>
        "This is the Front Page - It contains pics and explanations of how the translation
        service works and you can login here"
        <br></br>
        <br></br>
        <LoginBox/>
      </div>
    )
  }
}

