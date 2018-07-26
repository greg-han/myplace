const logReducers = (state = false, action) => {
 switch(action.type){
   case 'LOG_ON':
      return true
   case 'LOG_OFF':
      return false
   default:
      return state 
 }
}

export default logReducers 

