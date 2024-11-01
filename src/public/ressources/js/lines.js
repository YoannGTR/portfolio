let canvas = document.getElementById('background_lines');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; //<1280?window.innerWidth:1280;
canvas.height = document.getElementById('background_lines').clientHeight; //<720?window.innerHeight:720;
// console.log("canvas.height:"+canvas.height);
const reduc = 0.55;
var nbTrinagles = canvas.width < 1000 ? 20 : 50;
const reducDegrade = 10 / 14;
const opacity = 0.15;
var triangleSize = canvas.width / nbTrinagles;
var halfSize = triangleSize * reduc;
var rows = Math.ceil(canvas.height / triangleSize);
// console.log("rows:"+rows);
var cols = Math.ceil(canvas.width / (triangleSize * reduc)) + 1;

const triangles = [];

function getRandomGray(excludeColor, nuance1, nuance2) {
  let grayValue;
  let condition = true;
  while (condition) {
    grayValue = Math.floor(Math.random() * nuance1) + nuance2; // Nuances de gris entre 100 et 200
    if (excludeColor) {
      condition = excludeColor.some(
        (color) => grayValue <= color + 5 && grayValue >= color - 5,
      );
      // console.log(condition);
    } else {
      condition = false;
    }
  }
  return grayValue;
}

function createTriangles() {
  let delay = 0;
  let row;
  let degrade = 0;
  for (row = 0; row < rows; row++) {
    let y = (row * halfSize) / reduc;
    // console.log("y:"+y);
    if (row >= rows * reducDegrade) {
      degrade += (opacity * 100) / (rows - rows * reducDegrade) / 100;
      // console.log("degrade:"+degrade);
    }
    for (let col = 0; col < cols; col++) {
      let x = col * halfSize;

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

      let grayValue = getRandomGray(adjacentColors, 100, 100);
      triangles.push({
        x,
        y,
        grayValue,
        pointingUp,
        opacity: 0,
        delay,
        degrade,
      });
      // delay += 1;
    }

    // console.log(window.innerHeight);
  }
  // createTrianglesDegrade(row+1);
}
/*
function createTrianglesDegrade(stoppedRow) {
  let delay = 0;
  let degrade = 100;
  for (let row = stoppedRow; row < stoppedRow+stoppedRow/5; row++) {
    console.log("row:" + row);
    degrade += 140/(stoppedRow/5);
    for (let col = 0; col < cols; col++) {
      let x = col * halfSize;
      let y = (row * halfSize) / reduc;

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

      let grayValue = getRandomGray(adjacentColors, 100, degrade);
      triangles.push({ x, y, grayValue, pointingUp, opacity: 0, delay });
      // delay += 1;
    }
    
    // console.log(window.innerHeight);
  }

}
*/
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
      // let test = 0.15
      if (triangle.degrade > 0) {
        // test = 1;
      }
      if (triangle.opacity < opacity - triangle.degrade) {
        // if (triangle.opacity < test) {
        triangle.opacity += 0.01;
        allStatic = false;
      } else {
        // console.log("kk"+triangle.opacity)
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
  nbTrinagles = canvas.width < 1000 ? 20 : 50;
  triangleSize = canvas.width / nbTrinagles;
  halfSize = triangleSize * reduc;
  rows = Math.ceil(canvas.height / triangleSize);
  cols = Math.ceil(canvas.width / (triangleSize * reduc)) + 1;
  triangles.length = 0;
  createTriangles();
  triangles.forEach((triangle) => {
    triangle.startTime = Date.now();
  });
  animateTriangles();
});

//rajouter un dégrader fin lp
