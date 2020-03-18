let blackjackGame={
    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','A','Q','J','K'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'A':[1,11],'Q':10,'J':10,'K':10}
};

const YOU=blackjackGame['you']
const DEALER=blackjackGame['dealer']

const hitSound= new Audio('swish.m4a');
const winSound= new Audio('cash.mp3');
const lossSound= new Audio('aww.mp3');

function randomCard(){
    let randomIndex=Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackHit(){
    let card=randomCard();
    console.log(card);
    showCard(card,YOU);
    updateScore(card,YOU);
    showScore(YOU);
}

function showCard(card,activepalyer){
    if(activepalyer['score'] <= 21){
        let cardImage=document.createElement('img');
        cardImage.src=`images/${card}.png`;
        document.querySelector(activepalyer['div']).appendChild(cardImage);
        hitSound.play();
    }
} 

function blackjackDeal(){
    let winner=computeWinner();
    showResult(winner);
    let yourImages=document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');
    for(i=0;i<yourImages.length;i++){
        yourImages[i].remove();
    }
    for(i=0;i<dealerImages.length;i++){
        dealerImages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;
    document.querySelector('#your-blackjack-result').textContent=0;
    document.querySelector('#dealer-blackjack-result').textContent=0;
    document.querySelector('#your-blackjack-result').style.color='#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color='#ffffff';

}


function updateScore(card, activepalyer){
    if(card==='A'){
        if(activepalyer['score']+blackjackGame['cardsMap'][card][1] <=211){
            activepalyer['score']+=blackjackGame['cardMap'][card][1];
        } else{
            activepalyer['score']+=blackjackGame['cardsMap'][card][0];
        }
    }else{
        activepalyer['score'] +=blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if(activePlayer['score']> 21){
        document.querySelector(activePlayer['scoreSpan']).textContentContent='BUST';
        document.querySelector(activePlayer['scoreSpan']).style.color='red';
    }
    else{ 
        document.querySelector(activePlayer['scoreSpan']).textContent= activePlayer['score'];
    }
}

function dealerLogic(){
    let card =randomCard();
    showCard(card,DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);
    showResult(computeWinner());
}

function computeWinner(){
    let winner;

    if(YOU['score'] <=21){
        if(YOU['score']>DEALER['score'] || (DEALER['score']>21)){
            console.log('You won!');
            winner=YOU;
        }
        else if(YOU['score']<DEALER['score']){
            console.log('You lost');
            winner=DEALER;
        }
        else if(YOU['score']===DEALER['score']){
            console.log('You drew');
        }
    }
    else if(YOU['score']>21 && DEALER['score']>21){
        console.log('You drew!');
    }
    console.log('The winner is ',winner); 
    return winner;
}

function showResult(winner){
    let message, messageColor;

    if(winner===YOU){
        message = 'You won!';
        messageColor='green';
        winSound.play();
    }
    else if(winner===DEALER){
        message='You lost!';
        messageColor='red';
        lossSound.play();
    }
    else{
        message='You drew!';
        messageColor='black';
    }

    document.querySelector('#blackjack-result').textContent=message;
    document.querySelector('#blackjack-result').style.color=messageColor;
}