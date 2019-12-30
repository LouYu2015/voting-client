import React from 'react';
import logo from './logo.svg';
import './App.css';
import StatusBar from './StatusBar/StatusBar'
import {useParams} from "react-router-dom";

class App extends React.Component {

  render = () => {

    return (
      <div>
        <nav className="navbar navbar-light bg-light sticky-top">
          Your serial number: {this.props.match.params.serial_number}
        </nav>
        <StatusBar ref={(ref) => {this.voteSubmissionStatus = ref;}}
          timeout={this.props.prompt_timeout}
          pending_message={"Submitting your vote..."}
          fail_message={"Failed to submit your vote (>_<)"}
          success_message={"Your vote is submitted o(*^▽^*)o"}
          />
        <button onClick={()=>{this.voteSubmissionStatus.onRequestStart()}}>Submit</button>
        <button onClick={()=>{this.voteSubmissionStatus.onRequestDone()}}>Done</button>
        <button onClick={()=>{this.voteSubmissionStatus.onRequestFail()}}>Fail</button>
      </div>
    );
  }
}

export default App;
