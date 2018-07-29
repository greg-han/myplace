import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../node_modules/jquery/dist/jquery.min.js';
//import Login from './Login';

class ProfilePage extends Component {

 logOffandDrop = () =>{
  this.props.logOff()
  this.props.dropUser()
 }

 showprops = () => {
  console.log("props", this.props);
 }

 returnGreet = () => {
  return 'Hello ' + this.props.username + ' !'
 }

 showProfile = () => {
    if(this.props.loggedIn){
      fetch('/api/ProfilePage', {
        headers : {
          "Accept" : "application/json",
          "Content-Type" : "application/json"       
        },
        method :  'POST',
        body : JSON.stringify({
        username : this.props.username
     })})
      .then(function(value){
         return value.json()})
      .then(function(data){
	 this.props.loadSearches(data)
	 console.log("SearchesInRedux",this.props.searches)
     }.bind(this)) 
  }
}

 componentDidMount(){
  this.showProfile();
 }

 render(){ 
   return(
    <div className="container">
    <h1>Profile</h1>
      <p>
      {this.props.loggedIn && this.returnGreet()}
      <br/>
      </p>
      {this.props.loggedIn && <button className="btn btn-primary" onClick={this.logOffandDrop}>LogOut</button>}
      <br/> <br />
       <h2> Your Words </h2>     
       <ul className="list-group list-group-flush">
       {this.props.searches.map((elem,i) =>
        <li className="list-group-item" key={i}> {elem} </li> 
       )}
      </ul>
   </div>
   );   
 }
}

export default ProfilePage;
