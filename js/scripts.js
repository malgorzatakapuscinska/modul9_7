
//------------------------------------------------------------------------------------------------------------

//I.  wybieramy odpowiednie elemety i ustawiamy na nich eventy po kliknięciu

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

//----------------------------------------------------------------------------------------------------------------

// II. Deklaracja zmiennych globalnych - stan gry oraz obiekty PLAYER i COMPUTER

	// zmienna przechowująca stan gry - przyjmuje jedną z wartości: started, notstarted, ended

var gameState = 'notStarted', 
	
	// utworzenie obiektów player oraz computer

	player = {
		name: '',
		score: 0
	},
	computer = {
		score: 0
	};

//-----------------------------------------------------------------------------------------------------------------------------------

// III.DEKLARACJJE FUNKCJI I NIEZBĘDNYCH DO ICH FUNKCJONOWANIA ZMIENNYCH

//===================================================================================================================================

	//1. setGameElements
	
//===================================================================================================================================

var newGameElem = document.getElementById('js-newGameElement'),
pickElem = document.getElementById('js-playerPickElement'),
winnerInfo = document.getElementById('js-winnerInfo'),
resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements(gamestate) {
	  switch(gameState) {
	    case 'started':
	        newGameElem.style.display = 'none';
	        pickElem.style.display = 'block';
	        resultsElem.style.display = 'block';
	        winnerInfo.style.display = 'none';
	      break;
	    case 'ended':
	        newGameBtn.innerText = 'Play again';
	        winnerInfo.style.display = 'block';
	        pickElem.style.display = 'none';
	        newGameElem.style.display = 'block';
	        break;
	    case 'notStarted':
	        newGameElem.style.display = 'block';
	        pickElem.style.display = 'none';
	        resultsElem.style.display = 'none';
	        winnerInfo.style.display = 'none';
	  }
	}

setGameElements();	
//=====================================================================================================================================

	// 2.  newGAME - uruchomienie rozgrywki po kliknięciu przycisku newGame

//=====================================================================================================================================

var playerPointsElem = document.getElementById('js-playerPoints'),
playerNameElem = document.getElementById('js-playerName'),
computerPointsElem = document.getElementById('js-computerPoints'),
gameState;

function newGame() {
	//reset 
	  player.score = 0;
	  computer.score = 0;
	  playerResultElem.innerHTML = "Player selection";
      playerPickElem.innerHTML = "Player selection";
      computerPickElem.innerHTML = "Computer Selection";
      computerResultElem.innerHTML = "Computer score";
      playerResultElem.innerHTML = "Player score";
      
	  player.name = prompt('Please enter your name', 'imię gracza');
	  if (player.name!= '') {
		setGamePoints();
	    gameState = 'started';
	    setGameElements();
	    playerNameElem.innerHTML = player.name;
	  }
	}

//=======================================================================================================================================

	// 3. getComputerPick - losuje wybór komputera

//=======================================================================================================================================

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

//=======================================================================================================================================

	// 4.  playerPick - wybór gracza, spradzenie wyniku rozgrywki, uruchamiana po kliknięciu jednego z przycisków wyboru gracza

//=======================================================================================================================================

var playerPickElem = document.getElementById('js-playerPick'),
computerPickElem = document.getElementById('js-computerPick'),
playerResultElem = document.getElementById('js-playerResult'),
computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
	console.log(playerPick);
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);
    setGameEnd();
}

//========================================================================================================================================

	// 5.  checkRoundWinner - sprawdzenie wyniku rundy, przypisanie punktów

//========================================================================================================================================

function checkRoundWinner(playerPick, computerPick) {
	  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

	  var winnerIs = 'player';

	    if (playerPick == computerPick) {
	        winnerIs = 'noone'; // remis
	    } else if (
	        (computerPick == 'rock' &&  playerPick == 'scissors') ||
	        (computerPick == 'scissors' &&  playerPick == 'paper') ||
	        (computerPick == 'paper' &&  playerPick == 'rock')) {

	    	 computerResultElem.innerHTML = "Win!";
	         computer.score++;
	         setGamePoints();
	    } else {
	        playerResultElem.innerHTML = "Win!";
	        player.score++;
	        setGamePoints();
	    }
	   
	}

//==========================================================================================================================================

	// 6.  setGamePoints - wtświetlenie sumy punktów

//==========================================================================================================================================

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

//==========================================================================================================================================

	//7.  setGameEnd - zakończenie rozgrywki

//==========================================================================================================================================

function setGameEnd() {
	
	var winningScore = 10;
	var winner;
	if (player.score == winningScore){
		gameState = 'ended';
		console.log(gameState);
		winner = player.name;
		winnerInfo.innerHTML = "The Winner is: " + winner;
		setGameElements();
		//reset();
	} else if(computer.score == winningScore) {
		gameState = 'ended';
		winner = 'computer';
		console.log(gameState);
		 winnerInfo.innerHTML = "The Winner is: " + winner ;
		setGameElements();
		//reset();
	}
}

/*function reset(){
    playerResultElem.innerHTML = "Player selection";
    playerPickElem.innerHTML = "Player selection";
    computerPickElem.innerHTML = "Computer Selection";
    computerResultElem.innerHTML = "Computer score";
    playerResultElem.innerHTML = "Player score";
}*/

