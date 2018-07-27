const initialState = {
  username : "" 
}
const userReducer = (state = initialState, action) => {
   switch(action.type){
     case 'LOAD_USER': 
	  return { username : action.username }
     case 'DROP_USER':
	 return { username : action.username } 
     default:
	 return state
  }
}	

export default userReducer
