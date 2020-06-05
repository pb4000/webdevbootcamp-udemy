const p1ScoreDisplay = document.getElementById("p1ScoreDisplay");
const p2ScoreDisplay = document.getElementById("p2ScoreDisplay");
let p1Score = 0, p2Score = 0, maxScore = 5;

const maxScoreDisplay = document.getElementById("maxScoreDisplay");
const maxScoreInput = document.getElementById("maxScoreInput");

const p1btn = document.getElementById("p1btn");
const p2btn = document.getElementById("p2btn");

const resetBtn = document.getElementById("resetBtn");

const updateScores = function () {
    p1ScoreDisplay.innerHTML = p1Score;
    p2ScoreDisplay.innerHTML = p2Score;
    maxScoreDisplay.innerHTML = maxScore;
}


p1btn.addEventListener("click", function () {
    if (p1Score != maxScore && p2Score != maxScore) {
        if (++p1Score == maxScore) {
            p1ScoreDisplay.classList.toggle("win");
        }
        updateScores();
    }
});

p2btn.addEventListener("click", function () {
    if (p1Score != maxScore && p2Score != maxScore) {
        if (++p2Score == maxScore) {
            p2ScoreDisplay.classList.toggle("win");
        }
        updateScores();
    }
});

resetBtn.addEventListener("click", function () {
    p1Score = p2Score = 0;
    p1ScoreDisplay.classList.remove("win");
    p2ScoreDisplay.classList.remove("win");
    updateScores();
});

maxScoreInput.addEventListener("change", function() {
    maxScore = maxScoreInput.value;
    maxScoreDisplay.textContent = maxScore;
});