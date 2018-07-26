const LOG_ON = 'LOG_ON'
const LOG_OFF = 'LOG_OFF'

export const logOn = () => {
  return { type : LOG_ON } 
}

export const logOff = () => {
  return { type : LOG_OFF }
}
