let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#turn");
const topleft = document.querySelector("#topleft");
const topright = document.querySelector("#topright");
const bottomleft = document.querySelector("#bottomleft");
const bottomright = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

strictButton.addEventListener('click',(event) => {   //change or click samething
  if(strictButton.checked == true){
    strict = true;
  }else{
    strict = false;
  }
});

onButton.addEventListener('click',(event) => {   //change or click samething
  if(onButton.checked == true){
    on = true;
    turnCounter.innerHTML = "--";
  }else{
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});

startButton.addEventListener('click',(event) => {   //change or click samething but somehow only click is working
  if(on || win){
    play();
  }
});

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;

  for(var i = 0; i < 20; i++){
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;
  intervalId = setInterval(gameTurn, 800);
}

function gameTurn(){
  on = false;
  if(flash == turn){
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }

  if(compTurn){
    clearColor();
    console.log(order[flash]);
    setTimeout(() => {          //interval-repeat over and over; timeout=repeat after certain ms.
      if(order[flash] == 1) {
        one();
      }if(order[flash] == 2) {
        two();
      }if(order[flash] == 3) {
        three();
      }if(order[flash] == 4) {
        four();
      }
      flash++;
    }, 200);
  }
}

function one(){
  if(noise){
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  topleft.style.backgroundColor = "tomato";
}
function two(){
  if(noise){
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  topright.style.backgroundColor = "lightgreen";
}
function three(){
  if(noise){
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomleft.style.backgroundColor = "lightskyblue";
}
function four(){
  if(noise){
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  bottomright.style.backgroundColor = "#ffff66";
}

function clearColor(){
  topleft.style.backgroundColor = "red";
  topright.style.backgroundColor = "green";
  bottomleft.style.backgroundColor = "blue";
  bottomright.style.backgroundColor = "yellow";
}

function flashColor(){
  topleft.style.backgroundColor = "tomato";
  topright.style.backgroundColor = "lightgreen";
  bottomleft.style.backgroundColor = "lightskyblue";
  bottomright.style.backgroundColor = "#ffff66";
}

topleft.addEventListener('click', (event) => {
  if(on){
    playerOrder.push(1);
    check();
    one();
    if(!win){
      setTimeout(() => {
        clearColor();
      }, 500);
    }
  }
});
topright.addEventListener('click', (event) => {
  if(on){
    playerOrder.push(2);
    check();
    two();
    if(!win){
      setTimeout(() => {
        clearColor();
      }, 500);
    }
  }
});
bottomleft.addEventListener('click', (event) => {
  if(on){
    playerOrder.push(3);
    check();
    three();
    if(!win){
      setTimeout(() => {
        clearColor();
      }, 500);
    }
  }
});
bottomright.addEventListener('click', (event) => {
  if(on){
    playerOrder.push(4);
    check();
    four();
    if(!win){
      setTimeout(() => {
        clearColor();
      }, 500);
    }
  }
});

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
    good=false;
  }
  if(playerOrder.length == 20 && good){
    winGame();
  }
  if(good == false) {
    flashColor();
    turnCounter.innerHTML = "No!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();
      if(strict){
        play();
      }else{
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn,800);
      }
    }, 800);
    noise = false;
  }
  if(turn == playerOrder.length && good && !win){
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn,800);
  }
}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "Win!";
  on = false;
  win = true;
}
