let canvas = document.getElementById("TheCanvas");
let ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height-50;
let dx = 2
let dy = -2;
let ballRadius = 10;
let paddleHeight = 15;
let paddleWidth = 80;
let paddleX = (canvas.width-paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let brickRowCount = 7;
let brickColumnCount = 4;
let brickWidth = 90;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 10;
let brickOffsetLeft = 15;
let score = 0;
let lives = 3;

let bricks = [];
for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function keyDownHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            if(b.status === 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score === brickRowCount*brickColumnCount) {
                        alert("YOU WIN, WEll DONE!");
                        document.location.reload();
                        clearInterval(interval); // <- This is needed for the browser to end the game \\
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px OCR A";
    ctx.fillStyle = "#00ffd9"
    ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
    ctx.font = "16px OCR A"
    ctx.fillStyle = "00ffd9"
    ctx.fillText("Lives: "+lives, canvas.width-85, 20);
}

function drawBall() {
    // drawing code \\
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.lineWidth=3
    ctx.strokeStyle = "#00ff00";
    ctx.stroke();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-15, paddleWidth, paddleHeight);
    ctx.lineWidth=2
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status === 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.strokeStyle = "#33FFFF";
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if(!lives) {
                alert("Game Over! Press 'Ok' to reload!");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 3;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 3;
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}
draw();
// TO DO: -Speed up, -Dark Mode, -Text \\