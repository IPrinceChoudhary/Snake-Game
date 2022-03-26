//////////////////////////// (Inspired by Code With Harry) ///////////////////////////

// variables
const gameArea = document.querySelector(".game-area");
const foodSound = new Audio("./music/food.mp3");
const gameOverSound = new Audio("./music/gameover.mp3");
const snakeMove = new Audio("./music/move.mp3");
const gameMusic = new Audio("./music/music.mp3");
const displayScore = document.querySelector(".score");
const highScore = document.querySelector(".hs");
const inst = document.querySelector(".press")
const inst2 = document.querySelector(".press-2")
const easy = document.querySelector(".easy")
const medium = document.querySelector(".medium")
const hard = document.querySelector(".hard")
const level = document.querySelectorAll(".level-btns");
const noVolume = document.querySelector(".circle")
let direction = { x: 0, y: 0 };
let speed = 13;
let lastPaintTime = 0;
let snakeArray = [
  { x: 11, y: 12 }, //head
];
let food = { x: 8, y: 5 };
let score = 0;

// events
window.addEventListener("keydown", (e) => {
  inst.textContent = " ";
  inst2.textContent = " ";
  gameMusic.play();
  direction = { x: 0, y: 1 };
  snakeMove.play();
  if (e.key === "ArrowUp") {
    // console.log("up")
    direction.x = 0;
    direction.y = -1;
  } else if (e.key === "ArrowDown") {
    // console.log("down")
    direction.x = 0;
    direction.y = 1;
  } else if (e.key === "ArrowLeft") {
    // console.log("left")
    direction.x = -1;
    direction.y = 0;
  } else if (e.key === "ArrowRight") {
    // console.log("right")
    direction.x = 1;
    direction.y = 0;
  }
});



// functions
const main = (time) => {
  window.requestAnimationFrame(main);
  if ((time - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = time;
  gameEngine();
};

function gameEngine() {
  // displaying snake
  gameArea.innerHTML = "";
  snakeArray.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake-body");
    }
    gameArea.appendChild(snakeElement);

  });

  // displaying food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameArea.appendChild(foodElement);


  // snake colliding
  if (isCollide(snakeArray)) {
    score = 0;
    displayScore.innerHTML = "SCORE:" +" "+score  // updating the score = 0 after the game ends 
    gameOverSound.play();
    gameMusic.pause();
    direction = { x: 0, y: 0 };
    alert("Game Over. Press Enter key or Click 'OK' to play again");
    score = " "
    snakeArray = [{ x: 11, y: 12 }]; // reset game after click on alert
    gameMusic.play();
    score = 0;
  }

  // food
  if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > highScoreValue) {
      highScoreValue = score;
      localStorage.setItem("hiscore", JSON.stringify(highScoreValue));
      highScore.innerHTML = "HIGH SCORE:" + " " + highScoreValue;
    }
    displayScore.innerHTML = "Score:" + " " + score;
    //cordinates matching
    snakeArray.unshift({
      x: snakeArray[0].x + direction.x,
      y: snakeArray[0].y + direction.y,
    }); //adds the element according to the direction

    // generating random food
    let a = 2;
    let b = 20;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // moving snake
  for (let i = snakeArray.length - 2; i >= 0; i--) {
    //2nd last index  || upto 0th index || backward for loop
    snakeArray[i + 1] = { ...snakeArray[i] };
    //index starting from second last index and then we selecting the next index which will be last index and then shifting the last index to the 2nd last index then looping for all the indexes like this
  }

  snakeArray[0].x += direction.x;
  snakeArray[0].y += direction.y;
  // (for the 0th index)
  
}

// snake colliding to the boundaries 
function isCollide(snake) {
  // bump into urself
  for (let i = 1; i < snakeArray.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      // when snake head getting bump into the body
      return true;
    }
  }
  // bumping to border
  if (
    snake[0].x >= 23 ||
    snake[0].x <= 0 ||
    snake[0].y >= 23 ||
    snake[0].y <= 0
  ) {
    return true;
  }
  return false;
}

// high score

let hiScore = localStorage.getItem("highScore");  //  this is string which we getting from LS
if (hiScore === null) {
  highScoreValue = 0;
  localStorage.setItem("hiscore", JSON.stringify(highScoreValue));
} else {
  highScoreValue = JSON.parse(hiScore)
  highScore.innerHTML = "HIGH SCORE:" + hiScore;
}

// selecting level 
level.forEach((e)=>{
  e.addEventListener("click", (e)=>{
    btn = e.target
    btn.classList.toggle("add")
    if (btn.classList.contains("easy")) {
      speed = 5;
    }
    else if (btn.classList.contains("medium")) {
      speed = 13;
    }
    else if (btn.classList.contains("hard")) {
      speed = 21;
    }
  })
})

window.requestAnimationFrame(main);
