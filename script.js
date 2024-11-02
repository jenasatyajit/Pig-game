'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// starting condition
let scores, currentScore, activePlayer, playing;

// starting function
const startingCondn = function () {
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
}

startingCondn();


// switching function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = (activePlayer === 0) ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// rolling dice function
btnRoll.addEventListener('click', function () {

  if (playing) {

    //1. generate a random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. display the corresponding dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. check if rolled dice is 1
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {

  if (playing) {
    //1. Add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }
    else {
      switchPlayer();
    }
  }
})

// reset to starting condition
btnNew.addEventListener('click', startingCondn)
