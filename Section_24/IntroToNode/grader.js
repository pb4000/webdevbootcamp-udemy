function average(scores) {
    let total = 0;
    scores.forEach(function(score) {
        total += score;
    })
    console.log(Math.round(total / scores.length));
}

var scores = [90, 98, 89, 100, 100, 86, 94];
average(scores);

scores = [46, 65, 77, 82, 80, 54, 73, 63, 95, 49];
average(scores);