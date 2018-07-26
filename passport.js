const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){

//seralizes the user so that they are considered "logged in"
passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

//deserializes the user "logged out"
passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });




//Making a local signup.
passport.use('local-signup', new LocalStrategy({
   passReqToCallback : true
   },
   function(req, username, password, done){
     User.findOne({ 'username' : username }, function(err, user){
       if(err) return done(err);

       if(user){
         return done(null, false, req.flash('signupMessage', 'Username taken'));
       } else{
            var newUser = new User();
            newUser.local.username = username;
            newUser.local.password = newUser.generateHash(password);
 
            newUser.save(function(err) {
              if(err) throw err;
              return done(null, newUser);
            });
       }
    });
}));

//Making a local login
passport.use('local-login', new LocalStrategy({
   passReqToCallback : true
   },
   function(req, username, password, done) {
     if(err) return done(err);

     if(!user) return done(null, false, req.flash('loginMessage', 'No such user dude!'));

     if(!user.validPassword(password))
       return done(null, false, req.flash('loginMessage', 'Wrong password dude...'));
     return done(null, user);
   }));



};// end of passport function. To use this, require it (like an import) but pass your passport
//variable, which is your imported passport lib that you saved as a variable(also required).




