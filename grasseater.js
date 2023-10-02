const LivingCreature = require("./livingCreature")
module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 8;
    }
   getNewCoordinates() {
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
       this.getNewCoordinates();
       return super.chooseCell(character);
   }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y)
                grassEaterArr.splice(i, 1)
            break;
        }
    }

    eat() {
        this.getNewCoordinates()
        let allGrasses = this.chooseCell(1)
        let oneGrass =   this.random(allGrasses)
        if (oneGrass) {
            let neighX = oneGrass[0]
            let neighY = oneGrass[1]
            this.energy++;
            matrix[this.y][this.x] = 0
            matrix[neighY][neighX] = 2
            this.x = neighX
            this.y = neighY
            for( var i in grassArr) {
                if(neighX == grassArr[i].x && neighY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
              
            }
            }   else{
                this.move()
            } 
    }

    move() {
        if(this.energy > 0) {
            this.getNewCoordinates()
            let allEmptyCells = this.chooseCell(0)
            let oneEmptyCell = this.random(allEmptyCells)
            if(oneEmptyCell) {
                this.energy--;
                let neighX = oneEmptyCell[0]
                let neighY = oneEmptyCell[1]
                matrix[this.y][this.x] = 0
                matrix[neighY][neighX] = 2
                this.x = neighX;
                this.y = neighY;
                for (var i in grassArr) {
                    if(neighX == grassArr[i].x && neighY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
        }
        else{
            this.die()
        }
    }
    mul() {
        if(this.energy>=12){
            var newCell = this.random(this.chooseCell(0));
            if (newCell) {
                var newGrassEater = new GrassEater(newCell[0], newCell[1])
                grassEaterArr.push(newGrassEater);
                matrix[newCell[1]][newCell[0]] = 2
                this.energy = 5
            }
        }
    }
}