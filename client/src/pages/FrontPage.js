import React from "react";
import LoginBox from "../components/LoginBox";

export default class FrontPage extends React.Component {
  render() {
    return (
      <div>
        {/* <LoginBox/> */}
        <br></br>
        <div  className="diagram"><img src={ require('./images/Speech-Recognition-Diagram.png') } alt="Speech REcognition Diagram" height= "700px"/></div>
      </div>
    )
  }
}

