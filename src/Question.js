import React from 'react';
import './App.css';

class Question extends React.Component {
  render = () => {
    let choice_elements = [];
    for (let choice of this.props.choices) {
      choice_elements.push(
        <li key={choice.id}
          className="list-group-item p-0">
            <button className="btn btn-light btn-block rounded-0 m-0"
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