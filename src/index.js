import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import VoteSubmissionApp from './VoteSubmissionApp/App';
import VoteResultApp from './VoteResultApp/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        path="/qr_code/:serial_number"
        render={(props) => (<VoteSubmissionApp {...props} prompt_timeout={3000} />)}>
      </Route>
      <Route
        path="/view_result/:question_id"
        render={(props) => (<VoteResultApp {...props}/>)}>
      </Route>
    </Switch>
  </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
