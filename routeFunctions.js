//all functions that are used server side will be placed in this file
const elasticsearch = require('elasticsearch')
var client = new elasticsearch.Client({
	host: 'localhost:9200'
});

var populateAll = async function populateAll (searches) {
    let returnTed = [];
    let returnMusic = [];
       try{
       const musicSearch = await client.search({
         index : 'music',
	 type : 'text',
	 body : {
	  query : {
	    "match" : {
	      "lyrics" : searches
	    }
	  }
	}
       });
      const musicJson = await musicSearch.hits.hits;
      for(let k = 0; k < 10; k++){
       returnMusic.push(Object.assign({},musicJson[k]))
      }
     } 
     catch (error){
      console.log(error)
     }//end catch block
   return returnMusic
}
var populateSome = async function populateSome (searches) {
      let returnTed = {'ted' : "nothing"};
      let urlArray = [];
      try {
       const result = await client.search({
         index : 'myplace',
	 type : 'text',
	 body : {
	   query : {
	      "match" : {
		 "transcript" : searches
	      }
	   }
        }
       });
       const json = await result.hits.hits;
       for(let i = 0; i < 10; i++){
	  let url = json[i]._source.url;
          let metaUrl = 'https://cors-anywhere.herokuapp.com/' + url;
	  urlArray.push(metaUrl)
       }
     }
     catch (error){
      console.log(error)
     }//end catch block
   return urlArray  
  }


module.exports.populateAll = populateAll;
module.exports.populateSome = populateSome;
