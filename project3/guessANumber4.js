var express = require('express');

var app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

var randomNumber = {}; 

app.use(function(req, res, next) {
    express.urlencoded({extended: false})
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
  });



app.post('/startgame', function(req,res){
    randomNumberGenerated = Math.floor(Math.random() * 100) + 2;
    randomNumber[req.body.gameId]= randomNumberGenerated;
    console.log('Game number ' + req.body.gameId + ' has started. The number to guess is ' + randomNumberGenerated)
    responseMessage = {APIMessage: "Game number " + req.body.gameId + " has started. Good luck!"};
    res.json(responseMessage);
});

app.get('/guessMade', function(req, res) {
    const gameId = req.query.gameId;
    const numberToGuess = randomNumber[gameId]; // Fetch from the map
    const numberGuessed = parseInt(req.query.userGuess);
    
    // Determine the result locally within this function

    let outMessage = "The guess of " + numberGuessed;
    let isGuessed = false;

    if (numberGuessed == numberToGuess) {
        isGuessed = true;
        outMessage += " is correct - congratulations!";
    } else if (numberGuessed < numberToGuess) {
        outMessage += " is too low!";
    } else {
        outMessage += " is too high!";
    }

    res.json({ APIMessage: outMessage, guessed: isGuessed });
});

app.post('/resetgame', function(req, res) {
    const gameId = req.body.gameId;
    if (randomNumber[gameId]) {
        delete randomNumber[gameId];
        console.log('Game has been reset.');
        res.json({ APIMessage: "Game reset successfully." });
    } else {
        res.status(404).json({ APIMessage: "Game not found." });
    }
});

console.log("Listening on port 8080");
app.listen(8080);