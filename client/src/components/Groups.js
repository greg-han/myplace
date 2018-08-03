import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../node_modules/jquery/dist/jquery.min.js';

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'trace'
});

var metadata = require('metafetch');

class Groups extends Component {
constructor(props){
 super(props);
 this.state = {
   results : [],
   meta : []
 }
 this.loadMeta = this.loadMeta.bind(this);
}


async loadMeta(url) {
  let metaUrl = 'https://api.urlmeta.org/?url=' + url;
  const meta = await fetch(metaUrl)
  return meta.json();
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
  let metArray = [];
  for(let i = 0; i < 10; i++){
   hits.push(json[i]._source.url)
   metArray = await [...metArray,this.loadMeta(json[i]._source.url)]
  }
 this.setState({ results : hits });
 for(let j = 0; j < 10; j++){
  metArray[j].then(function(obj){
    this.setState({ meta : [...this.state.meta,obj]})
  }.bind(this))
 }
 } catch(error){
   console.log(error)
  }
}

 render(){ 
   return(
    <div className="container">
      <h1>Groups</h1>
      {this.getPreviews}
      {console.log(this.state.meta)}
      {this.state.meta.map((elem,i) =>
	<div className="col-sm-4 col-md-3">
	    <figure>
	       <a href={elem.meta.url} target="_blank" className="thumbnail">
	         <b>TED-Talks</b>
		 <img src={elem.meta.image} />
            <figcaption><strong>{elem.meta.title}</strong></figcaption>
	       </a>
	</figure>
        </div>
      )}
    </div>
   );   
 }
}

export default Groups;
