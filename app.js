/*
GAME RULES:

- The game has 2 players, playing in rounds.
- In each turn, a player rolls the dices as many times as he whishes. Each result get added to his ROUND score.
- BUT, if the player rolls a 1 in either, all his ROUND score gets lost. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn.
- The first player to reach 100 points on GLOBAL score wins the game.
- Note, you can change the final score as you wish between ( 1 - 100 ).

*/


var scores, roundScore, activePlayer, gamePlaying

startGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
   
    if(gamePlaying) {
        
        // 1. generate random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        
        // 2. display the image of the random number on the screen
        document.querySelector('#dice-1').style.display = 'block';
        document.querySelector('#dice-2').style.display = 'block';
        
        document.querySelector('#dice-1').src = 'dice-' + dice + '.png';
        document.querySelector('#dice-2').src = 'dice-' + dice2 + '.png';
        
        // 3. update the round score IF the rounded number was NOT a 1
        if(dice !== 1 && dice2 !== 1)
        {   
            roundScore += (dice+dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else 
        {
            alert('!! Get 1 , delete the round score , and go to next player.');
            nextPlayer();
        }
    }
    
});


document.querySelector('.btn-hold').addEventListener('click', function(){
   if(gamePlaying) {
       
       // 1. add current score to global score.
       scores[activePlayer] += roundScore;    
      
       // 2. update the UI 
       document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]; 
    
       // 3. check if the player won.
       var finalScore = 100;
       var input = parseInt(document.getElementById('final-score').value);
       if(input > 0 && input < 100)
           finalScore = input;
       
       
       if(scores[activePlayer] >= finalScore)
       {
           gamePlaying = false;
       
           document.querySelector('#name-' + activePlayer).textContent = 'Winner !'; 
       
           document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
           document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
       
       
           document.querySelector('#dice-1').style.display = 'none';
           document.querySelector('#dice-2').style.display = 'none';    
           
        }
        else
        {
            nextPlayer();
        }
    }
    
});


document.querySelector('.btn-new').addEventListener('click', function(){
    
    
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
    document.querySelector('#name-' + activePlayer).textContent = 'Player ' + (activePlayer + 1);
   
    document.querySelector('.player-' + 0 + '-panel').classList.remove('active');
    document.querySelector('.player-' + 1 + '-panel').classList.remove('active');
    
    // always the first player will be the player-0
    document.querySelector('.player-' + 0 + '-panel').classList.add('active');
    
     startGame();
});


function nextPlayer() {
    
      roundScore = 0;
    
      document.querySelector('#current-' + activePlayer).textContent = '0';
        
      document.querySelector('.player-0-panel').classList.toggle('active');
      document.querySelector('.player-1-panel').classList.toggle('active');
          
      activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
      document.querySelector('#dice-1').style.display = 'none';
      document.querySelector('#dice-2').style.display = 'none';    
}




function startGame() {
    
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    
    gamePlaying = true;
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
    
}


document.getElementById('game-rules').addEventListener('click', function() {
    
    var messg = 'Game Rules : \n\n - The game has 2 players, playing in rounds. \n\n - In each turn, a player rolls the dices as many times as he whishes. Each result get added to his ROUND score. \n\n - BUT, if the player rolls a 1 in either, all his ROUND score gets lost. After that, it\'s the next player\'s turn. \n\n - The player can choose to \'Hold\', which means that his ROUND score gets added to his GLBAL score. After that, it\'s the next player\'s turn. \n\n - The first player to reach 100 points on GLOBAL score wins the game. \n\n - Note, you can change the final score as you wish between ( 1 - 100 ).';    
    alert(messg);
});
