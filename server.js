var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);


const Grass = require("./grass")
const Explosive = require("./explosive")
const GrassEater = require("./grasseater")
const StillEater = require("./stilleater")
const Predator = require("./predator")

grassArr = []
grassEaterArr = []
predatorArr = []
stillEaterArr = []
explosiveArr = []

matrix = []
function random(num) {
    let res = Math.round(Math.random() * num)
    return res
}

function matrixGenerator(size, countGrass, countGrassEater, countPredator, countStillEater, countExplosive) {
    for (let i = 0; i < size; i++) {
        matrix.push([])
        for (let j = 0; j < size; j++) {
            matrix[i].push(0)
        }
    }
    for (let k = 0; k < countGrass; k++) {
        let x = Math.floor(random(size-1))
        let y = Math.floor(random(size-1))
        console.log(x,y);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }

    }
    for (let k = 0; k < countGrassEater; k++) {
        let x = Math.floor(random(size-1))
        let y = Math.floor(random(size-1))
        console.log(x,y);

        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let k = 0; k < countPredator; k++) {
        let x = Math.floor(random(size-1))
        let y = Math.floor(random(size-1))
        console.log(x,y);

        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }
    for (let k = 0; k < countStillEater; k++) {
        let x = Math.floor(random(size-1))
        let y = Math.floor(random(size-1))
        console.log(x,y);

        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }
    for (let k = 0; k < countExplosive; k++) {
        let x = Math.floor(random(size-1))
        let y = Math.floor(random(size-1))
        console.log(x,y);

        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }
    }
    io.emit("send matrix", matrix) 
    return matrix
}




matrixGenerator(20, 10, 5, 1, 2, 1)

function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y)
                grassArr.push(grass)
            } if (matrix[y][x] == 2) {
                let grassEater = new GrassEater(x, y)
                grassEaterArr.push(grassEater)
            } if (matrix[y][x] == 3) {
                let newPredator = new Predator(x, y)
                predatorArr.push(newPredator)
            }
            if (matrix[y][x] == 4) {
                let stillEater = new StillEater(x, y)
                stillEaterArr.push(stillEater)
            }
            if (matrix[y][x] == 5) {
                let explosive = new Explosive(x, y)
                explosiveArr.push(explosive)
            }

        }
    }
}
createObject()


function gameRunner() {
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul()
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat()
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].mul()
    }
    for (let i = 0; i < predatorArr.length; i++) {
        predatorArr[i].eat()
    }
    for (let i = 0; i < stillEaterArr.length; i++) {
        stillEaterArr[i].eat()
    }
    for (let i = 0; i < explosiveArr.length; i++) {
        explosiveArr[i].explosive()
    }
    io.emit("send matrix", matrix) 
    return matrix
}

setInterval(gameRunner, 1000)