let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let hard = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const hardButton = document.querySelector("#hard");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");


hardButton.addEventListener('change', (event) => {
    if (hardButton.checked == true) {
        hard = true;
    } else {
        hard = false;
    }
});

onButton.addEventListener('click', (event) => {
    if (onButton.checked == true) {
        on = true;
        turnCounter.innerHTML = "-";
    } else {
        on = false;
        turnCounter.innerHTML = "";
        clearColor();
        clearInterval(intervalId);
    }
});


startButton.addEventListener('click', (event) => {
    if (on || win) {
        play();
    }
})

function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;
    for (var i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;
    
    intervalId = setInterval(gameTurn, 800); 
}


function gameTurn () {
    on = false;
    
    if (flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }
    
    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (order[flash] == 1) one();
            if (order[flash] == 2) two();
            if (order[flash] == 3) three();
            if (order[flash] == 4) four();
            flash++;
        }, 200);
    }
}


function one() {
    return playASound("clip1", topLeft, "lightgreen");
}

function two() {
    return playASound("clip2", topRight, "tomato");
}

function three() {
    return playASound("clip3", bottomLeft, "yellow");
}

function four() {
    return playASound("clip4", bottomRight, "lightskyblue");
}




function clearColor () {
    topLeft.style.backgroundColor = "#028d02";
    topRight.style.backgroundColor = "#950a0a";
    bottomLeft.style.backgroundColor = "#eaac12";
    bottomRight.style.backgroundColor = "#114cbc";
}

function flashColor () {
    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "tomato";
    bottomLeft.style.backgroundColor = "yellow";
    bottomRight.style.backgroundColor = "lightskyblue";
}

topLeft.addEventListener('click', (event) => {
    clickInAButton(one);
})

topRight.addEventListener('click', (event) => {
    clickInAButton(two);
})

bottomLeft.addEventListener('click', (event) => {
    clickInAButton(three);
})

bottomRight.addEventListener('click', (event) => {
    clickInAButton(four);
})

function clickInAButton(numberFn) {
    if (on) {
        playerOrder.push(numberFn());
        check();
        
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
}

function playASound(elementId, elementToChange, color){
    if (noise) {
        let audio = document.getElementById(elementId);
        audio.play();
    }
    
    noise = true;
    elementToChange.style.backgroundColor = color;
    return Number(elementId.substr(4));
}


function check() {
    if (playerOrder[playerOrder.length - 1] != order[playerOrder.length - 1])
        good = false;
    
    if (playerOrder.length == 20 && good) {
        winGame();
    }
    
    if (good == false) {
        flashColor();
        turnCounter.innerHTML = "NO!";
        setTimeout(() => {
            turnCounter.innerHTML = turn;
            clearColor;
            
            if (hard) {
                play();
            } else {
               compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);
        
        noise = false;
    }
    
    if (turn == playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }
}

function winGame() {
    flashColor();
    turnCounter.innerHTML = "WIN!";
    on = false;
    win = true;
}










