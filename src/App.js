import React from 'react';
import './App.css';
import StatusBar from './StatusBar/StatusBar'
import Question from './Question'

class App extends React.Component {
  state = {
    questions: [
      {
          "id": 1,
          "enable": false,
          "message": "测试",
          "min_num_chosen": 1,
          "max_num_chosen": 1,
          "choices": [
              {
                  "id": 1,
                  "message": "选项1"
              },
              {
                  "id": 2,
                  "message": "选项2"
              }
          ]
      }
  ],
    selected: []
  }

  render = () => {
    let question_elements = [];
    for (let question of this.state.questions) {
      console.log(question);
      question_elements.push(
        <Question key={question.id}
          enable={question.enable}
          message={question.message}
          min_num_chosen={question.min_num_chosen}
          max_num_chosen={question.max_num_chosen}
          choices={question.choices} />
      );
    }
    return (
      <div>
        <nav className="navbar navbar-light bg-light sticky-top">
          Your serial number: {this.props.match.params.serial_number}
        </nav>
        <div className="container">
          {question_elements}
        </div>
        <StatusBar ref={(ref) => {this.voteSubmissionStatus = ref;}}
          timeout={this.props.prompt_timeout}
          pending_message={"Submitting your vote..."}
          success_message={"Your vote is submitted o(*^▽^*)o"}
          fail_message={"Failed to submit your vote (>_<)"}
          />
        <StatusBar ref={(ref) => {this.refreshStatus = ref;}}
          timeout={this.props.prompt_timeout}
          pending_message={"Loading questions..."}
          success_message={"Successfully loaded questions"}
          fail_message={"Failed to load questions"}
          />
        <button onClick={()=>{this.refreshStatus.onRequestStart()}}>Submit</button>
        <button onClick={()=>{this.refreshStatus.onRequestDone()}}>Done</button>
        <button onClick={()=>{this.refreshStatus.onRequestFail()}}>Fail</button>
      </div>
    );
  }
}

export default App;
