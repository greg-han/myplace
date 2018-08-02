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
constructor(props){
 super(props);
 this.state = {
   results : [],
   hits : {}
 }
}

loadQueries = () => {
 let searches = this.props.searches.join(" "); 
 return searches;
}

displayURLs = (objs) => {
 for(let i = 0; i < 10; i++){
  this.state.results.push(objs[i]._source.url)
 }
 console.log("Results",this.state.results)
}

async componentWillMount(){
 try {
  const result = await client.search({
    index : 'myplace',
    type : 'text',
    body : {
      query : {
	 "match" : {
            "transcript" : this.loadQueries()
	  }
	}
      }
  });
  const json = await result.hits.hits;
  let hits = [];
  for(let i = 0; i < 10; i++){
   hits.push(json[i]._source.url)
  }
 this.setState({ results : hits });
 } catch(error){
   console.log(error)
  }
}

 render(){ 
   return(
    <div className="container">
      <h1>Groups</h1>
      {this.state.results}
      {this.state.results.map((elem) => console.log("elem",elem))}
    </div>
   );   
 }
}

export default Groups;
