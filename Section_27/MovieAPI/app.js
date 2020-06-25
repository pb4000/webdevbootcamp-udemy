// init express
const express = require('express');
const app = express();

// init body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// init axios
const axios = require('axios');

// list of movie results
let results = {
    Search: []
};

// root route
app.get("/", (req, res) => {
    res.render("home.ejs");
});

// search routes
app.get("/search", (req, res) => {
    console.log(results);
    res.render("movieSearch.ejs", results);
})

// NOTE: anon function MUST be async to allow await
app.post("/search", async (req, res) => {
    console.log("\n\n" + req.ip + " searched for: " + req.body.movieTitle);
    // await used to pause thread until omdb api responds
    await axios.get('http://www.omdbapi.com/?s=' + req.body.movieTitle + '&apikey=thewdb')
        .then((response) => {
            // success
            results = response.data;
            // console.log(results.Search);
        }).catch((error) => {
            // error
            console.log(error);
        });
    res.redirect("/search");
})

app.listen(3000, () => {
    console.log("Listening on port 3000...");
});