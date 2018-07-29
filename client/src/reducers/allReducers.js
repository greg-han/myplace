import { combineReducers } from 'redux'
import logReducers from './logReducers.js'
import userReducer from './userReducer.js'
import profileReducers from './profileReducers.js'

const allReducers = combineReducers({
   logReducers,
   userReducer,
   profileReducers
})

export default allReducers
