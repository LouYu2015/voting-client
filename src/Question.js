import React from 'react';
import './App.css';
import { act } from 'react-dom/test-utils';

class Question extends React.Component {
  onClick = (event) => {
    let choice_id = parseInt(event.target.name);
    if (this.props.selected.includes(choice_id)) {
      this.props.onDeselect(this.props.id, choice_id);
    } else {
      this.props.onSelect(this.props.id, choice_id);
    }
  }

  render = () => {
    let choice_elements = [];
    for (let choice of this.props.choices) {
      let active = this.props.selected.includes(choice.id);
      choice_elements.push(
        <li key={choice.id}
          className="list-group-item p-0 overflow-hidden">
            <button
                className={"btn btn-block rounded-0 m-0 " +
                  (active? "btn-primary" : "btn-light")}
                disabled={!this.props.enable}
                name={choice.id}
                onClick={this.onClick}>
              {choice.message}
            </button>
        </li>
      );
    }

    let warning_message;
    if (this.props.enable) {
      let numChosen = this.props.selected.length;
      if (numChosen < this.props.min_num_chosen) {
        warning_message = "Must select at least " + this.props.min_num_chosen + " option(s)";
      }
      if (numChosen > this.props.max_num_chosen) {
        warning_message = "Can't select more than " + this.props.max_num_chosen + " option(s)";
      }
    }
    let warning_element;
    if (warning_message !== undefined) {
      warning_element = <div className="alert alert-warning m-3">{warning_message}</div>
    }

    return (
    <div className="card m-3">
      <div className="card-header">
        {this.props.enable? "" : "[Locked] "}
        {this.props.message}
        {warning_element}
      </div>
      <ul className="list-group list-group-flush">
        {choice_elements}
      </ul>
    </div>);
  }
}

export default Question;