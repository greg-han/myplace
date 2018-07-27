const logReducers = (state = {loggedIn : false}, action) => {
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

