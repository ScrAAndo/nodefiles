//Grade Forecaster
//This program forecasts the final grade of a student based on their current grade and multiple hypothetical final exam scores.


var readlineSync = require('readline-sync');

var currentAverageGrade = readlineSync.question("What is your current average grade in class? ");
var finalExamScores = [];
var numFinalExams = readlineSync.question("How many hypothetical final exam scores would you like to enter? ");
for (var i = 0; i < numFinalExams; i++) {
    var finalExamScore = readlineSync.question("What is the score for final exam " + (i + 1) + "? ");
    finalExamScores.push(parseFloat(finalExamScore));
}

function calculateFinalGrade(currentAverage, finalExamScore) {
    // Assuming the final exam is worth 25% of the final grade 
    var finalGrade = (currentAverage * 0.75) + (finalExamScore * 0.25);
    if (finalGrade > 100) {
        finalGrade = 100; // Cap the final grade at 100%
    }
    else if (finalGrade < 0) {
        finalGrade = 0; // Ensure the final grade does not go below 0%
    }
    return finalGrade;
}


function letterGrade(grade) {
    if (grade >= 90) {
        return "A";
    } else if (grade >= 80) {
        return "B";
    } else if (grade >= 70) {
        return "C";
    } else if (grade >= 60) {
        return "D";
    } else {
        return "F";
    }
}

function deltaGrade(currentAverage, finalExamScore) {
    var finalGrade = calculateFinalGrade(currentAverage, finalExamScore);
    var delta = finalGrade - currentAverage;
    if (delta > 0) {
        return "your grade INCREASED " + delta.toFixed(2) + "%";
    } else if (delta < 0) {
        return "your grade DECREASED " + Math.abs(delta).toFixed(2) + "%";
    } else {
        return "0%";
    }   
}   

console.log("\nBased on your current average grade of " + currentAverageGrade + "%, here are your forecasted final grades:\n");
for (var j = 0; j < finalExamScores.length; j++) {
    var forecastedGrade = calculateFinalGrade(parseFloat(currentAverageGrade), finalExamScores[j]);
    var letter = letterGrade(forecastedGrade);
    var delta = deltaGrade(parseFloat(currentAverageGrade), finalExamScores[j]);
    console.log("If you score " + finalExamScores[j] + "% on the final exam, \nFinal grade: " + forecastedGrade.toFixed(2) + "% (" + letter + ").\nThe change from your current average: " + delta + "%.\n");
}

