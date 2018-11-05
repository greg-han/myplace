const initialState = {
  'searches' : [String], 
  'groups' : [String]
}
const profileReducers = (state = initialState, action) => {
   switch(action.type){
     case 'LOAD_PROFILE':
	  return { groups : action.groups,
	           searches : action.searches}
     default:
	  return state
  }
}	

export default profileReducers 
