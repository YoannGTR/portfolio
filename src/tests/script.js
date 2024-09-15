const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const reduc = 0.60;
        const triangleSize = 80;
        const halfSize = triangleSize*reduc;
        const rows = Math.ceil(canvas.height / triangleSize)*2 + 1;
        const cols = Math.ceil(canvas.width / triangleSize)*3 + 1;

        const triangles = [];

        function createTriangles() {
            let delay = 0;
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    let x = col * halfSize;
                    let y = row * halfSize/reduc;
                    
                    // Diminuer l'amplitude des nuances de gris
                    let grayValue = Math.floor(Math.random() * 30) + 220; // Nuances de gris entre 100 et 200

                    // Déterminer si le triangle pointe vers le haut ou le bas
                    let pointingUp = (row + col) % 2 === 0;

                    triangles.push({ x, y, grayValue, pointingUp, opacity: 0, delay });
                    
                    // Augmenter le délai pour chaque triangle
                    delay += 0.5; // Augmentez cette valeur pour ralentir ou accélérer l'apparition des triangles
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

            triangles.forEach(triangle => {
                // Vérifier si le temps de delay est passé pour ce triangle
                if (currentTime >= triangle.startTime + triangle.delay) {
                    if (triangle.opacity < 1) {
                        triangle.opacity += 0.02;
                        allStatic = false;
                    }
                    drawTriangle(triangle.x, triangle.y, triangleSize, triangle.grayValue, triangle.pointingUp, triangle.opacity);
                }
            });

            if (!allStatic) {
                requestAnimationFrame(animateTriangles);
            }
        }

        createTriangles();

        // Définir le temps de départ pour chaque triangle
        triangles.forEach(triangle => {
            triangle.startTime = Date.now();
        });

        animateTriangles();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            triangles.length = 0;
            createTriangles();
            animateTriangles();
        });