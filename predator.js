const LivingCreature = require("./livingCreature")
module.exports = class predator extends LivingCreature{
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

    eat() {
        this.getNewCoordinates()
        let allGrasses = this.chooseCell(1)
        let allGrassEaters = this.chooseCell(2)
        let allStillEaters = this.chooseCell(4)
        let allExplosives = this.chooseCell(5)
        let all = allGrasses.concat(allGrassEaters , allStillEaters , allExplosives)
        let oneCharacter = this.random(all)
        
        if (oneCharacter) {
            let neighX = oneCharacter[0]
            let neighY = oneCharacter[1]
            this.energy++;
            matrix[this.y][this.x] = 0
            matrix[neighY][neighX] = 3
            this.x = neighX
            this.y = neighY
            for( var i in grassArr) {
                if(neighX == grassArr[i].x && neighY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
              
            }
            for( var i in grassEaterArr) {
                if(neighX == grassEaterArr[i].x && neighY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
              
            }
            for( var i in stillEaterArr) {
                if(neighX == stillEaterArr[i].x && neighY == stillEaterArr[i].y) {
                    stillEaterArr.splice(i, 1);
                    break;
                }
              
            }
            for( var i in explosiveArr) {
                if(neighX == explosiveArr[i].x && neighY == explosiveArr[i].y) {
                    explosiveArr.splice(i, 1);
                    break;
                }
              
            }
            } else{
                this.move()
            } 
    }

    move() {
            this.getNewCoordinates()
            let allEmptyCells = this.chooseCell(0)
            let oneEmptyCell = this.random(allEmptyCells)
            if(oneEmptyCell) {
                let neighX = oneEmptyCell[0]
                let neighY = oneEmptyCell[1]
                matrix[this.y][this.x] = 0
                matrix[neighY][neighX] = 3
                this.x = neighX;
                this.y = neighY;
                for (var i in grassArr) {
                    if(neighX == grassArr[i].x && neighY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
                for (var i in grassEaterArr) {
                    if(neighX == grassEaterArr[i].x && neighY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
            }
    }

}