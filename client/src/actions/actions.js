const LOG_ON = 'LOG_ON'
const LOG_OFF = 'LOG_OFF'
const LOAD_USER = 'LOAD_USER'
const DROP_USER = 'DROP_USER'
const LOAD_PROFILE = 'LOAD_PROFILE'

export const logOn = () => {
  return { type : LOG_ON } 
}

export const logOff = () => {
  return { type : LOG_OFF }
}

export const loadUser = (username) => {
  return { type : LOAD_USER,
	   username : username }
}

export const dropUser = () => {
  return { type : DROP_USER
	   }
}

export const loadProfile = (searches,groups) => {
  return { type : LOAD_PROFILE,
	   searches : searches,
           groups : groups
           }
}
