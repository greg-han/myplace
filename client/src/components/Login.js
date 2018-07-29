import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../node_modules/jquery/dist/jquery.min.js';

const input = {
       width: '100px',
       height: '20%'
     }

const register = {
	 display: 'inline'
     }

const login = {
	 display: 'inline'
     }

class Login extends Component {

postLogin = (event) => {
  if(event) event.preventDefault();
  const luser = this.lusername.value;
  const lpass = this.lpassword.value;
  fetch('/api/LoginPage', {
      headers : {
        "Accept" : 'application/json',
        "Content-Type" : "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        username: luser, 
        password: lpass 
     })
    }
    ).then(function(value){ 
       return value.json()})
    .then(function(data){
       if(data.loggedIn){
         this.props.logOn()
         this.props.loadUser(String(this.lusername.value))
       }
       if(!data.loggedIn){
	 this.props.logOff()}
      }.bind(this)
    )	     
}

postRegister = (event) => { 
  if(event) event.preventDefault();
  const user = this.username.value;
  const pass = this.password.value;
   fetch('/api/Register', {
      method : 'POST',
      body : JSON.stringify({
        username :  user,
	password : pass 
      }),
      headers : {"Content-Type":"application/json"}
    }).then(function(value){ 
       return value.json()})
    .then(function(data){ 
       if(data.Registered){
         console.log("Thanks for Registering")}else{
           console.log("Something Went Wrong")
       }
    })
 }

render(){
    return( 
   <div className="container">
     <br />
     <form style={login} onSubmit={this.postLogin}>
       <h3>Login</h3><br/>
       <input className="form-control" ref={(elem) => {this.lusername = elem}} type="text" placeholder="username" />
       <input className="form-control" ref={(elem) => {this.lpassword = elem}} type="text" placeholder="password" />
       <button className="btn btn-primary" type="submit">Login</button>
     </form>
     <br />
     <br />
     <form style={register} onSubmit={this.postRegister}>
       <h3>Register</h3><br />
       <input className="form-control" ref={(elem) => {this.username = elem}} type="text" placeholder="username" />
       <input className="form-control" ref={(elem) => {this.password = elem}} type="text" placeholder="password" />
       <button className="btn btn-primary" type="submit">Register</button>
     </form>
   </div>
   );
  }
}

export default Login;
