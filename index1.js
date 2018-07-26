const express = require('express');
const path = require('path');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const RegisterStrategy = require('passport-local-register').Strategy;
const session = require('express-session');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const cors = require('cors');
const User = require('./db/user');
const mongoose = require('mongoose');
var flash = require('connect-flash');

const port = process.env.PORT || 8080;

mongoose.connect("mongodb://greg:gregdb1@ds231501.mlab.com:31501/myplace",{ useNewUrlParser : true});


passport.use(new Strategy({ passReqToCallback : true },
  function(username, password, done){
      User.findOne({ username: username }, function(err, doc){
        if(err) { return done(err); }
        if(!doc){
	  return done(null, false, req.flash('signupMessage','invalid username'));
	}	
	if(doc.password != password){
          return done(null, false, { message: 'Wrong password.' });
        }
	return done(null, user, { message : "Login success" });
      })
   }
  ));

passport.use(new RegisterStrategy(
  function verify(username, password, done) {
    User.findOne({
      'username' : username
    }, function(err, user) {
       if (err) {
	 return done(err);
       }
       if (!user) {
	 return done();
       }
       if (user.password != password) {
         return done(null, false);
       }
       done(null, user);
    });
  }, function create(username, password, done) {
    User.create({
      'username' : username,
      'password' : password
    }, function(err, user) {
      if(!user) {
	err = new Error("user creation failed.");
	return done(err);
      }
      done(null, user);
    });
  }
));

passport.serializeUser(function(user, cb){
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
 db.users.findById(id, function(err, user){
   if(err) { return cb(err); }
   cb(null, user);
 });
});

//This utilizes all the CPu cores. I found this bit of code from an express github.
//i'll add where to find it after i'm done writing this section
if (cluster.isMaster){
 console.error(`Node cluster master ${process.pid} is running `);

 // Fork workers.
 for (let i = 0; i < numCPUs; i++){
   cluster.fork();
 }

 cluster.on('exit', (worker, code, signal) => {
   console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);	
 });
} else {


//This is the rest of the DB after all cores are utlizied
  const app = express();
//load all the middleware for passport
  app.use(cors());
  app.use(require('morgan')('combined'));
  app.use(require('cookie-parser')());
  app.use(require('body-parser').urlencoded({ extended: true }));
  app.use(require('express-session')({ secret: 'keyboard cat', resave : false, saveUninitialized: false } ));
  app.use(flash());
  app.set('view engine', 'ejs');
 
  //Initalize passport
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.static(path.join(__dirname, 'client/build')));

 app.post('/api/Login', passport.authenticate('local', { failureFlash : true }),
 // app.post('/api/Login',
    function(req, res){
      console.log("Logged in?", req.isAuthenticated());
      res.json({ "loggedIn" : req.isAuthenticated() });
  });

  //I know that this can be done in one post request and this localRegister can both verify authetnication and register if not authenticated, but this is split to have 2 forms on one page.
  //Should keep tabs on it because you may want to change later.
  //app.post('/api/Register', passport.authenticate('localRegister'), 
  app.post('/api/Register', 
    function(req, res, done) {
     var test = User({ username : "Greg", password : "password" }) 
     test.save(function(err,data){
	 if(err) done(err)
         done(null,data) });
    console.log("Registered?", req.isAuthenticated());
    //res.json({ "Registered" : req.isAuthenticated() });   
  });

  app.get('/api/Logout',
    function(req, res){
      res.json({ "loggedOut" : !req.isAuthenticated() });
    });


 /* app.get('/api/ProfilePage',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
      console.log("In the profile page");
      res.render('profile', { user : req.user } );
    });
 */
  
  //Might want to keep this at the end otherwise it might load first.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'client/build/index.html')    );
  });

  app.listen(port);
  console.log('Running Node on Port: ' + port);
}
