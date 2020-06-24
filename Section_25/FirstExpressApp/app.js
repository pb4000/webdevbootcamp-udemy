const express = require("express");
const app = express();

// "/" => "Hi there!"
app.get("/", function(req, res) {
    console.log("SOMEONE MADE A REQUEST TO /");
    res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res) {
    console.log("SOMEONE MADE A REQUEST TO /bye");
    res.send("Goodbye!");
})

// "/dog" => "MEOW!"
app.get("/dog", function(req, res) {
    console.log("SOMEONE MADE A REQUEST TO /dog");
    res.send("MEOW!");
})

// "/:subredditName" (take any input for subredditName) => yeet
app.get("/r/:subredditName", function(req, res) {
    res.send("WELCOME TO " + req.params.subredditName.toUpperCase() + "!!!");
})

app.get("/r/:subredditName/comments/:id/:title", function(req, res) {
    res.send("WELCOME TO THE " + req.params.subredditName.toUpperCase() + " COMMENTS PAGE!");
})

// "unknown" => "404"
app.get("*", function(req, res) {
    console.log("404 error for " + req.url + " from " + req.ip);
    res.send("404: PAGE NOT FOUND")
})

// listen for new connections

app.listen(3000, function() {
    console.log("Serving on port 3000");
});