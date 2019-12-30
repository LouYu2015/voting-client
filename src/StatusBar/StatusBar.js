import React from 'react';

class StatusBar extends React.Component {
  state = {
    pending: 0, // Number of pending network requests
    done: 0, // Number of network requests that successfully finished and need to be displayed
    error: 0, // Number of network requests that failed and need to be displayed
  }

  // Other components will call this when a network request starts
  onRequestStart = () => {
    this.setState((state, props) => ({
      pending: state.pending + 1
    }));
  }

  // Other components will call this when a network request done succesfully
  onRequestDone = () => {
    console.assert(this.state.pending > 0, "number of requests done is more than started");
    this.setState((state, props) => ({
      pending: state.pending - 1,
      done: state.done + 1
    }));
    setTimeout(this.onRequestDoneTimeout, this.props.timeout);
  }

  // Other components will call this when a network request fails
  onRequestFail = () => {
    console.assert(this.state.pending > 0, "number of requests failed is more than started");
    this.setState((state, props) => ({
      pending: state.pending - 1,
      error: state.error + 1
    }));
    setTimeout(this.onRequestFailTimeout, this.props.timeout);
  }

  // This will be called after we don't need to display the success message
  onRequestDoneTimeout = () => {
    this.setState((state, props) => ({
      done: state.done - 1
    }));
  }

  // This will be called after we don't need to display the fail message
  onRequestFailTimeout = () => {
    this.setState((state, props) => ({
      error: state.error - 1
    }));
  }

  render = () => {
    let message;
    if (this.state.pending > 0) {
      message = (<div className="alert alert-info">Submitting your vote...</div>)
    } else if (this.state.error > 0) {
      message = (<div className="alert alert-danger">Failed to submit your vote {"(>_<)"}</div>)
    } else if (this.state.done > 0) {
      message = (<div className="alert alert-success">Your vote is submitted o(*^▽^*)o</div>)
    }
    return (
      <footer class="fixed-bottom px-3">
        {message}
      </footer>
    );
  }
}

export default StatusBar;