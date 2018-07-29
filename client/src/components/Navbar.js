import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../node_modules/jquery/dist/jquery.min.js';
import { Link } from 'react-router-dom';
 
class Navbar extends Component {
  addSearch = (event) => {
    if(this.props.loggedIn){
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
  searchBar = () => { 
   return (
           <div>
	   <form className="form-inline" method="post" onSubmit={this.addSearch} >
      <input ref={(elem) => this.search = elem} className="form-control mr-sm-2" type="search" placeholder="query" aria-label="Search" />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" >Search</button>
   </form> 
   </div>
   );
 }
      //{this.props.loggedIn && this.searchBar()} 
 render(){ 
   return (  
 <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link to="/" className="navbar-brand">myPlace</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link to="/" className="nav-link">About<span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link to="/SearchPage" className="nav-link">Search</Link>
      </li>
      <li className="nav-item">
        <Link to="/ProfilePage" className="nav-link"> Profile</Link>
      </li>
      <li className="nav-item">
      { !this.props.loggedIn && <Link to="/LoginPage" className="nav-link"> Login/Register</Link>}
      </li>
      <li className="nav-item dropdown">
      </li>
    </ul>
  </div>
</nav>
   );
 }
}

export default Navbar 
