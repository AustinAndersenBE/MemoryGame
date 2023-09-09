const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// handling card clicks
let flippedCards = [];
let isBoardLocked = false;


function handleCardClick(event) {
  if(isBoardLocked) return;

  const selectedCard = event.target;

  if (selectedCard.dataset.matched) return;

  if (flippedCards.length === 1 && selectedCard === flippedCards[0]) return;

  selectedCard.style.backgroundColor = selectedCard.classList[0]

  flippedCards.push(selectedCard);

  if(flippedCards.length === 2) {
    isBoardLocked = true;

    if (flippedCards[0].classList[0] === flippedCards[1].classList[0]){

      flippedCards[0].dataset.matched = true;
      flippedCards[1].dataset.matched = true;

      flippedCards = [];

      setTimeout(() => {
        isBoardLocked = false;
      }, 500);
    } else {
      setTimeout(() => {
        flippedCards[0].style.backgroundColor = "";
        flippedCards[1].style.backgroundColor = "";
        flippedCards = [];
        isBoardLocked = false;
      }, 1000);
    }
  } 
}

// when the DOM loads
createDivsForColors(shuffledColors);
