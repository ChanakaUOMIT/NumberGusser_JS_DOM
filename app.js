/*
Game Function
    -min and max
    -certain amount of guesses
    -notify remaining guesses
    -notify correct answer if loose
    -play again
*/

//Game Values
let min=1,
    max=10,
    //winningNum=2,
    winningNum=getRandomNumber(min, max),
    guessesLeft=3;

console.log(winningNum);

//UI Elements

const game=document.querySelector('#game'),
        minNum=document.querySelector('.min-num'),
        maxNum=document.querySelector('.max-num'),
        guessBtn=document.querySelector('#guess-btn'),
        guessInput=document.querySelector('#guess-input'),
        message=document.querySelector('.message');

//Assign UI min and max
minNum.textContent=min;
maxNum.textContent=max;

//Play Again event listener
game.addEventListener('mousedown', function(e){
    console.log(1);
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
}); 

//Listen for Guess
guessBtn.addEventListener('click', function(){
    //console.log(guessInput.value);
    let guess =parseInt(guessInput.value);
    console.log(guess);

    //Validate 
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please Enter a Number between ${min} and ${max}`, 'red');
    }

    //Check if Won
    if(guess === winningNum){
        //Game over - WIN

        gameOver(true, `${winningNum} is Correct !, YOU WIN..!`);

        // //Disable input
        // guessInput.disabled=true;
        // // Change border color
        // guessInput.style.borderColor='green';
        // //Set Message
        // setMessage(`${winningNum} is Correct !, YOU WIN..!`, 'green');

    }else{
        //Wrong Number
        guessesLeft-=1;

        if(guessesLeft === 0){
            //Game Over - loss
            gameOver(false, `Game Over You LOST. The Correct number was ${winningNum}`);

            // //Disable input
            // guessInput.disabled=true;
            // // Change border color
            // guessInput.style.borderColor='red';
            // //Set Message
            // setMessage(`Game Over You LOST. The Correct number was ${winningNum}`, 'red');

        }else{
            //Game Continues - answer Wrong

            //Change border color
            guessInput.style.borderColor='red';

            //clear Input
            guessInput.value='';

            //Tell user its the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
        }

    }
});

//Game Over
function gameOver(won, msg){

    let color;
    won === true ? color='green' : color='red';

    //Disable input
    guessInput.disabled=true;
    // Change border color
    guessInput.style.borderColor=color;
    //Set Message
    setMessage(msg, color);

    //Play Again?
    guessBtn.value='Play Again';
    guessBtn.className+='play-again';
}

function getRandomNumber(min, max){
    console.log('random : '+Math.floor(Math.random()*(max-min+1)+min));

    return (Math.floor(Math.random()*(max-min+1)+min));

}

//Set Message
function setMessage(msg, color){
    message.style.color=color;
    message.textContent=msg;
}