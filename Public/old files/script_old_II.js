var canvas = document.getElementById("TheCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-50;
var dx = 2
var dy = -2;
var ballRadius = 10;
var paddleHeight = 15;
var paddleWidth = 80;
var paddleX = (canvas.width-paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 6;
var brickColumnCount = 4;
var brickWidth = 90;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 15;
var score = 0;
var lives = 99;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0,status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key === "Left" || e.key == "ArrowLeft") {
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
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, WELL DONE!");
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
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
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
                clearInterval(interval); // Is needed for Browser to end the game \\
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
}
var interval = setInterval(draw, 9);

function myFunction() {
    var checkBox = document.getElementById("darkmode");
    if (checkBox.checked == true){
        document.body.style.backgroundColor = "#000000";
        document.getElementsByTagName("label")[0].style.color = "#FFFFFF";
    } else {
        document.body.style.backgroundColor = "#FFFFFF";
        document.getElementsByTagName("label")[0].style.color = "#000000";
    }
}

var checkBox = document.getElementById("darkmode");
checkBox.onclick = myFunction();
// 3 columns (x), dark mode schalter (), text (), in-game restart statt alert (), ball random start (), pause button () \\