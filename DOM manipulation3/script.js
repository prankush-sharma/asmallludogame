'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore = 0;
let scores = [0, 0];
let activePlayer = 0;
let playing = true;




const init = function () {
  
  // let currentScore = 0;
  // let scores = [0, 0];
  // let activePlayer = 0;
  // let playing = true;

  score0El.innerHTML = 0;
  score1El.innerHTML = 0;
  current0El.innerHTML = 0;
  current1El.innerHTML = 0;
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).innerHTML = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  // 1. Generating a random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    //   console.log(dice);
    //2.Display dice

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.Check for rolled 1
    if (dice !== 1) {
      currentScore += dice;
      //  current0El.innerHTML = currentScore;
      document.getElementById(`current--${activePlayer}`).innerHTML =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //1.Add current score t o active player's socre
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).innerHTML =
      scores[activePlayer];

    //2. Check if player's socre is >= 200
    if (scores[activePlayer] >= 20) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
