import React from 'react';
import './App.css';

class Question extends React.Component {
  state = {dirty: false};

  intArrayEqual = (arr1, arr2) => {
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.dirty &&
        !this.intArrayEqual(prevProps.selected, this.props.selected)) {
      this.setState({dirty: false});
      let num_selected = this.props.selected.length;
      if (num_selected >= this.props.min_num_chosen
          && num_selected <= this.props.max_num_chosen) {
        this.props.onSubmit(this.props.id, this.props.selected);
      }
    }
  }

  onClick = (event) => {
    this.setState({dirty: true});

    let choice_id = parseInt(event.target.name);
    if (this.props.selected.includes(choice_id)) {
      this.props.onDeselect(this.props.id, choice_id);
    } else {
      if (this.props.max_num_chosen === 1 && this.props.selected.length > 0) {
        this.props.onDeselect(this.props.id, this.props.selected[0]);
      }
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
                  (active? "btn-primary" : "")}
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
      warning_element = (
        <li key="warning"
          className="list-group-item list-group-item-warning">
            {warning_message}
        </li>)
    }

    return (
    <div className="card my-3">
      <div className="card-header">
        {this.props.enable? "" : "[Locked] "}
        {this.props.message}
      </div>
      <ul className="list-group list-group-flush">
        {choice_elements}
        {warning_element}
      </ul>
    </div>);
  }
}

export default Question;