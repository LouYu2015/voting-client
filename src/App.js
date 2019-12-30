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
  voteSubmissionStatusBar = React.createRef();
  refreshStatusBar = React.createRef();

  componentDidMount = () => {
    this.onRefresh(true);
  }

  /**
   * Send a request to `link` and use the returned json to update
   * `target` in the state
   */
  updateResource = (link, target, verbose=false) => {
    if (verbose)
      this.refreshStatusBar.current.onRequestStart();

    fetch(link)
    .then(async (response) => {
      if (response.ok) {
        this.setState({[target]: await response.json()});
        if (verbose)
          this.refreshStatusBar.current.onRequestDone();
      } else {
        if (verbose)
          this.refreshStatusBar.current.onRequestFail();
      }
    })
    .catch((error) => {
      console.log(error);
      if (verbose)
        this.refreshStatusBar.current.onRequestFail();
    })
  }

  onRefresh = (verbose=false) => {
    this.updateResource(BASE_URL + "get_selected/" + this.props.match.params.serial_number + "/",
                        "selected",
                        verbose);
    this.updateResource(BASE_URL + "questions/",
                        "questions",
                        verbose);
  };

  onSelect = (question_id, choice_id) => {
    this.setState(((state, props) => {
      return {selected: state.selected.concat({question: question_id,
                                                    choice: choice_id})}}));
  }

  onDeselect = (question_id, choice_id) => {
    this.setState((state, props) => {
      let delete_index = this.state.selected.findIndex((e) => (e.choice === choice_id));
      let new_selected = [...this.state.selected];
      new_selected.splice(delete_index, 1);
      return {selected: new_selected}});
  }

  onSubmit = (question_id, choices) => {
    this.voteSubmissionStatusBar.current.onRequestStart();
    fetch(BASE_URL + "update_vote/" + question_id + "/",
      {
        body: JSON.stringify({serial_number: this.props.match.params.serial_number,
          choice_ids: choices}),
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'POST'
      })
    .then(async (response) => {
      if (response.ok) {
        this.voteSubmissionStatusBar.current.onRequestDone();
      } else {
        this.voteSubmissionStatusBar.current.onRequestFail();
      }
    })
    .catch((error) => {
      console.log(error);
      this.voteSubmissionStatusBar.current.onRequestFail();
    })
  }

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
        <Question
          id={question.id}
          onSelect={this.onSelect}
          onDeselect={this.onDeselect}
          onSubmit={this.onSubmit}
          key={question.id}
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
        <nav className="navbar navbar-light bg-light sticky-top border-bottom">
          Your serial number: {this.props.match.params.serial_number}
          <button className="btn btn-link"
            onClick={() => {this.onRefresh(true)}}>Refresh</button>
        </nav>
        <div className="container footer-fix">
          {question_elements}
        </div>
        <StatusBar ref={this.refreshStatusBar}
          timeout={this.props.prompt_timeout}
          pending_message={"Loading questions..."}
          success_message={"Successfully loaded questions"}
          fail_message={"Failed to load questions"}
          />
        <StatusBar ref={this.voteSubmissionStatusBar}
          timeout={this.props.prompt_timeout}
          pending_message={"Submitting your vote..."}
          success_message={"Your vote is submitted o(*^▽^*)o"}
          fail_message={"Failed to submit your vote (>_<)"}
          />
        <footer className="bg-light footer border-top p-3 text-center">
          UWCSSA Voting System 2.0
        </footer>
      </div>
    );
  }
}

export default App;
