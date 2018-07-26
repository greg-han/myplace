import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list : []
    }
  } 

  getList = () => {
    fetch('/api/Login')
    .then(res => res.json())
    .then(list => this.setState({ list }))
  }
  componentDidMount() {
   this.getList();
  }
  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        I am typing stuff in here
	{this.state.list.map((item) => {
	  return(
          <div>
	  {item}
	  </div>
	  );
	})}
      </div>
    );
  }
}

export default App;
