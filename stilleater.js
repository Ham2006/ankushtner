const LivingCreature = require("./livingCreature")
module.exports = class StillEater extends LivingCreature {
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
        let all = allGrasses.concat(allGrassEaters)
        let oneCharacter = this.random(all)
        
        if (oneCharacter) {
            let neighX = oneCharacter[0]
            let neighY = oneCharacter[1]
            matrix[this.y][this.x] = 0
            matrix[neighY][neighX] = 4
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
            }
    }

}