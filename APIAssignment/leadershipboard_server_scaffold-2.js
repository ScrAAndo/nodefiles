//set up express - no need to change this block of code

const express = require('express');

var app = express();								// create a new express() server object called 'app'
app.use(express.urlencoded({extended: false}));
app.use(express.json());                            // allows us to parse (i.e., get information from) JSON

// app.use() configures the middleware server object. It is called each time a request is sent to the server.
// It contains code for general configuration of the server. 
// In this case we're setting up CORS (cross-origin resource sharing). This just means content on a web page
// can come from a domain other than the domain of that page.
app.use(function(req, res, next) {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // If it's a pre-flight request, respond with 200 OK
    // turns out the problem was "https" instead of "http" in a random variable
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
  });


// set defaults - leaderboard is an array for the current leaders  
// use the port number you declared in the var ipAddressAndPort in the .html program
var leaderboard = [];
var port = "8080" // need to change 

// TODO: Replace with correct HTTP verb and resource name 
app.post("/submitScore", (req, res) => {

  //set the name and score here

  // TODO: Extract name and score from the request body
  var name = req.body.name;
  var score = req.body.score;

  // add the name and score to the current array
  // and update the leadership board if necessary - no need to change
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);

  if (leaderboard.length > 3) {
    leaderboard = leaderboard.slice(0, 3);
  }

  const isTopScore = leaderboard.find(entry => entry.name === name && entry.score === score);
  const message = isTopScore
    ? "Score added to leaderboard."
    : "Score not high enough to enter the leaderboard.";

  // Send the message back to the client program with a key of API message
  // use the existing coe for Leaders - it is what will be displayed on the .html page


  res.json({
    //your code here for the message,
    APIMessage: message,
    Leaders: formatLeaderboard()
  });
});

function formatLeaderboard() {
  if (leaderboard.length === 0) return "No leaders yet.";
  return leaderboard.map((entry, index) =>
    `${index + 1}. ${entry.name} - ${entry.score}`
  ).join("\n");
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
