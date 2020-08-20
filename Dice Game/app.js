/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousDice;

init();


//dice = Math.floor(Math.random() * 6) + 1;

//for replacing text content in js
//document.querySelector('#current-' + activePlayer).textContent = dice;

//replacing the content to 0 using id selector which is fast in selecting id's
//document.getElementById('score-0').textContent = '0'; init()
//document.getElementById('current-0').textContent = '0';init()
//document.getElementById('score-1').textContent = '0';init()
//document.getElementById('current-1').textContent = '0';init()

//for html adding in js
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+ dice + '<em>';

//store the content in variable
//var x = document.querySelector('#score-0').textContent;
//console.log(x);

//display of dail will be none before rolling
document.querySelector('.dice').style.display = 'none';

//here we can access global scope like scores roundscore active player
//but what we declare inside the function in event listener cannot be accessed from outside due to scope chain
document.querySelector('.btn-roll').addEventListener('click', function () {

if(gamePlaying){

// 1. Random number

var dice = Math.floor(Math.random() * 6) + 1;

//2. Display the result
// selected the image src and dynamically changing the number so appropriate png files replaces the image
var diceDOM = document.querySelector('.dice');
diceDOM.style.display = 'block';
diceDOM.src = 'dice-' + dice + '.png';

//3. Update the round score IF the rolled number was NOT a 1
if (dice !== 1) {
  //Add Score
  roundScore += dice;  
  document.getElementById('current-' + activePlayer).textContent = roundScore;
  

} else {
  //Next Player
  nextPlayer();
}
}
});

    
  

document.querySelector('.btn-hold').addEventListener('click', function () {
    if(gamePlaying){
 // Add Current score to global score
 scores[activePlayer] += roundScore;

 // update the UI
 document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

 // Check if player won the game
 if (scores[activePlayer] > 20) {
   document.querySelector('#name-' + activePlayer).textContent = 'Winner';
   document.querySelector('.dice').style.display = 'none';

   //As there is no winner class we are adding it and also we defined css property to it
   document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

   //As active class is alredy present we just use remove
   document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
   //Because buttons won't work after we have winner
   gamePlaying= false;
 } 
 else {
   //Next Player
   nextPlayer();
 }
}
});


    
 
//Before defining the function we can use it as it will be loaded before the execution of the code in JS
function nextPlayer() {
  //Next Player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // Add the class if it is not there and remove its there (use of toggle)
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.dice').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);

//when you start a new game
function init() {

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    previousDice =[0 ,0];
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player-1';
    document.getElementById('name-1').textContent = 'Player-2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
   
}