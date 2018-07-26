import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../node_modules/jquery/dist/jquery.min.js';

const input = {
       width: '100px',
       height: '20%'
     }

const register = {
	 marginLeft: '30%',
	 float: 'left'
     }

const login = {
	 float: 'right',
         marginRight: '30%'
     }


class Login extends Component {
constructor(props){
 super(props);
 //I Know this defeats the purpose of using redux, but
 //I need to test the async fetch (remove later)
 this.state = {
  logged : false 
 } 
}
changeLog = () => {
  this.state.logged ? this.props.logOn() : this.props.logOff();
  console.log("In here",this.props.loggedIn);
}
postLogin = (event) => {
  if(event) event.preventDefault();
  const luser = this.lusername.value;
  const lpass = this.lpassword.value;
  console.log("postdata",luser,lpass);
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
    .then(data => this.setState({ logged : data.loggedIn})) 
    this.changeLog()
}

postRegister = (event) => { 
  if(event) event.preventDefault();
  const user = this.username.value;
  const pass = this.password.value;
  console.log("RegData",user,pass);
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
   <div>
     <form style={register} onSubmit={this.postRegister}>
       Register<br />
       <input ref={(elem) => {this.username = elem}} type="username" placeholder="username" />
       <br />
       <input ref={(elem) => {this.password = elem}} type="password" placeholder="password" />
       <br />
       <button type="submit">Login</button>
     </form>

     <form style={login} onSubmit={this.postLogin}>
       Login<br/>
       <input ref={(elem) => {this.lusername = elem}} type="username" placeholder="username" />
       <br />
       <input ref={(elem) => {this.lpassword = elem}} type="password" placeholder="password" />
       <br />
       <button type="submit">Register</button>
     </form>
   </div>
   );
  }
}

export default Login;
