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
   results : []
 }
}

loadQueries = () => {
 let searches = this.props.searches.join(" "); 
 return searches;
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
       <ul className="list-group list-group-flush">
       {this.state.results.map((elem,i) =>
        <li className="list-group-item list-group-item-action" key={i}> <a href={elem} target='_blank'>Result</a> </li>
       )}
      </ul>
      {this.state.results.map((elem) => console.log("elem",elem))}
    </div>
   );   
 }
}

export default Groups;
