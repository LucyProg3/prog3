var matrix = [
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var grassArr = [];
var grassEaterArr = [];
var grassEaterEaterArr = []
var BombArr = [];
var BombDestroyerArr = [];



var side = 35;

function setup() {
    frameRate(500);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    var row = 50, column = 50;

    for (var y = 0; y < row; ++y) {
        matrix[y] = [];

        for (var x = 0; x < column; ++x) {
            matrix[y].push(Math.round(random(0, 6)));
        }
    }
console.log(matrix)

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === 1) {
                const gr = new Grass(y, x, 1);
                grassArr.push(gr);
            }
            // else if (matrix[y][x] === 2) {
            //     const gr = new GrassEater(j, i, 1);
            //     grassEaterArr.push(gr);
            // }
            else if (matrix[y][x] == 2) {
                if (grassEaterArr.length <= 20) {
                    var grEater = new GrassEater(x, y);
                    grassEaterArr.push(grEater);
                }
                else matrix[y][x] = 0;
            }
            else if (matrix[y][x] == 3) {
                if (grassEaterEaterArr.length <= 20) {
                    var grEatEater = new GrassEaterEater(x, y);
                    grassEaterEaterArr.push(grEatEater);
                }
                else matrix[y][x] = 0;
            }
            else if (matrix[y][x] == 4) {
                var randBomb = new Bomber(x, y);
                BombArr.push(randBomb);
            }
            else if (matrix[y][x] == 5) {
                if (BombDestroyerArr.length <= 20) {
                    var bombDest = new BomberDestroyer(x, y);
                    BombDestroyerArr.push(bombDest);
                }
                else matrix[y][x] = 0;
            }
        }
    }
}

function drawMatrix() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if (weather == 'winter') { fill('white'); }
                else if (weather == 'autumn') { fill('#e0bb28') }
                else { fill("green"); }
                rect(x * side, y * side, side, side);
            }
            if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill("#09eded");
                rect(x * side, y * side, side, side);
            }
        }
    }
}


function draw() {
    drawMatrix();
    frameRate(30);
    frameCount();
    if (frameCount <= 30) {
        weather = "winter";
        color("#f7f7f7");
    }
    else if (frameCount > 30 && frameCount <= 50) {
        weather = "spring";
        color("light green");
    }

    else if (frameCount > 50 && frameCount <= 75) {
        weather = "summer";
        color("light blue")
    }
    else if (frameCount > 75 && frameCount <= 100) {
        weather = "autumn";
        color("orange");
    }

    else if (frameCount == 101) {
        days = 0;
    }
        
    
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in grassEaterEaterArr) {
        grassEaterEaterArr[i].eat();
    }
    for (var i in BombArr) {
        BombArr[i].explode();
    }
    for (var i in BombDestroyerArr) {
        BombDestroyerArr[i].destroy();
    }
}
