import React from 'react';
import './App.css';
import StatusBar from './StatusBar/StatusBar'
import Question from './Question'

let BASE_URL = "http://localhost:8000/";

class App extends React.Component {
  state = {
    questions: [],
    selected: []
  };

  componentDidMount = () => {
    this.onRefresh();
  }

  onRefresh = () => {
    this.refreshStatus.onRequestStart();
    fetch(BASE_URL + "questions/")
    .then(async (response) => {
      if (response.ok) {
        this.setState({questions: await response.json()});
        this.refreshStatus.onRequestDone();
      } else {
        this.refreshStatus.onRequestFail();
      }
    })
    .catch((error) => {
      console.log(error);
      this.refreshStatus.onRequestFail();
    })

    this.refreshStatus.onRequestStart();
    fetch(BASE_URL + "get_selected/" + this.props.match.params.serial_number)
    .then(async (response) => {
      if (response.ok) {
        this.setState({selected: await response.json()});
        this.refreshStatus.onRequestDone();
      } else {
        this.refreshStatus.onRequestFail();
      }
    })
    .catch((error) => {
      console.log(error);
      this.refreshStatus.onRequestFail();
    })
  };

  render = () => {
    let question_elements = [];
    for (let question of this.state.questions) {
      // Get selected choices for this question
      let selected_choices = [];
      for (let selected_choice of this.state.selected) {
        if (selected_choice["question"] === question["id"]) {
          selected_choices.push(selected_choice["choice"]);
        }
      }

      question_elements.push(
        <Question key={question.id}
          enable={question.enable}
          message={question.message}
          min_num_chosen={question.min_num_chosen}
          max_num_chosen={question.max_num_chosen}
          choices={question.choices}
          selected = {selected_choices}/>
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
        <button onClick={()=>{this.onRefresh()}}>Refresh</button>
      </div>
    );
  }
}

export default App;
