const express = require('express');
const path = require('path');
const session = require('express-session');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const cors = require('cors');
const mongoose = require('mongoose');
const flash = require('connect-flash');

const port = process.env.PORT || 8080;

const passport = require('passport');
//used as like a function, but it's really just using the above passport variable and doing it.
require('./passport')(passport);
//mongoose.connect('mongodb://greg:gregdb1@ds231501.mlab.com:31501/myplace',{ useNewUrlParser : true});

//mongoose.connect('mongodb://localhost/myplace', { useNewUrlParser : true });
mongoose.connect('mongodb://localhost/myplace');
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
 
  //Initalize passport
  app.use(passport.initialize());
  app.use(passport.session());
  

  //set default route. (React Router handles all the rest).
  app.use(express.static(path.join(__dirname, 'client/build')));


//Register/signup
  //app.post('/api/Register', passport.authenticate('local-signup',{
  app.post('/api/Register',function(req,res){
  // failureFlash : true  
  //}),function(req, res){
       console.log("Signed Up?", req.isAuthenticated());
       res.end();
});

//Login!
 app.post('/api/LoginPage', passport.authenticate('local-login', { failureFlash : true 
  }),function(req, res){
       console.log("Logged in?", req.isAuthenticated());
  });


//Logout
  app.get('/api/Logout',
    function(req, res){
      req.logout();
      res.json({ "loggedOut" : !req.isAuthenticated() });
    });


 /* app.get('/api/ProfilePage',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
      console.log("In the profile page");
      res.render('profile', { user : req.user } );
    });
 */


  //uses default route as default get request. (REally just loads the app for reactx router).
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'client/build/index.html')    );
  });

  app.listen(port);
  console.log('Running Node on Port: ' + port);
  }
