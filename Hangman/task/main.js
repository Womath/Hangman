// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

let secretWordList = Array.of("python", "java", "swift", "javascript");
let secretWord;
let answer;
let guessedLetters;
let attempts;
let won = 0;
let lost = 0;

console.log("H A N G M A N");

while(true) {
    let mode = input("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit:");
    switch(mode.toLowerCase()) {
        case "play":
            play();
            break;
        case "results":
            console.log("You won: " + won + " times.")
            console.log("You lost: " + lost + " times.")
            break;
        case "exit":
            return;
    }
}



function play() {
    secretWord = secretWordList[Math.floor(Math.random() * secretWordList.length)];
    attempts = 8;
    answer = "-";
    guessedLetters = [];

    for (let i = 0; i < secretWord.length-1; i++) {
        answer = answer + "-";
    }

    while(attempts > 0) {
        console.log("\n" + answer);
        let letter = input("Input a letter:");

        if (letter.length !== 1) {
            console.log("Please, input a single letter.");
            continue;
        } else if (!(letter >= "a" && letter <= "z")) {
            console.log("Please, enter a lowercase letter from the English alphabet.");
            continue;
        } else if (checkGuessedLetters(letter)) {
            console.log("You've already guessed this letter.");
        } else {
            guessedLetters.push(letter);
            findLetter(letter);
        }

        if (answer === secretWord) {
            console.log("\nYou guessed the word " + answer + "!");
            console.log("You survived!");
            won++;
            return;
        } else if (attempts === 0) {
            console.log("\nYou lost!");
            lost++;
        }

    }
}

function findLetter(letter) {
    let foundLetter = false;
    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord.charAt(i) === letter) {
            answer = changeLetterInAnswer(answer, i, secretWord.charAt(i));
            foundLetter = true;
        }
    }

    if (!foundLetter) {
        console.log("That letter doesn't appear in the word.");
        attempts--;
    }
}

function checkGuessedLetters(letter) {
    let foundLetter = false;
    for (let i = 0; i < guessedLetters.length; i++) {
        if (guessedLetters[i] === letter) {
            foundLetter = true;
        }
    }

    return foundLetter;
}
function changeLetterInAnswer(string, index, char) {
    return string.substring(0, index) + char + string.substring(index + 1);
}
