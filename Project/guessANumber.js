// HelloWorld1.js - a simple API running on Node.js and using Express
var express = require('express');					// use the express module and call it 'express'

var helloRequestsReceived = 0;						// initialize counter

var app = express();								// create a new express() server object called 'app'
app.use(express.urlencoded({extended: false}));     // allows us to parse (i.e., get information from) URLs
app.use(express.json());                            // allows us to parse (i.e., get information from) JSON

// app.use() configures the middleware server object. It is called each time a request is sent to the server.
// It contains code for general configuration of the server.
// In this case we're setting up CORS (cross-origin resource sharing). This just means content on a web page
// can come from a domain other than the domain of that page.
app.use(function(req, res, next) {
    express.urlencoded({extended: false})
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

// app.get() instructs the application what to do when an HTTP GET request is made to the API.
// In this case, the code only runs if you use the route /sayhello (i.e., http://127.0.0.1/sayhello).
// And the code just increments the counter, sends a line of output to the console, and sends a line of
// output to the browser.
app.post('/startgame', function(req,res){
	randomNumberGenerated = Math.floor(Math.random() * 100) + 1;
	console.log('Creating game number.  The number to guess is ' + randomNumberGenerated);
	responseMessage = { APIMessage: new String('Game Started') };
	res.json(responseMessage);                                                                                                                     
	});

console.log("Listening on port 8080");
app.listen(8080);									// And we're listening on port 8080
