const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
//Here, put the mongoose connection in
const userSchema  = new mongoose.Schema({
  username : {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  searches:  {
    type: [Object],
    default: []
  },
  groups: {
    type: [Object],
    default: []
  }
});

//userSchema.methods.generateHash = function(password){
//  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//}

//userSchema.methods.validPassword = function(password){
//  return bcrypt.compareSync(password, this.password);
//}

module.exports = mongoose.model('User', userSchema);
