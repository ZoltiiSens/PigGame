'use strict';

let nickname0;
let nickname1;
let diceValue = 0;
let currentPlayer = 0;
let currentTurnScore = 0;
let score0 = 0;
let score1 = 0;
let diceElement = document.getElementById('dice');
let dicePartsElements = document.querySelectorAll('.dice_part');
let score0Element = document.getElementById('score--0');
let score1Element = document.getElementById('score--1');
let currentScore0 = document.getElementById('current_score--0');
let currentScore1 = document.getElementById('current_score--1');

function showAbout() {
	document.querySelector('.modal_about').classList.remove('hidden');
	document.querySelector('.overlay').classList.remove('hidden');
}

function hideAbout() {
	document.querySelector('.modal_about').classList.add('hidden');
	document.querySelector('.overlay').classList.add('hidden');
}

function showDice(val) {
	diceElement.classList.remove('hidden');
	for (let i = 0; i < dicePartsElements.length; i++) {
		dicePartsElements[i].classList.add('white');
	}
	switch (val) {
		case 1:
			dicePartsElements[6].classList.remove('white');
			break;
		case 2:
			dicePartsElements[1].classList.remove('white');
			dicePartsElements[4].classList.remove('white');
			break;
		case 3:
			dicePartsElements[1].classList.remove('white');
			dicePartsElements[4].classList.remove('white');
			dicePartsElements[6].classList.remove('white');
			break;
		case 4:
			dicePartsElements[0].classList.remove('white');
			dicePartsElements[1].classList.remove('white');
			dicePartsElements[4].classList.remove('white');
			dicePartsElements[5].classList.remove('white');
			break;
		case 5:
			dicePartsElements[0].classList.remove('white');
			dicePartsElements[1].classList.remove('white');
			dicePartsElements[4].classList.remove('white');
			dicePartsElements[5].classList.remove('white');
			dicePartsElements[6].classList.remove('white');
			break;
		case 6:
			dicePartsElements[0].classList.remove('white');
			dicePartsElements[1].classList.remove('white');
			dicePartsElements[2].classList.remove('white');
			dicePartsElements[3].classList.remove('white');
			dicePartsElements[4].classList.remove('white');
			dicePartsElements[5].classList.remove('white');
			break;
	}
}

function updateScore(val) {
	currentTurnScore += val;
	currentPlayer === 0
		? (score0Element.innerHTML = currentTurnScore)
		: (score1Element.innerHTML = currentTurnScore);
}

function checkWinner() {
	if (score0 >= 100) {
		document.getElementById('winner').innerHTML = nickname0;
		document.querySelector('.modal_end').classList.remove('hidden');
		document.querySelector('.overlay').classList.remove('hidden');
	} else if (score1 >= 100) {
		document.getElementById('winner').innerHTML = nickname1;
		document.querySelector('.modal_end').classList.remove('hidden');
		document.querySelector('.overlay').classList.remove('hidden');
	}
}

function rollDice() {
	diceValue = Math.trunc(Math.random() * 6 + 1);
	showDice(diceValue);
	if (diceValue === 1) {
		currentTurnScore = 0;
		hold();
	} else {
		updateScore(diceValue);
	}
	checkWinner();
}

function changePlayer() {
	document
		.querySelector(`.player--${currentPlayer}`)
		.classList.remove('active');
	if (currentPlayer === 0) {
		currentPlayer = 1;
		score1Element.textContent = 0;
	} else {
		currentPlayer = 0;
		score0Element.textContent = 0;
	}
	document.querySelector(`.player--${currentPlayer}`).classList.add('active');
}
function hold() {
	currentPlayer === 0
		? (score0 += currentTurnScore)
		: (score1 += currentTurnScore);
	currentScore0.textContent = score0;
	// score0Element.textContent = 0;
	currentScore1.textContent = score1;
	// score1Element.textContent = 0;
	currentTurnScore = 0;
	checkWinner();
	changePlayer();
}

function ModalStart() {
	nickname0 = document.getElementById('player1_nickname').value;
	nickname1 = document.getElementById('player2_nickname').value;
	console.log(nickname0);
	if (!nickname0) {
		nickname0 = 'Player 1';
	}
	if (!nickname1 || nickname0 === nickname1) {
		nickname1 = 'Player 2';
	}
	document.querySelector('.nickname--0').innerHTML = nickname0;
	document.querySelector('.nickname--1').innerHTML = nickname1;
	document.querySelector('.modal_start').classList.toggle('hidden');
	document.querySelector('.overlay').classList.toggle('hidden');
}

function restart() {
	diceValue = 0;
	currentTurnScore = 0;
	score0 = 0;
	score1 = 0;
	diceElement.classList.add('hidden');
	score0Element.innerHTML = 0;
	score1Element.innerHTML = 0;
	currentScore0.innerHTML = 0;
	currentScore1.innerHTML = 0;
	changePlayer();
	console.log('restart');
}

function restart_end() {
	restart();
	document.querySelector('.modal_end').classList.add('hidden');
	document.querySelector('.overlay').classList.add('hidden');
}

document.querySelector('.overlay').addEventListener('click', hideAbout);
document.getElementById('aboutOpen').addEventListener('click', showAbout);
document.getElementById('startGame').addEventListener('click', ModalStart);
document.getElementById('roll').addEventListener('click', rollDice);
document.getElementById('hold').addEventListener('click', hold);
document.getElementById('restart').addEventListener('click', restart);
document.getElementById('restart_end').addEventListener('click', restart_end);
