let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};
let direction = "right";
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

function criarBG() {
  context.fillStyle = "#fdfdfd";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "#4fce5c ";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = "#D85656";
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function update(event) {
  if (event.keyCode == 37 && direction != "right") {
    direction = "left";
  }
  if (event.keyCode == 38 && direction != "bottom") {
    direction = "top";
  }
  if (event.keyCode == 39 && direction != "left") {
    direction = "right";
  }
  if (event.keyCode == 40 && direction != "top") {
    direction = "bottom";
  }
}

function iniciarJogo() {
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == "bottom") snake[0].y = 0;
  if (snake[0].y < 0 && direction == "top") snake[0].y = 16 * box;

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo);
      alert("Game over :(");
      window.location.reload(true);
    }
  }

  criarBG();
  drawFood();
  criarCobrinha();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "top") snakeY -= box;
  if (direction == "bottom") snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);
