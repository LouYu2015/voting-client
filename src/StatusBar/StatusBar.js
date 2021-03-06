import React from 'react';

class StatusBar extends React.Component {
  state = {
    pending: 0, // Number of pending network requests
    done: 0, // Number of network requests that successfully finished and need to be displayed
    error: 0, // Number of network requests that failed and need to be displayed
    last_error_message: null // Last error message
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
  onRequestFail = (error_message=null) => {
    console.assert(this.state.pending > 0, "number of requests failed is more than started");
    this.setState((state, props) => ({
      pending: state.pending - 1,
      error: state.error + 1,
      last_error_message: error_message
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
      message = (<div className="alert alert-info">{this.props.pending_message}</div>)
    } else if (this.state.error > 0) {
      if (this.state.last_error_message) {
        message = (
          <div className="alert alert-danger">
            {this.props.fail_message}
            <br />
            {this.state.last_error_message}
          </div>);
      } else {
        message = (
          <div className="alert alert-danger">
            {this.props.fail_message}
          </div>);
      }
      
    } else if (this.state.done > 0) {
      message = (<div className="alert alert-success">{this.props.success_message}</div>)
    }
    return (
      <footer className="fixed-bottom px-3 text-center">
        {message}
      </footer>
    );
  }
}

export default StatusBar;