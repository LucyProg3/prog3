class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
         this.x = x;
        this.y = y;
        this.energy = 100;
        this.index = index;
        this.energy = 0;
        this.dircetions = [];
    }
    chooseCell(character) {

    }
    mul() {

    }


    getNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCordinates()
    return super.chooseCell(character);
        }

    mul() {
        let azatkordinatner = this.chooseCell(1)
        let newCell = random(azatkordinatner)
        console.log(newCell);
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] == 2;
            grassEaterArr.push(new GrassEater(x, y));
            this.multiply = 10;
        }
        this.multiply++;
    }

    eat() {
    let emptyCells = this.chooseCell(1);
    let newCell = random(emptyCells);
    if(newCell) {
        this.energy++
        let newX = newCell[0];
        let newY = newCell[1];
        matrix[newY][newX] = matrix[this.y][this.x]
        matrix[this.y][this.x] = 0;
        this.x = newX
        this.y = newY
        if(this.energy > 15) {
            this.mul()
        }
        for (let i in grassArr) {
            if (newX == grassArr[i].x && newY == grassArr[i].y) {
                grassArr.splice(i, 1);
                break;
            }
        }

    } else {
        this.move()
    }
}

     move() {
    this.energy--
    let emptyCells = this.chooseCell(0);
    let newCell = random(emptyCells);
    if(newCell && this.energy >= 0) {
        let newX = newCell[0];
        let newY = newCell[1];
        matrix[newY][newX] = matrix[this.y][this.x]
        matrix[this.y][this.x] = 0;
        this.x = newX
        this.y = newY
    } else {
        this.die()
    }
}


die() {
    matrix[this.y][this.x] = 0;
    for (var i in grassEaterArr) {
        if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
            grassEaterArr.splice(i, 1);
            break;
        }
    }
}
}


