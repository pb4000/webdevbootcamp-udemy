let h1 = document.querySelector("h1");
h1.style.color = "pink";

const body = document.querySelector("body");

setInterval(function() {
    if (body.style.backgroundColor !== "white") {
        body.style.backgroundColor = "white";
    } else {
        body.style.backgroundColor = "#3498db";
    }
}, 5000);