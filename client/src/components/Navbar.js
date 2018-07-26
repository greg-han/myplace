import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../node_modules/jquery/dist/jquery.min.js';
import Searchbar from './Searchbar';
import { Link } from 'react-router-dom';
 
class Navbar extends Component {
 render(){ 
   return (  
 <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link to="/" className="navbar-brand">myPlace</Link>
      {this.props.loggedIn && <Searchbar />} 
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
        <Link to="/LoginPage" className="nav-link"> Login </Link>
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
