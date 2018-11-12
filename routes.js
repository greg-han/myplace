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

const elasticsearch = require('elasticsearch');
let client = new elasticsearch.Client({
	host: 'localhost:9200'
});
const urlMetadata = require('url-metadata')

let routeFunctions = require('./routeFunctions')
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
//console.log("doc",doc);
app.post('/api/LoginPage', function(req, res, done){
    let logged = {"username" : '', loggedIn : false }
    User.findOne({ username : req.body.username }, function(err, doc){
	if(err) return done(err);
	if(doc && doc.password == req.body.password){
	  logged.loggedIn = true;
	  logged.username = req.body.username
          return done(null,res.json(logged))
	} 
	else{
	   logged.loggedIn = false;
           return done(null,res.json(logged));
       }
   });
 });

//This handles all searches done on the search page
app.post('/api/SearchPage', function(req, res, done){
 if(!req.body.groups && req.body.search){
   User.findOneAndUpdate({ username : req.body.username },{ $addToSet: { searches : req.body.search.toLowerCase()}} , function(err, doc){
     if(err) return done(err);
     if(doc){
       return done(null,res.json(doc))
      }
     else{
      return done(null,res.json(doc))
     }
  });
 }
 if(!req.body.search && req.body.groups){
   User.findOneAndUpdate({ username : req.body.username },{ $addToSet: { groups : req.body.groups} } , function(err, doc){
     if(err) return done(err);
     if(doc){
       return done(null,res.json(doc))
      }
     else{
      return done(null,res.json(doc))
     }
  });
  }
 });

//Receives all of your searches (and soon your groups) on the page
app.post('/api/ProfilePage',function(req, res, done){
   User.findOne({ username : req.body.username } , function(err, doc){
     if(err) return done(err);
     if(doc){
       return done(null,res.json({ 'searches' : doc.searches, 'groups' : doc.groups}))
      }
     else{
      return done(null,res.json([]))
     }
  }); 
 })


app.post('/api/Groups', async function(req, res, done){
  let tedResult = [];
  let musicResult = [];
  if(req.body.music){
  let music = await routeFunctions.populateAll(req.body.searches) 
  .then(function(data){
    data.forEach(function(element){
     musicResult.push(Object.assign({},element))
    })
  })
  }
  if(req.body.ted){
  let ted = await routeFunctions.populateSome(req.body.searches)
  .then(function(data){
     tedResult = [...data]
  })
  }
  return done(null,res,res.json({'music' : musicResult, 'ted' : tedResult})) 
})
 


app.post('/api/ProfilePage/:word/:username',  function(req, res, done){
   let word = req.params.word 
   let user = req.params.username
   if(req.body.search){
     User.update({ username : user }, { '$pull' : { "searches" : word }}, function(err,doc){
       if(err) return done(err);
       if(doc){
         return done(null,res.json(doc))
       }
       else{
         return done(null,res.json(doc))
   }
   if(req.body.group){
     User.update({ username : user }, { '$pull' : { "groups" : word }}, function(err,doc){
       if(err) return done(err);
       if(doc){
         return done(null,res.json(doc))
       }
       else{
         return done(null,res.json(doc))
       }
    })
   }
   }
   )
  }
})

//uses default route as default get request. (REally just loads the app for reactx router).
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'client/build/index.html')    );
  });

  app.listen(port);
} 
