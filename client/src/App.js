import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import NavBarContainer from  './containers/NavBarContainer.js';
import Homepage from './components/Homepage.js';
import ProfilePageContainer from './containers/ProfilePageContainer.js';
import SearchPageContainer from './containers/SearchPageContainer.js';
import GroupsContainer from './containers/GroupsContainer.js';
import LoginContainer from './containers/LoginContainer.js';
import { PersistGate } from 'redux-persist/integration/react'; 
import { store, persistor } from './configureStore.js';

class App extends Component { 
  render() {
    return (
     <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <Router>
        <div>
        <NavBarContainer />
	 <Switch>  
          <Route exact path="/" component={Homepage} />
          <Route exact path="/ProfilePage" component={ProfilePageContainer} />	 
          <Route exact path="/SearchPage" component={SearchPageContainer} />	 
          <Route exact path="/Groups" component={GroupsContainer} />	 
         <Route exact path="/LoginPage" component={LoginContainer} />
	 </Switch>
	 </div>
      </Router>
     </PersistGate>
     </Provider>
    );
  }
}

export default App;
