const searchReducers = (state = [], action) => {
  switch(action.type) {
    case 'POPULATE_SEARCHES':
        return{
         action.searches
       }
    case 'ADD_SEARCHES'
       return{
        action.search 
      }
   default:
    return state
}

export default searchReducers

