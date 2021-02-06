// Challenge 1: Your Age in Days

function ageInDays() {
    var birthYear = prompt('What year were you born in... Good friend?');
    var numDays = (2018 - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + numDays + ' days old.');
    h1.setAttribute('id', 'numDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);

}

function reset() {
    document.getElementById('numDays').remove();
}

//Challenge 2: Cat Generator

function generateCat() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}
// ================================== //
// Challenge 3: Rock, Paper, Scissors //
// ================================== //

// database for images of each option
var imagesDatabase = {
    'rock': document.getElementById('rock').src,
    'paper': document.getElementById('paper').src,
    'scissors': document.getElementById('scissors').src
}

var idDatabase = {
    'rock': 'rock',
    'paper': 'paper',
    'scissors': 'scissors',
}

// start of the game, passing in user's initial choice
function rpsGame(yourChoice) {
    
    //initializing the two sides of the game
    var humanChoice, botChoice;

    //declaring human's choice to user selected picture id
    humanChoice = yourChoice.id;
    
    // declare bot's choice to a random option, calling two functions
    botChoice = numberToChoice(randToRpsInt());
    
    // returns an array of two numbers, to depict results
    results = decideWinner(humanChoice, botChoice); // [0, 1] human lost, bot won 
    
    // assigns message depending on results of game
    message = finalMessage(results); // {'message': 'You won!', 'color': 'green'}
    
    // visual representation of the game after user clicks option
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

// function to randomly select an number from 0 to 2, inclusive
function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

// assigns a option (rock, paper, scissor), based on a number 0 - 2
function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}

// returns an array that determines winning result to display
function decideWinner(yourChoice, computerChoice) {

    //database of results of the rock-paper-scissors game
    var rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0},
    }

    // determine numberic value for both sides
    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

// function to return dictionary containing final result
function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return {'message': 'You lost!', 'color': 'red'};
    } else if (yourScore === 0.5) {
        return {'message': 'You tied!', 'color': 'yellow'};
    } else {
        return {'message': 'You won!', 'color': 'green'};
    }
}

// function that handles visual of game
function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    
    // remove images from visual
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    // create divs to import into frontend
    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    // Give each new div an id; used later in restartRPS() function
    humanDiv.id = "h1";
    messageDiv.id = "m1";
    botDiv.id = "b1";

    // HTML for the human div, message div, and bot div
    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>";
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";

    //add the three divs into the div with id 'flex-box-rps-div'
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
    
}

function restartRPS() {

    // Remove post-game elements from div
    document.getElementById('h1').remove();
    document.getElementById('m1').remove();
    document.getElementById('b1').remove();

    // Creating images for each option: rock, paper, and scissors
    var rockPic = document.createElement("img");
    var paperPic = document.createElement("img");
    var scissorsPic = document.createElement("img");

    // Setting attributes for rock picture 
    rockPic.setAttribute("src", imagesDatabase['rock']);
    rockPic.setAttribute("id", "rock")
    rockPic.setAttribute("height", "150");
    rockPic.setAttribute("width", "150");
    rockPic.setAttribute("onclick", "rpsGame(this)");

    // Setting attributes for paper picture 
    paperPic.setAttribute("src", imagesDatabase['paper']);
    paperPic.setAttribute("id", "paper")
    paperPic.setAttribute("height", "150");
    paperPic.setAttribute("width", "150");
    paperPic.setAttribute("onclick", "rpsGame(this)");

    // Setting attributes for scissors picture 
    scissorsPic.setAttribute("src", imagesDatabase['scissors']);
    scissorsPic.setAttribute("id", "scissors")
    scissorsPic.setAttribute("height", "150");
    scissorsPic.setAttribute("width", "150");
    scissorsPic.setAttribute("onclick", "rpsGame(this)");

    // Adding image elements to div
    document.getElementById("flex-box-rps-div").appendChild(rockPic);
    document.getElementById("flex-box-rps-div").appendChild(paperPic);
    document.getElementById("flex-box-rps-div").appendChild(scissorsPic);

}

// Challnege 5: Blackjack
let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3')

//if somebody hits something with it 'blackjack-hit-button', listen for click event and run blackjackHit function
// replaces the onChange/onClick functionality in the html portion
document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    } 
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `images/${card}.png`;
        //appending above image to the YOU['div'], which is #your-box
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }  
}

function blackjackDeal() {

    if (blackjackGame['turnsOver'] === true) {

        blackjackGame['isStand'] = false;

        //list of all images inside #your-box id
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        
        for(let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }

        for(let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        // Resetting scores internally
        YOU['score'] = 0;
        DEALER['score'] = 0;

        // Visually sets the score back to 0
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        // Visually sets the score text to white, in case it changed to red (due to bust)
        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

        // Visually change message above playing field back to 'let's play' and black
        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnsOver'] = true;
    } 
}

function updateScore(card, activePlayer) {
    if (card === 'A') {
       // If adding 11 keeps me below 21, add 11. Otherwise, add 1
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }

    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
    
    
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        // Change text to 'BUST', being the score over 21
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        // Change color of score text to red
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        // Changes the score of the active player when new card is hit
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
    
}

// Used to display bot cards with time between each card reveal
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER)
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    
    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}

// Compute winner and return who just won
// Update the wins, draws, and losses
function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        // condition: higher score than dealer or when dealer busts but you're 21 or under
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackjackGame['wins']++;
            winner = YOU;

        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;

        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }
    
    // condition when user busts but dealer doesn't 
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;

    // condition when you AND the dealer busts    
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }

    console.log(blackjackGame);
    return winner;
}

function showResult(winner) {
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true) {
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winSound.play();
    
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            lossSound.play();
    
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messageColor = 'black';
        }
    
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}




