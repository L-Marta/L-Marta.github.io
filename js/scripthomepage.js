const track = document.querySelector('.carousel__track');
const cards = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);
const cardWidth = cards[0].getBoundingClientRect().width;
// Arrange the cards next to one another
const setCardPosition = (card, index) => {
  card.style.left = cardWidth * index + 'px';  
}
cards.forEach(setCardPosition);

// Move card
const moveToCard = (currentCard, targetCard, targetDot, targetIndex) => {
  const currentDot = dotsNav.querySelector('.current-card');
  track.style.transform = 'translateX(-'+ targetCard.style.left + ')';
  currentCard.classList.remove('current-card');
  targetCard.classList.add('current-card');
  
  currentDot.classList.remove('current-card');
  targetDot.classList.add('current-card');
  
  // hiding buttons when the user comes to the end of carouel (last card)  
  if (targetIndex === 0) {
    prevButton.classList.add('hidden');
    nextButton.classList.remove('hidden');
  } else if (targetIndex == cards.length - 1) {
    prevButton.classList.remove('hidden');
    nextButton.classList.add('hidden');
  } else {
    prevButton.classList.remove('hidden');
    nextButton.classList.remove('hidden');
  }
}

// move cards to the left when the user clicks left 
prevButton.addEventListener('click', e => {
  const currentCard = track.querySelector('.current-card');
  const prevCard = currentCard.previousElementSibling;
  const cardIndex = cards.findIndex(card => card === prevCard);
  const targetDot = dots[cardIndex];

  // move to the next card
  moveToCard(currentCard, prevCard, targetDot, cardIndex);  
  if (prevCard == currentCard) {
    prevButton.classlist.add('hidden');
    moveToCard(currentCard, prevCard, targetDot);
  }
})

// move cards to the right when the user clicks right 
nextButton.addEventListener('click', e => {
  const currentCard = track.querySelector('.current-card');
  const nextCard = currentCard.nextElementSibling;
  const cardIndex = cards.findIndex(card => card === nextCard);
  const targetDot = dots[cardIndex];
  
  //move to the next card
  if (cardIndex != -1) 
    moveToCard(currentCard, nextCard, targetDot, cardIndex);
})

//when the user  nav indicators, move to that card
dotsNav.addEventListener('click', e => {
  
  const targetDot = e.target.closest('button');

  
  if (!targetDot) return;
  
  const currentCard = track.querySelector('.current-card');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetCard = cards[targetIndex];
  
  moveToCard(currentCard, targetCard, targetDot, targetIndex);


})