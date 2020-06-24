const express = require("express");
const app = express();

// === ROOT ===
app.get("/", function(req, res) {
    console.log(req.ip + " REQUESTED " + req.url);
    res.send("Hi there, welcome to my assignment!");
});

// === SPEAK ===
app.get("/speak/:animal", function(req, res) {
    console.log(req.ip + " REQUESTED " + req.url);
    switch (req.params.animal) {
        case "pig":
            res.send("Oink");
            break;
        case "cow":
            res.send("Moo");
            break;
        case "dog":
            res.send("Woof");
            break;
        default:
            res.send("Animal not supported");
            break;
    }
});

// === REPEAT ===
app.get("/repeat/:word/:repeats", function(req, res) {
    console.log(req.ip + " REQUESTED " + req.url);
    let output = "";
    for (let i = 0; i < req.params.repeats; i++) {
        output += req.params.word + " ";
    }
    res.send(output.trim());
});

// === DEFAULT ===
app.get("*", function(req, res) {
    console.log(req.ip + " REQUESTED " + req.url);
    res.send("404 PAGE NOT FOUND");
});

// === LISTEN ===
app.listen(3000, function() {
    console.log("Listening on port 3000");
});