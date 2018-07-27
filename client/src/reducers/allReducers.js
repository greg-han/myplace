import { combineReducers } from 'redux'
import logReducers from './logReducers.js'
import userReducer from './userReducer.js'


const allReducers = combineReducers({
   logReducers,
   userReducer
})

export default allReducers
