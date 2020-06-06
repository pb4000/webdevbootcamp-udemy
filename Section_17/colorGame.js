/*
 * VARIABLES
 */

// stores all square objects on the page
let squares = document.querySelectorAll(".square");
// stores winning color
let winner;
// stores difficulty
let totalSquares = 6;


/*
 * FUNCTIONS
 */

 const win = function() {
     document.querySelector("#heading").style.backgroundColor = winner;
     document.querySelector("#message").textContent = "Correct!";
     document.querySelector("#reset").textContent = "PLAY AGAIN?";
     for (let i = 0; i < totalSquares; i++) {
         squares[i].style.backgroundColor = winner;
         squares[i].style.display = "inline-block";
     }
 }

const newGame = function() {
    generateNewColors();
    pickWinner();
    setHeading();
    initSquares();
}

const initSquares = function() {
    for (let i = 0; i < 6; i++) {
        if (i < totalSquares) {
            squares[i].style.display = "block";
        } else {
            squares[i].style.display = "none";
        }
    }
}

const setHeading = function() {
    document.querySelector("#message").textContent = "";
    document.querySelector("#reset").textContent = "NEW COLORS";
    document.querySelector("#color").textContent = winner.toUpperCase();
    document.querySelector("#heading").style.backgroundColor = "steelblue";
}

const pickWinner = function() {
    winner = squares[Math.floor(Math.random() * (totalSquares - 1))].style.backgroundColor;
}

const generateNewColors = function() {
    squares.forEach(function(current) {
        current.style.backgroundColor = randomColor();
    })
}

const randomColor = function() {
    let output = "rgb(";
    output += Math.floor(Math.random() * 255) + ", ";
    output += Math.floor(Math.random() * 255) + ", ";
    output += Math.floor(Math.random() * 255) + ")";
    return output;
}

/*
 * EVENT LISTENERS
 */

 document.querySelector("#easy").addEventListener("click", function() {
     if (totalSquares !== 3) {
         totalSquares = 3;
         document.querySelector("#hard").classList.toggle("selected");
         this.classList.toggle("selected");
         newGame();
     }
 });

 document.querySelector("#hard").addEventListener("click", function() {
     if (totalSquares !== 6) {
         totalSquares = 6;
         document.querySelector("#easy").classList.toggle("selected");
         this.classList.toggle("selected");
         newGame();
     }
 });

 document.querySelector("#reset").addEventListener("click", newGame);

 const squareListeners = function() {
     squares.forEach(function(self) {
         self.addEventListener("click", function() {
             if (this.style.backgroundColor == winner) {
                 win();
             } else {
                 this.style.background = "#232323";
                 document.querySelector("#message").textContent = "Try Again";
             }
         });
     });
 }


/*
 * RUN ON PAGE LOAD
 */

 squareListeners();
 newGame();