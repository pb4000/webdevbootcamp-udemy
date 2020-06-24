const express = require("express");
const app = express();

// add public directory to list of files to serve
app.use(express.static("public"));

// specify all served files are .ejs
app.set("view engine", "ejs");

// ======ROUTES======

// root
app.get("/", function(req, res) {
    // looks inside of views directory
    res.render("home");
})

app.get("/fallinlovewith/:name", function(req, res) {
    let name = req.params.name;
    let ejsVars = {
        name: name
    };
    res.render("love", ejsVars);
});

app.get("/posts", function(req, res) {
    let posts = [
        {title: "OMG look at this Karen!", author: "Susy"},
        {title: "My adorable pet bunny", author: "John"},
        {title: "We hacked you", author: "Anonymous"},
        {title: "Hello", author: "Erin"}
    ]
    res.render("posts", {posts: posts});
});

// listens for new connection
app.listen(3000, function() {
    console.log("Listening on port 3000...");
});