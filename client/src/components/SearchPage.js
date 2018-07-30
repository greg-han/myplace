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
        search : this.search.value
     })}).then(function(value){
         return value.json()})
         .then(function(data){
           console.log("SearchData", data)
     }) 
   }
 } 

 searchBar = (event) => { 
   return (
        <form className="form-inline" onSubmit={this.addSearch}>
          <input className="form-control mr-sm-2" ref={(elem) => this.search = elem}type="text" placeholder="query"  />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit" >Search</button>
        </form> 
   );
 }

 render(){ 
   return(
    <div className="container">
      <h1>Search Here</h1>
      <p>Enter your query here. Make sure you are logged in!</p>
         {this.props.loggedIn && this.searchBar()}
         {!this.props.loggedIn && "Login to Search"}
    </div>
   );
 }
}

export default SearchPage 
