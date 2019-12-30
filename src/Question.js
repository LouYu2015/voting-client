import React from 'react';
import './App.css';
import { act } from 'react-dom/test-utils';

class Question extends React.Component {
  render = () => {
    let choice_elements = [];
    for (let choice of this.props.choices) {
      let active = this.props.selected.includes(choice.id);
      choice_elements.push(
        <li key={choice.id}
          className="list-group-item p-0 overflow-hidden">
            <button className={"btn btn-block rounded-0 m-0 " +
                (active? "btn-primary" : "btn-light")}
                disabled={!this.props.enable}>
              {choice.message}
            </button>
        </li>
      );
    }

    return (
    <div className="card m-3">
      <div className="card-header">
        {this.props.message}
      </div>
      <ul className="list-group list-group-flush">
        {choice_elements}
      </ul>
    </div>);
  }
}

export default Question;