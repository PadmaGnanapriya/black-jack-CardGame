let blackjackGame={
    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
};

const YOU=blackjackGame['you']
const DEALER=blackjackGame['dealer']

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);

function blackjackHit(){
    let cardImage=document.createElement('img');
    cardImage.src='Q.png';
    document.querySelector(YOU['div']).appendChild(cardImage);
    alert('Ouch, you just clicked me!');
}