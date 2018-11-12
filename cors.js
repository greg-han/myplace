//in case you want to run a proxy and do corsanywhere server side, this file is here
//add it to the conccurrently line in the package.json file

var host = process.env.HOST || '0.0.0.0';

var port = process.env.PORT || 9090;

var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhiteList: [],
    requireHeader: ['origin','x-requested-with'],
    removeHeaders: ['cookie','cookie2']
  }).listen(port, host, function() {
      console.log('Running CORS Anywhere on ' + host + ':' + port);
  });

