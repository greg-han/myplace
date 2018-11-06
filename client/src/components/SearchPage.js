import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../node_modules/jquery/dist/jquery.min.js';
 
class SearchPage extends Component {
  addSearch = (event) => {
    if(this.props.loggedIn && this.search.value){
      //fetch('http://localhost/api/SearchPage', {
      fetch('/api/SearchPage', {
        headers : {
          "Accept" : "application/json",
          "Content-Type" : "application/json"       
        },
        method :  'POST',
        body : JSON.stringify({
        username : this.props.username,
        search : this.search.value,
        groups : false	
     })}).then(function(value){
         return value.json()})
         .then(function(data){
           console.log("SearchData", data)
     }) 
   }
 } 

  addGroup = (event) => {
    console.log("This worked",event.target.value)
    //let addgroup = group;
    if(this.props.loggedIn){
      fetch('/api/SearchPage', {
        headers : {
          "Accept" : "application/json",
          "Content-Type" : "application/json"       
        },
        method :  'POST',
        body : JSON.stringify({
        username : this.props.username,
        search : false,
        groups : event.target.value
     })}).then(function(value){
         return value.json()})
         .then(function(data){
           console.log("GroupsData", data)
     }) 
   }
 } 

 searchBar = (event) => { 
   return (
        <form className="form-inline" onSubmit={this.addSearch}>
          <input className="form-control mr-sm-2" ref={(element) => this.search = element}type="text" placeholder="query"  />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit" >Search</button>
        </form> 
   );
 }

 
groupsDropdown = (event) => {
 return( 
    <select onChange={this.addGroup} ref={(groupelem) => this.group = groupelem} className="form-control form-control-md"> 
      <option value='0'>Groups</option>
      <option value='ted'>TED</option>
      <option value='music'>Music</option>
   </select>
  );
}

 render(){ 
   return(
    <div className="container">
      <div className="row"> 
        <div className="col-lg-6">
          <h1>Enter your Queries</h1>
          <p>Enter your query here. Make sure you are logged in!</p>
          {this.props.loggedIn && this.searchBar()}
          {!this.props.loggedIn && "Login to Search"}
	</div>
        <div className="col-lg-6">
          <h1>Choose Your Groups</h1>
          <p>Choose your groups from the dropdown menu</p>
          {this.props.loggedIn && this.groupsDropdown()}
          {!this.props.loggedIn && "Login to add Groups"}
	</div>
      </div>
    </div>
   );
 }
}

export default SearchPage 
