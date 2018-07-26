import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../node_modules/jquery/dist/jquery.min.js';
//import Login from './Login';


class ProfilePage extends Component {
  state = {
    response: ''
  };
 render(){ 
   return(
    <div className="container">
    <h1>Profile</h1>
      <p>
      This will be replaced by your profile.
      <br/>
      {this.state.response}
      </p>
      {this.props.loggedIn && <button onClick={this.props.logOff}>LogOut</button>}
   </div>
   );   
 }
}

export default ProfilePage;
