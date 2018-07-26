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
 //Just testing if express/react proxy is working
 this.state = {
   list : []
 }
}

//Written for the sole purpose of testing express/react proxy
getLogin = () => {
  fetch('/api/Login')
  .then(res => res.json())
  .then(list => this.setState({ list }))
 }

//call function when mounted to test if proxy is working
componentDidMount() {
 this.getLogin()
}
  render(){
    return( 
   <div>
     <form style={register}>
Register<br />
<input style={input} type="text" placeHolder="e-mail"/>
<br />
<input  style={input} type="text" placeHolder="username"/>
 <br />
<input style={input} type="password" placeHolder="password"/>
  <br />
  <input className="button" type="submit"></input>
</form>

<form style={login}>
Login<br/>
<input className="username" type="text" placeHolder="username"/>
 <br/>
<input className="password" type="password" placeHolder="password"/>
  <br/>
  <input className="button" type="submit"></input>
</form>
  <div>
  {this.state.list.map((element) => {
  return (
   <div>
   {element}
   </div>
  ) 
  })}
  </div>
 </div>
   );
  }
}

export default Login;
