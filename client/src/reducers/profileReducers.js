const initialState = {
  searches : [String] 
}
const profileReducers = (state = initialState, action) => {
   switch(action.type){
     case 'LOAD_SEARCHES': 
	  return { searches : action.searches}
     default:
	 return state
  }
}	

export default profileReducers 
