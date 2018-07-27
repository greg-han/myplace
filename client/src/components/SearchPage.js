import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../node_modules/jquery/dist/jquery.min.js';
import Searchbar from './Searchbar.js';
 
class SearchPage extends Component {
 render(){ 
   return(
    <div className="container">
      <h1>Search Here</h1>
      <p>Enter your query here. Make sure you are logged in!</p>
      {this.props.loggedIn && <Searchbar />}
      {!this.props.loggedIn && "Login to Search"}
    </div>
   );
 }
}

export default SearchPage 
