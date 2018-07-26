import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../node_modules/jquery/dist/jquery.min.js';

class Homepage extends Component {
 render(){ 
   return(
    <div className="container">
    <h1>About</h1>
    <p>Welcome to myPlace! This is a place where you can find your place! It's called myplace and not your place because when you are in myPlace this place is your place! So when you are here, you will feel like this is "my" place (My as in you when you are considering this to be your own).  You can customize your experience here and find what ti is that interests and drives you.</p>
   </div>
   );   
 }
}

export default Homepage;
