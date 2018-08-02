import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../node_modules/jquery/dist/jquery.min.js';
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'trace'
});

class Groups extends Component {
loadSearch = () => {
  client.search({
    index : 'myplace',
    type : 'text',
    body : {
      query : {
	match : {
	  body : 'ted'
	}
      }
    }
  })
  .then(function (res) {
     var hits = res.hits.hits;
     console.log("HITS",hits)
  }, function(err){
       console.trace(err.message);
});
}
componentDidMount(){
  this.loadSearch();
}
 render(){ 
   return(
    <div className="container">
    <h1>Groups</h1>
    <p></p>
   </div>
   );   
 }
}

export default Groups;
