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
     }.bind(this)) 
  }
}
//removes the query from both the page and your database
close = (event) => {
if(event) event.preventDefault();
const value = this.props.searches[event.target.id];
const url = '/api/ProfilePage/' + value + "/" + this.props.username; 
console.log("Value",url);
fetch(url,{
  method : "POST",
  headers : {"Content-Type" : "application/json"}	
  })
  .then(function(value){
    return value.json()})
  .then(function(data){
    console.log("props",this.props.searches)	
  }.bind(this))
 this.showProfile();
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
      <div className="row">
      <div className="col-lg-6">
       <h2> Your Words </h2>     
       <ul className="list-group list-group-flush">
       {this.props.searches.map((elem,i) =>
        <li ref={(elem) => {this.query = elem}} className="list-group-item list-group-item-action" key={i}> {elem}<span id={i} onClick={this.close} className="close">x</span></li> 
       )}
      </ul>
      </div>
      <div className="col-lg-6">
      <h2> Your Groups </h2>
      </div>
      </div>
   </div>
   );   
 }
}

export default ProfilePage;
