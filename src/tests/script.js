const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = document.getElementById('main').clientHeight;

const lineWidth = 30;
let startX = canvas.width / 2;
let startY = 0;
let currentX = startX;
let currentY = startY;
let dx = -20;
let dy = 8;
let bounceCount = 0;

function drawLine(x1, y1, x2, y2) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function animate() {
    if (bounceCount < 3) {
        currentX += dx;
        currentY += dy;

        // if (currentY > canvas.height || currentY < 0) {
        //     dy = -dy;
        //     bounceCount++;
        //     drawLine(startX, startY, currentX, currentY);
        //     startX = currentX;
        //     startY = currentY;
        // }

        if (currentX < 0 || currentX > canvas.width) {
            dx = -dx;
            bounceCount++;
            drawLine(startX, startY, currentX, currentY);
            startX = currentX;
            startY = currentY;
        }

        drawLine(startX, startY, currentX, currentY);

        if (bounceCount < 3) {
            requestAnimationFrame(animate);
        }
    }
}

animate();
