const LivingCreature = require("./livingCreature")
module.exports = class Grass extends LivingCreature {
    constructor(x, y){
        super(x, y);
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
   
   random (arr) {
       let res = Math.round(Math.random()* arr.length)
       return arr[res]
   }

    mul() {
    
    this.multiply++; //1
    var newCell = this.random(this.chooseCell(0)); //newCell-1 datark harevan
    if (this.multiply >= 8 && newCell) { //[3,4]
    var newGrass = new Grass(newCell[0], newCell[1]);
    grassArr.push(newGrass);
    matrix[newCell[1]][newCell[0]] = 1;
    this.multiply = 0;
    }
    }
    }