const logReducers = (state = {loggedIn : true}, action) => {
 switch(action.type){
   case 'LOG_ON':
      return {loggedIn : true}
   case 'LOG_OFF':
      return {loggedIn : false}
   default:
      return state 
  }
}

export default logReducers 

