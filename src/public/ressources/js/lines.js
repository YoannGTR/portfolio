let canvas = document.getElementById('background_lines');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; //<1280?window.innerWidth:1280;
canvas.height = document.getElementById('background_lines').clientHeight;

const reduc = 0.6;
var triangleSize = canvas.width/10;
var halfSize = triangleSize * reduc;
var rows = Math.ceil(canvas.height / (triangleSize*reduc)) + 1;
var cols = Math.ceil(canvas.width / (triangleSize*reduc)) + 1;

const triangles = [];

function getRandomGray(excludeColor) {
  let grayValue;
  let condition = true;
  while (condition) {
    grayValue = Math.floor(Math.random() * 100) + 100; // Nuances de gris entre 100 et 200
    if (excludeColor) {
      condition = excludeColor.some((color) => grayValue <= color+5 && grayValue >= color-5);
      // console.log(condition);
    }
    else {
      condition = false;
    }
  }
  return grayValue;
}

function createTriangles() {
  let delay = 0;
  for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
          let x = col * halfSize;
          let y = row * halfSize/reduc;

          // Déterminer si le triangle pointe vers le haut ou le bas
          let pointingUp = (row + col) % 2 === 0;

          // Obtenir une couleur qui n'est pas la même que les voisins
          let adjacentColors = [];
          if (row > 0) {
              // Triangle au-dessus
              adjacentColors.push(triangles[(row - 1) * cols + col]?.grayValue);
              if (col > 0) {
                  // Triangle en haut à gauche
                  adjacentColors.push(triangles[(row - 1) * cols + col - 1]?.grayValue);
              }
              if (col < cols - 1) {
                  // Triangle en haut à droite
                  adjacentColors.push(triangles[(row - 1) * cols + col + 1]?.grayValue);
              }
          }
          if (col > 0) {
              // Triangle à gauche
              adjacentColors.push(triangles[row * cols + col - 1]?.grayValue);
          }

          let grayValue = getRandomGray(adjacentColors);
          triangles.push({ x, y, grayValue, pointingUp, opacity: 0, delay });
          delay += 1;
      }
  }

}

function drawTriangle(x, y, size, color, pointingUp, opacity) {
  ctx.beginPath();
  if (pointingUp) {
    ctx.moveTo(x, y);
    ctx.lineTo(x + halfSize, y + size);
    ctx.lineTo(x - halfSize, y + size);
  } else {
    ctx.moveTo(x, y + size);
    ctx.lineTo(x + halfSize, y);
    ctx.lineTo(x - halfSize, y);
  }
  ctx.closePath();
  ctx.fillStyle = `rgba(${color}, ${color}, ${color}, ${opacity})`;
  ctx.fill();
}

function animateTriangles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let allStatic = true;
  let currentTime = Date.now();

  triangles.forEach((triangle) => {
    // Vérifier si le temps de delay est passé pour ce triangle
    if (currentTime >= triangle.startTime + triangle.delay) {
      if (triangle.opacity < 0.15) {
        triangle.opacity += 0.01;
        allStatic = false;
      }
      drawTriangle(
        triangle.x,
        triangle.y,
        triangleSize,
        triangle.grayValue,
        triangle.pointingUp,
        triangle.opacity,
      );
    }
  });

  if (!allStatic) {
    requestAnimationFrame(animateTriangles);
  }
}

createTriangles();

// Définir le temps de départ pour chaque triangle
triangles.forEach((triangle) => {
  triangle.startTime = Date.now();
});

animateTriangles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = document.getElementById('background_lines').clientHeight;
  triangleSize = canvas.width/10;
  halfSize = triangleSize * reduc;
  rows = Math.ceil(canvas.height / (triangleSize*reduc)) + 1;
  cols = Math.ceil(canvas.width / (triangleSize*reduc)) + 1;
  triangles.length = 0;
  createTriangles();
  triangles.forEach((triangle) => {
    triangle.startTime = Date.now();
  });
  animateTriangles();
});
