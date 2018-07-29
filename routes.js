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

//used as like a function, but it's really just using the above passport variable and doing it.
//
//mongoose.connect('mongodb://localhost/myplace');

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
  app.use(bodyParser.json());
  app.use(require('express-session')({ secret: 'keyboard cat', resave : false, saveUninitialized: false } ));
  app.use(flash());

  //set default route. (React Router handles all the rest).
  app.use(express.static(path.join(__dirname, 'client/build')));

const mongoose = require('mongoose');
mongoose.connect('mongodb://greg:gregdb1@ds231501.mlab.com:31501/myplace',{ useNewUrlParser : true});
//mongoose.connect('mongodb://localhost:27017/myplace',{ userNewUrlParser : true});
mongoose.Promise = global.Promise;

const User = require('./db/user');


//Register/signup
 app.post('/api/Register', function(req, res, done){
       let regged; 
       User.findOne({ username : req.body.username }, function(err, doc){
       if(err) return done(err);
       if(doc){
	 regged = false;
	 console.log("Username Taken");
	 return done(null,res.json({"Registered" : regged}));
       } 
       if(!doc){
	   console.log(req.body.username);
	   var newUser = new User({username : req.body.username,password : req.body.password});
	   newUser.save(function(err){
	     if(err) throw err;
	     console.log("In new user");
	     regged = true;
	     return done(null,res.json({"Registered" : regged}));
	   });
        }
     });
 });

//Login!
 app.post('/api/LoginPage', function(req, res, done){
    let logged = {"username" : '', loggedIn : false }
    User.findOne({ username : req.body.username }, function(err, doc){
	if(err) return done(err);
	if(doc && doc.password == req.body.password){
	  console.log("doc",doc);
	  logged.loggedIn = true;
	  logged.username = req.body.username
          return done(null,res.json(logged))
	} 
	else{
           console.log("Didn't log in")
	   logged.loggedIn = false;
           return done(null,res.json(logged));
       }
   });
 });


app.post('/api/SearchPage', function(req, res, done){
   let stuff = {"username" : '', loggedIn : false }
   return done(null,res.json(stuff));
   //console.log("In post", req.body.username, req.body.search);
  /* User.findOneAndUpdate({ username : req.body.username },{ $push: { searches : req.body.search}} , function(err, doc){
     if(err) return done(err);
     if(doc){
       console.log("In here");
       return done(null,res.json(doc))
      }
     else{
      return done(null,res.json(doc))
     }
  });*/
 });

/*
app.post('/api/ProfilePage',function(req, res, done){
   let searches = {"searchterms" : []}
   User.findOne({ username : req.body.username } , function(err, doc){
     if(err) return done(err);
     if(doc){
       searches.searchterms =  doc.searches 
       return done(null,res.json(searches))
      }
     else{
      return done(null,res.json(searches))
     }
  });
 }
)*/
//Logout
//This logic seems to be handled fine by redux
/*  app.get('/api/Logout',
    function(req, res){
      res.json({"username" : '', loggedIn : false});
    });
*/
 /* app.get('/api/ProfilePage',
    function(req, res){
      console.log("In the profile page");
    });
 */

  //uses default route as default get request. (REally just loads the app for reactx router).
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'client/build/index.html')    );
  });

  app.listen(port);
} 
