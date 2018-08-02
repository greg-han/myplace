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

loadQueries = () => {
 let searches = this.props.searches.join(" "); 
 return searches;
}

displayURLs = (objs) => {
 let addrs = [];
 for(let p in objs){
   addrs.push(p.url)
  } 
console.log("addrs",addrs);
}

loadSearch = () => {
  client.search({
    index : 'myplace',
    type : 'text',
    body : {
      query : {
	 "match" : {
            "transcript" : this.loadQueries()
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
       { false && this.props.searches.map((elem,i) =>
        <li ref={(elem) => {this.query = elem}} className="list-group-item list-group-item-action" key={i}> {elem}<span id={i} onClick={this.close} className="close">x</span></li> 
       )}
    <p></p>
   </div>
   );   
 }
}

export default Groups;
