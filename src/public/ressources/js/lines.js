let canvas = document.getElementById('background_lines');
let ctx = canvas.getContext('2d');
console.log(window.innerWidth);
canvas.width = window.innerWidth<1280?window.innerWidth:1280;
console.log('canvas.width: ', canvas.width);
canvas.height = document.getElementById('background_lines').clientHeight;

const lineWidth = 25;
calculateCanva();
let startY = 0;
let currentX = startX;
let currentY = startY;

let bounceCount = 0;
let newBouceCount = 0;

function drawLine(x1, y1, x2, y2) {
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = 'lightgray';
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function animate() {
  if (bounceCount < 3) {
    if(newBouceCount !== bounceCount){
      switch (bounceCount) {
        case 0:
            
          break;
        case 1:
          // console.log('bounceCount22: ', bounceCount);
          // console.log('dx: ', dx);
          // console.log('dy: ', dy);
          dx = dx;
          dy = dy/4;
          // console.log('dx: ', dx);
          // console.log('dy: ', dy);
          break;
        case 2:
          dx = dx;
          dy = dy*3.5;
          break;
        default:
          break;
      }
      newBouceCount = bounceCount;
    }
    currentX += dx;
    currentY += dy;

    if (currentX < 0 || currentX > canvas.width) {
      console.log('bounceCount: ', currentX);
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
  // console.log('bounceCount: ', bounceCount);
}

animate();


window.addEventListener('resize', () => {
  resize();
});
function resize() {
  canvas = document.getElementById('background_lines');
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth<1280?window.innerWidth:1280;
  

  canvas.height = window.innerHeight * 1.5;

  calculateCanva();
  
  startY = 0;
  currentX = startX;
  currentY = startY;
  bounceCount = 0;

  animate();
}

function calculateCanva(){
  if(window.innerWidth < 768){
    startX = canvas.width / 2;
    dx = -20;
    dy = canvas.height / 80;
  }else{
    startX = canvas.width / 3;
    dx = -20;
    dy = canvas.height / 150;
  }
}
