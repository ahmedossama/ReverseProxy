const express = require('express')
const app = express()

var proxy = require('express-http-proxy');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// app.get('/*', (req, res) =>{
//     // res.send(req.originalUrl)
    
// })

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use('/*', proxy('https://stubs.vsse.org', {
    proxyReqPathResolver: function(req) {  
      console.log(require('url').parse(req.originalUrl).path)  
      return require('url').parse(req.originalUrl).path;
    },
    userResHeaderDecorator(headers, userReq, userRes, proxyReq, proxyRes) {
        // recieves an Object of headers, returns an Object of headers.
        return headers;
      }
  }));

// // app.use('/*', proxy('http://stubs.vsse.org/api/js-init/myvodafone/login'));


app.listen(port, () => {
    console.log('Our app is running on http://localhost:' + port);
});



// var http = require('http');

// var https = require('https');

// https.createServer(function(request, response) {
// 	var proxyRequest = https.request({
// 		host: request.headers['proxy-host'],
// 		// port: 80,
// 		path: request.url,
// 		method: request.method,
// 		headers: request.headers
// 	}, function(proxyResponse) {
// 		response.writeHead(proxyResponse.statusCode, proxyResponse.headers);
// 		proxyResponse.pipe(response);
// 	});
// 	request.pipe(proxyRequest);	
// }).listen(port);


// console.log("server running: " + port)
