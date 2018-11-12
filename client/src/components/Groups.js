import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../node_modules/jquery/dist/jquery.min.js';

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

const urlMetadata = require('url-metadata')

class Groups extends Component {
constructor(props){
 super(props);
 this.state = {
   tedUrls : [],
   tedArr : [],
   musicArr : [],
   ted : false,
   music : false
 }
 this.populateAll = this.populateAll.bind(this);
 this.updateTedState = this.updateTedState.bind(this);
 this.checkChoices();
 this.populateAll()
}

checkChoices = () => {       
 if(this.props.groups.indexOf('ted') !== -1 ){
  this.state.ted = true;
 }
 if(this.props.groups.indexOf('music') !== -1 ){
  this.state.music = true; 
 }
}

loadQueries = () => {
 let searches = this.props.searches.join(" "); 
 return searches;
}

loadResults = (tedStuff,musicStuff) => {
  this.updateTedState(tedStuff);   
  this.updateMusicState(musicStuff);
}

loadMeta = (url) => {
  let meta = urlMetadata(url).then(
    function(metadata){
     //console.log("Can I have one", metadata)
     return metadata;
   },
  function (error){
   console.log(error)
  })
  return meta;
}

async updateTedState(tedObj){
 let tedMetaArray  = [];
 let tedPromiseArray = [];
 await this.setState({ tedUrls : [...tedObj.ted]})
//had to use ugly for loops (instead of foreach) to keep async/await in scope
 for(let m = 0; m < 10; m++){
   tedPromiseArray = await [...tedPromiseArray, this.loadMeta(this.state.tedUrls[m])] 
 }
 for(let j = 0; j < 10; j++){
  await tedPromiseArray[j].then(function(obj){
   this.setState({ tedArr : [...this.state.tedArr,obj]}) 
 }.bind(this))
 }
}

updateMusicState = (musicObj) => { 
 this.setState({ musicArr : [...musicObj.music]})
}

async populateAll(){
 let searchTerms = this.loadQueries();  
 if(this.props.loggedIn){
   fetch('/api/Groups', {
     headers : {
       "Accept" : "application/json",
       "Content-Type" : "application/json"
     },
     method : 'POST',
     body : JSON.stringify({
       searches : searchTerms,
       ted : this.state.ted,
       music : this.state.music
     }) 
    })
    .then(function(value){
       return value.json()}) 
    .then(function(data){
       this.loadResults(data,data)
     }.bind(this))
   }
 }

 render(){ 
   return(
    <div className="container">
      <h1>Groups</h1>
      {this.getPreviews}
      <div className="container-fluid">
        <h3> TED </h3>
        <div className="row flex-row flex-nowrap" style={{overflow : 'auto'}}>
        {this.state.tedArr.map((elem,i) =>
    	  <div className="col-sm-4 col-md-3" >
	  <a href={elem.canonical} style={thumbnail} target="_blank" className="thumbnail">
	    <figure>
	      <b>TED Talks</b>
	      <img style={thumbimage} src={elem.image} />
              <figcaption><strong>{elem.title}</strong></figcaption>
	    </figure>
	  </a>
          </div>
      )}
      </div>
      </div>
     <br />
     <div className="container-fluid">
       <h3> MUSIC </h3>
      <div className="row flex-row flex-nowrap" style={{overflow : 'auto'}}>
      {this.state.musicArr.map((elem,i) =>
	<div className="col-sm-4 col-md-3" id={i} >
        <a href={"http://www.google.com/search?q=" + elem._source.artist.replace(/-/g,' ') + " " + elem._source.song.replace(/-/g,' ')} style={thumbnail} target="_blank" className="thumbnail">
	  <figure>
	    <b>Music Suggestions</b>
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
