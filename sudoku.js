"use strict"
var colors = require("colors")

class Sudoku {
    constructor(board_string) {
        this.sudokuBoard = this.board()
        this.board_string = board_string
        this.coordinate = this.coordinate()
    }

    solve() {
        let boardJadi = this.sudokuBoard;
        let coordinate = this.coordinate;

        for (let i = 0; i < coordinate.length; i++) {

            let x = coordinate[i][0];
            let y = coordinate[i][1];
            let counter = boardJadi[x][y] + 1

            let checkHor = this.horizontalVal(x, counter);
            let checkVer = this.verticalVal(y, counter);
            let checkGrid = this.blockVal(x, y, counter);

            while ((checkHor == false && checkVer == false && checkGrid == false) || (checkHor == false || checkVer == false || checkGrid == false)) {

                counter++
                checkGrid = this.blockVal(x, y, counter);
                checkHor = this.horizontalVal(x, counter);
                checkVer = this.verticalVal(y, counter);

                console.log(boardJadi);
                sleep(30);
                clearScreen()
            }

            if (counter > 9) {
                i -= 2
                boardJadi[x][y] = 0;
            } else
            if (counter <= 9) {
                boardJadi[x][y] = counter;
            }
        }
        console.log(boardJadi);
        console.log()
        console.log("========= SOLVED!!! =========".rainbow);
        // return boardJadi
    }

    coordinate() {
        let board = this.board();
        let savedCoor = []
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == 0) {
                    savedCoor.push([i, j])
                }
            }
        }
        return savedCoor;
    }

    blockVal(x, y, num) {

        let board = this.sudokuBoard;
        let newI = (Math.floor(x / 3)) * 3;
        let newJ = (Math.floor(y / 3)) * 3;

        for (let i = newI; i < newI + 3; i++) {
            for (let j = newJ; j < newJ + 3; j++) {
                if (board[i][j] == num) {
                    return false
                }
            }
        }
        return true;
    }

    horizontalVal(index, num) {
        let board = this.sudokuBoard;
        for (let i = 0; i < board.length; i++) {
            if (board[index][i] == num) {
                return false
            }
        }
        return true;
    }

    verticalVal(index, num) {
        let board = this.sudokuBoard;
        for (let i = 0; i < board.length; i++) {
            if (board[i][index] == num) {

                return false
            }
        }
        return true;
    }

    // Returns a string representing the current state of the board
    board() {
        let result = []
        let counter = 0
        for (let i = 0; i < 9; i++) {
            let store = []
            for (let j = 0; j < 9; j++) {
                store.push(Number(board_string[counter]));
                counter++
            }

            result.push(store)
        }
        return result;
    }

}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function clearScreen() {
    // Un-comment this line if you have trouble with console.clear();
    // return process.stdout.write('\033c');
    console.clear();
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
    .toString()
    .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// game.board()

// console.log(game.board())
// console.log("\n")
// console.log(game.solve())
// console.log(game.saveCoor())
game.solve();