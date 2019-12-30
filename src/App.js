import React from 'react';
import logo from './logo.svg';
import './App.css';
import StatusBar from './StatusBar/StatusBar'

class App extends React.Component {
  render = () => {
    return (
      <div className="App">
        <StatusBar ref={(ref) => {this.statusBar = ref;}}
          timeout={5000}/>
        <button onClick={()=>{this.statusBar.onRequestStart()}}>Submit</button>
        <button onClick={()=>{this.statusBar.onRequestDone()}}>Done</button>
        <button onClick={()=>{this.statusBar.onRequestFail()}}>Fail</button>
      </div>
    );
  }
}

export default App;
