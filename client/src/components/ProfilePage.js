import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../node_modules/jquery/dist/jquery.min.js';
//import Login from './Login';

class ProfilePage extends Component {
 logOffandDrop = () =>{
  console.log("I am in this function");
  this.props.logOff()
  this.props.dropUser()
 }
 showprops = () => {
  console.log("props", this.props);
 }
 render(){ 
   return(
    <div className="container">
    <h1>Profile</h1>
      <p>
      This will be replaced by your profile.
      <br/>
      </p>
      {this.props.loggedIn && <button onClick={this.logOffandDrop}>LogOut</button>}
      {false && <button onClick={this.showprops}>ShowProps</button>}
   </div>
   );   
 }
}

export default ProfilePage;
