var canvas = document.getElementById('gameCanvas'); 
var canvasCtx = canvas.getContext('2d');
canvas.width = 800;  
canvas.height = 600;

var ballX = 50;
var ballY = 50;
var ballSpeedX = 5;
var ballSpeedY = 5;
var padOneY = 250;
var padTwoY = 250;
var padHeight = 100;
var padWidth = 15;
var playOne = 0;
var playTwo = 0;


function heading() {
    var text = document.getElementById('header');
    var pos = 0;
    var id = setInterval(frame, 5);

    function frame() {
        if (pos < 640) {
            pos++;
            text.style.left = pos + 'px';
        } else {
            // pos++;
            // text.style.left = pos + 'px';
        }
    }
}

function startGame() { // Calling the function when window loads the page
    canvas;
    canvasCtx;
    var disappear = document.getElementById('button').style.display = "none";
    var fps = 60; // frames per second 
    setInterval(function() {
        moveObjects();
        drawObjects();
    }, 1000/fps); // Every one second after the page is loaded, it will call the draw function

    canvas.addEventListener('mousemove', 
    function(evt) {
        var mousePosition = mousePos(evt);
        padOneY = mousePosition.y - (padHeight/2); // subtracting half the height of the paddle to move the paddle in the center
    })
}

// 0, 0 would be top-left corner / width, 0 would be top-right / 0, height would be bottom-left / width, height would be bottom-right
function ballReset() {
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

function mousePos(evt) { // evt parameter is going to recieve the mouse coordinates
    var rect = canvas.getBoundingClientRect(); // The canvas size
    var root = document.documentElement; // HTML document
    var mouseX = evt.clientX - rect.left - root.scrollLeft; // Getting the the coordinates within the playable space
    var mouseY = evt.clientY - rect.top - root.scrollTop; // Getting the the coordinates within the playable space
    return {
        x: mouseX,
        y: mouseY
    }
}

function cpuMove() {
    var padTwoCenter = padTwoY + (padHeight / 2);
    if (padTwoCenter < ballY - 35) { // If ball is greater than paddle two center 35 px away, then shift it down 6 else shift up
        padTwoY += 4;
    } else if (padTwoCenter < ballY + 35) {
        padTwoY -= 4;
    }
}

function moveObjects() {
    cpuMove();
    ballX += ballSpeedX; // Add 20 to the positionmof ballX
    ballY += ballSpeedY; // Add 20 to the positionmof ballX
    if (ballX < padWidth) { // If ball speed is less than zero send the ball the opposite direction
      if (ballY > padOneY && ballY < padOneY + padHeight) { // If ball is below the top of the paddle but above the bottom of the paddle then flip the ball
          ballSpeedX = -ballSpeedX;
      } else if (ballX < 0) {
          ballReset();
          playTwo++; 
      }  
    }
    if (ballX > canvas.width - padWidth) {
        if (ballY > padTwoY && ballY < padTwoY + padHeight) { // If ball is below the top of the paddle but above the bottom of the paddle then flip the ball
          ballSpeedX = -ballSpeedX;
      } else if (ballX > canvas.width){
          ballReset(); 
          playOne++;
      }
    }
    if (ballY < 0) { // If ball speed is less than zero send the ball the opposite direction
      ballSpeedY = -ballSpeedY;  
    }
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
}

function drawObjects() { // Each time fuction is called
    canvasCtx.fillStyle = 'black'; // fill
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height); // X axis, Y axis, width, height
    canvasCtx.fillStyle = 'white'; // fill
    canvasCtx.fillRect(0, padOneY, padWidth, padHeight); // X axis, Y axis, width, height
    canvasCtx.fillStyle = 'white'; // fill
    canvasCtx.fillRect(canvas.width - 15, padTwoY, padWidth, padHeight); // X axis, Y axis, width, height
    
    canvasCtx.beginPath();
    canvasCtx.arc(ballX, ballY, 8, 0, Math.PI * 2, false); // Research arc method
    canvasCtx.fillStyle = "white";
    canvasCtx.fill();

    canvasCtx.fillText(playOne, 100, 100); // Score is 100 pixels from the top and start of the canvas
    canvasCtx.fillText(playTwo, canvas.width - 100, 100); // Score is 100 pixels from the top and width of the canvas
    canvasCtx.font = "30px Arial";
}
 
 
