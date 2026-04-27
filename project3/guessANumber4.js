var express = require('express');

var app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

var randomNumber = {};
var games = {}; 

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
    randomNumberGenerated = Math.floor(Math.random() * 100) + 1;
    randomNumber[req.body.gameId]= randomNumberGenerated;

    games[req.body.gameId] = {
        target: randomNumberGenerated,
        count: 0
    };

    console.log('Game number ' + req.body.gameId + ' has started. The number to guess is ' + randomNumberGenerated)
    responseMessage = {APIMessage: "Game number " + req.body.gameId + " has started. You have 5 guesses. Good luck!"};
    res.json(responseMessage);
});

app.get('/guessMade', function(req, res) {
    const gameId = req.query.gameId;
    const numberToGuess = randomNumber[gameId]; // Fetch from the map
    const numberGuessed = parseInt(req.query.userGuess);
    const game = games[gameId];
    
    game.count++;
    const remainingGuesses = 5 - game.count;
    // Prefix message
    let statusPrefix = "Guess #" + game.count + "\n You have " + remainingGuesses + " guesses left. \n";
    let outMessage = "";
    let isGuessed = false;
    let gameOver = false;
    // Determine the result locally within this function

    if (numberGuessed === numberToGuess) {
        isGuessed = true;
        gameOver = true;
        outMessage = statusPrefix + "The guess of " + numberGuessed + " is correct - congratulations!";
    } else if (game.count >= 5) {
        gameOver = true;
        outMessage = statusPrefix + "The guess of " + numberGuessed + " is wrong! You ran out of guesses. The number was " + numberToGuess;
    } else if (numberGuessed < numberToGuess) {
        outMessage = statusPrefix + "The guess of " + numberGuessed + " is too low!";
    } else {
        outMessage = "The guess of " + numberGuessed + " is too high!";
    }


    res.json({ 
        APIMessage: outMessage, 
        guessed: isGuessed,
        gameOver: gameOver,
        remaining: remainingGuesses});
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