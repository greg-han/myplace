import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../node_modules/jquery/dist/jquery.min.js';

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
	host: 'localhost:9200',
});
/*var client = new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'trace'
});
*/
var metadata = require('metafetch');
const urlMetadata = require('url-metadata')

const thumbnail = {
	display: 'block',
	padding: '4px',
	marginBottom : '20px',
	lineHeight : '1.42857143',
	backgroundColor : '#fff',
	border: '1px solid #ddd',
	borderRadius : '4px',
	transition : 'border .2x ease-in-out',
} 

const thumbimage = {
  maxHeight: '100%',
  maxWidth: '100%'
}

class Groups extends Component {
constructor(props){
 super(props);
 this.state = {
   results : [],
   tedArr : [],
   MusicMeta : []
 }
 this.loadMeta = this.loadMeta.bind(this);
 this.populateAll = this.populateAll.bind(this);
 this.populateAll();
}


async loadMeta(url) {
  let metaUrl = 'http://localhost:9090/' + url;
  let meta = urlMetadata(metaUrl).then(
    function(metadata){
      console.log("MetaData",metadata)
      return metadata;
   },
   function (error) {
     console.log(error)	
   })
  return meta;
}

loadQueries = () => {
 let searches = this.props.searches.join(" "); 
 return searches;
}

updateTedState = (tedObj) => {
 this.setState({ tedArr : [...this.state.tedArr,tedObj]})
 console.log("tedArr",this.state.tedArr)
}

updateMusicState = (musicObj) => {
 this.setState({ MusicMeta : [...musicObj]})
}

async populateAll(){
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
  let tedPromiseArray = [];
  let tedMetaArray = [];
  for(let i = 0; i < 10; i++){
   hits.push(json[i]._source.url)
   tedPromiseArray = await [...tedPromiseArray,this.loadMeta(json[i]._source.url)]
  }
 this.setState({ results : hits });
 for(let j = 0; j < 10; j++){
  tedPromiseArray[j].then(function(obj){
    tedMetaArray.push(obj)
    this.updateTedState(obj)    
  }.bind(this))
 }

 //Music Meta
 const Musicresult = await client.search({
   index : 'music',
   type : 'text',
   body : {
    query : {
      "match" : {
	 "lyrics" : this.loadQueries()
      }
    }
  }
 });

const musicjson = await Musicresult.hits.hits;
let musichits = [];
for(let i = 0; i < 10; i++){
 console.log("MusicJSON", musicjson[i])
 musichits.push(musicjson[i])
}
 this.updateMusicState(musichits) 
 } catch(error){
   console.log(error)
  }

}

 render(){ 
   return(
    <div className="container">
      <h1>Groups</h1>
      {this.getPreviews}
      <div className="container-fluid">
        <h3> TED </h3>
      <div className="row flex-row flex-nowrap">
      {this.state.tedArr.map((elem,i) =>
	<div className="col-sm-4 col-md-3" >
	       <a href={elem.canonical} style={thumbnail} target="_blank" className="thumbnail">
	    <figure>
	    <b>TED-Talks</b>
		 <img style={thumbimage} src={elem.image} />
            <figcaption><strong>{elem.title}</strong></figcaption>
	</figure>
	       </a>
        </div>
      )}
      </div>
      </div>

     <div className="container-fluid">
       <h3> MUSIC </h3>
      <div className="row flex-row flex-nowrap">
      {this.state.MusicMeta.map((elem,i) =>
	<div className="col-sm-4 col-md-3" >
<a href={"http://www.google.com/search?q=" + elem._source.artist.replace(/-/g,' ') + " " + elem._source.song.replace(/-/g,' ')} style={thumbnail} target="_blank" className="thumbnail">
	<figure>
	<b>MUSIC SUGGESTION</b>
            <figcaption><strong style={{'fontSize' : '13px'}} >ARTIST: <br />{elem._source.artist.replace(/-/g," ")}</strong></figcaption>
            <figcaption><strong style={{'fontSize' : '13px'}}>SONG: <br / >{elem._source.song.replace(/-/g," ")}</strong></figcaption>
	</figure>
	       </a>
        </div>
      )}
      </div>
     </div>
   </div>
   );   
 }
}

export default Groups;
