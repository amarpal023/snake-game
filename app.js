// Define Game Variables.
let direction = {x: 0, y: 0}; 
let speed = 4;
let score = 0;
let lastRender = 0;
let snakeArr = [
    {x: 13, y: 15}
];

apple = {x: 6, y: 7};

// Game Functions.
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastRender)/1000 < 1/speed){
        return;
    }
    lastRender = ctime;
    gameStart();
}
// Start the game.
const startbutton = document.querySelector("startButton");
    startButton.addEventListener("click", function(){
        direction = {x: 0, y: -1} 
        console.log(click);
    });

function isCrash(snake) {
    // If you bump into yourself.
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall.
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameStart() {
    // Part 1: Updating the snake array & apple. using window.location.reload to reset the score to 0 after game over.
    if(isCrash(snakeArr)) {
        Direction =  {x: 0, y: 0}; 
        alert("Game Over. Press START to play again!");
        window.location.reload();
        snakeArr = [{x: 13, y: 15}];
        score = 0; 
    }

    // If you have eaten the apple, increment the score and regenerate the apple.
    if(snakeArr[0].y === apple.y && snakeArr[0].x ===apple.x) {
        score += 1;
        if(score>topscoreval) {
            topscoreval = score;
            localStorage.setItem("TOP SCORE", JSON.stringify(topscoreval));
            topScorePoint.innerHTML = "TOP SCORE: " + topscoreval;
        }
        scorePoint.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y});
        let a = 2;
        let b = 16;
        apple = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake.
    for (let i = snakeArr.length - 2; i >= 0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;

    // Part 2: Display the snake and apple.
    // Display the snake.
    field.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0) {
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        field.appendChild(snakeElement);
    });
    // Display the apple.
    appleElement = document.createElement('div');
    appleElement.style.gridRowStart = apple.y;
    appleElement.style.gridColumnStart = apple.x;
    appleElement.classList.add('apple')
    field.appendChild(appleElement);


}


// Main logic starts here.
let topScore = localStorage.getItem("TOP SCORE");
if(topScore === null) {
    topscoreval = 0;
    localStorage.setItem("TOP SCORE", JSON.stringify(topscoreval))
}
else{
    topscoreval = JSON.parse(topScore);
    topScorePoint.innerHTML = "TOP SCORE: " + topScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            direction.x = 0;
            direction.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            direction.x = 0;
            direction.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            direction.x = -1;
            direction.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            direction.x = 1;
            direction.y = 0;
            break;
        default:
            break;
    }
});
