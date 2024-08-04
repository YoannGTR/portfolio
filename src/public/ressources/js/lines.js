let canvas = document.getElementById('background_lines');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;

canvas.height = window.innerHeight * 1.5;

const lineWidth = 30;
let startX = canvas.width / 2;
let startY = 0;
let currentX = startX;
let currentY = startY;
let dx = -15;
let dy = 6;
let bounceCount = 0;

function drawLine(x1, y1, x2, y2) {
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = 'purple';
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
  console.log('bounceCount: ', bounceCount);
}

animate();

function animate2() {
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
      requestAnimationFrame(animate2);
    }
  }
  console.log('bounceCount: ', bounceCount);
}
window.addEventListener('resize', () => {
  resize();
});
function resize() {
  canvas = document.getElementById('background_lines');
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;

  canvas.height = window.innerHeight * 1.5;

  startX = canvas.width / 2;
  startY = 0;
  currentX = startX;
  currentY = startY;
  dx = -15;
  dy = 6;
  bounceCount = 0;

  animate2();
}
