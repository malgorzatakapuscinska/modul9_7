
// wybieramy odpowiednie elemety i ustawiamy na nich eventy po kliknięciu

// 1. Przycisk Nowa Gra
var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame); //po kliknięciu uruchamia się funkcja newGame

// 2. Przyciski wyboru gracza (nożyczki, papaier lub kamień) 
var pickRock = document.getElementById('js-playerPick_rock'),
pickPaper = document.getElementById('js-playerPick_paper'),
pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() {playerPick('rock');});
pickPaper.addEventListener('click', function() {playerPick('paper'); });
pickScissors.addEventListener('click', function() {playerPick('scissors'); });

//Najpierw zainicjujmy zmienne i obiekty, których będziemy używać w grze i nadajmy im wartości początkowe.

var gameState = 'notStarted', 
	player = {
		name: '',
		score: 0
	},
	computer = {
		score: 0
	};

//ukrywanie i pokazywanie odpowiednich elementów w zalezności od stanu gry

var newGameElem = document.getElementById('js-newGameElement'),
pickElem = document.getElementById('js-playerPickElement'),
resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
	  switch(gameState) {
	    case 'started':
	        newGameElem.style.display = 'none';
	        pickElem.style.display = 'block';
	        resultsElem.style.display = 'block';
	      break;
	    case 'ended':
	        newGameBtn.innerText = 'Jeszcze raz';
	    case 'notStarted':
	    default:
	        newGameElem.style.display = 'block';
	        pickElem.style.display = 'none';
	        resultsElem.style.display = 'none';
	  }
	}

setGameElements();

// deklaracja funkcji newGame - uruchamiającej rozgrywkę

var playerPointsElem = document.getElementById('js-playerPoints'),
playerNameElem = document.getElementById('js-playerName'),
computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
	  player.name = prompt('Please enter your name', 'imię gracza');
	  if (player.name) {
	    player.score = computer.score = 0;
	    gameState = 'started';
	    setGameElements();

	    playerNameElem.innerHTML = player.name;
	   
	  }

	}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
computerPickElem = document.getElementById('js-computerPick'),
playerResultElem = document.getElementById('js-playerResult'),
computerResultElem = document.getElementById('js-computerResult');

//funkcja playerpick - przyjmuje paramertr przekazujacy do niej wybór gracza - w zależności od tego , ktory przycisk został przez niego kliknięty
//funkcja wyświetlająca wybory komputera i gracza 
function playerPick(playerPick) {
	console.log(playerPick);
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);

}

//spradzenie wyniku rozgrywki
function checkRoundWinner(playerPick, computerPick) {
	  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

	  var winnerIs = 'player';

	    if (playerPick == computerPick) {
	        winnerIs = 'noone'; // remis
	    } else if (
	        (computerPick == 'rock' &&  playerPick == 'scissors') ||
	        (computerPick == 'scissors' &&  playerPick == 'paper') ||
	        (computerPick == 'paper' &&  playerPick == 'rock')) {

	        winnerIs = 'computer';
	    }

	    if (winnerIs == 'player') {
	        playerResultElem.innerHTML = "Win!";
	        player.score++;
	        console.log('player score is ' + player.score);
	    } else if (winnerIs == 'computer') {
	        computerResultElem.innerHTML = "Win!";
	        computer.score++;
	        console.log('computer score is ' + computer.score);
	    }
	    setGamePoints(); 
	}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}
