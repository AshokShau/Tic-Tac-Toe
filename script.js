// Access all buttons
let boxes = document.querySelectorAll(".box");

let resetButton = document.querySelector("#reset-game");
let newGameBtn = document.querySelector("#new-game");
let whoWinner = document.querySelector(".who-winner");
let msgWinner = document.querySelector("#winner-msg");

// two player player-x or player-o
let turnO = true;
let click = 0;

// Store Winning pattern using arr
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const enableBtns = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const disableBtns = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const gameDrow = () => {
  msgWinner.innerText = `Neither side could secure victory;\nit was a deadlock.`;
  whoWinner.classList.remove("hide");
  disableBtns();
};

const resetGame = () => {
  turnO = true;
  click = 0;
  enableBtns();
  whoWinner.classList.add("hide");
};

const isWinner = () => {
  for (let i of winPatterns) {
    let posOneVal = boxes[i[0]].innerText;
    let posTwoVal = boxes[i[1]].innerText;
    let posThreeVal = boxes[i[2]].innerText;

    if (posOneVal != "" && posTwoVal != "" && posThreeVal != "") {
      if (posOneVal === posTwoVal && posTwoVal === posThreeVal) {
        showWinner(posOneVal);
      }
    }
  }
};

const showWinner = (winner) => {
  msgWinner.innerText = `Congratulations !\nWinner is ${winner}`;
  whoWinner.classList.remove("hide");
  disableBtns();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    // Disable button after click
    box.disabled = true;
    click++;
    // Call isWinner
    let winner = isWinner();

    if (click === 9 && !winner) {
      gameDrow();
    }
  });
});

newGameBtn.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);
