import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import NavBarContainer from  './containers/NavBarContainer.js';
import logReducers from './reducers/logReducers'
import Homepage from './components/Homepage.js';
import ProfilePageContainer from './containers/ProfilePageContainer.js';
import SearchPageContainer from './containers/SearchPageContainer.js';
import LoginContainer from './containers/LoginContainer.js';
 
let store = createStore(logReducers);

class App extends Component { 
  render() {
    return (
     <Provider store={store}>
      <Router>
      <div>
        <NavBarContainer />
	 <Switch>  
          <Route exact path="/" component={Homepage} />
          <Route exact path="/ProfilePage" component={ProfilePageContainer} />	 
          <Route exact path="/SearchPage" component={SearchPageContainer} />	 
         <Route exact path="/LoginPage" component={LoginContainer} />
	 </Switch>
      </div>
      </Router>
     </Provider>
    );
  }
}

export default App;
