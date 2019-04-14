import React, { Component } from 'react';
import {LocalIP, PublicIP} from "./utils";
import './App.css';
import copy from 'copy-to-clipboard';

class App extends Component {
  state = {
    localIp: "",
    publicIp: ""
  };

  componentDidMount(){
    LocalIP((localIp) => this.setState({localIp}));
    PublicIP((publicIp) => this.setState({publicIp}));
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="cell">Your local IP</div>
          <div className="cell" onClick={() => copy(this.state.localIp)}>{this.state.localIp}</div>
        </div>
        <div className="row">
          <div className="cell">Your public IP</div>
          <div className="cell" onClick={() => copy(this.state.publicIp)}>{this.state.publicIp}</div>
        </div>
      </div>
    );
  }
}

export default App;
