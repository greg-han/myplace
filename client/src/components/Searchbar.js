import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Searchbar extends Component {
 addSearch = (event) => {
  console.log("In the add fxn",this.search.value);
  if(this.props.loggedIn){
  fetch('/api/searchBar', {
     headers : {
       "Accept" : "application/json",
       "Content-Type" : "application/json"
     },
     method : 'POST',
     body: JSON.stringify({
	username : this.props.username,
        search : this.search.value 
     })
   }).then(function(value){
      return value.json()})
     .then(function(data){
      console.log("SearchData", data)
     }.bind(this))
  }
 }
 render(){
  return (
    <form className="form-inline" >
      <input ref={(elem) => this.search = elem} className="form-control mr-sm-2" type="search" placeholder="query" aria-label="Search" />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.addSearch}>Search</button>
   </form>
  );

 }
}

export default Searchbar 
