const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home");
});

let friends = ["Trevor", "Brady", "Ethan"];

// POST ROUTE
app.post("/addFriend", function(req, res) {
    friends.push(req.body.newFriend);
    res.redirect("/friends");
});

app.get("/friends", function(req, res) {
    res.render("friends", {friends: friends});
});

app.listen(3000, function() {
    console.log("Listening on port 3000...");
});