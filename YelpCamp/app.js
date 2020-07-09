// EXPRESS
const express = require("express");
const app = express();


// BODY PARSER
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


// MONGOOSE SETUP
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelpcamp", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// SCHEMA SETUP
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const seedDB = require("./seeds");
seedDB();


/*
 * <<<<<<<<<<<<ROUTES>>>>>>>>>>>>
 */

 // root
app.get("/", (req, res) => {
    res.render("campgrounds/landing.ejs");
});

// ======CAMPGROUNDS======

// INDEX - list of all campgrounds
app.get("/campgrounds", async (req, res) => {
    let campsites;
    await Campground.find({}, (err, results) => {
        if (err) {
            console.log("ERROR RETRIEVING CAMPGROUNDS FROM THE DB\n" + err);
        } else {
            console.log("RETRIEVED " + results.length + " CAMPGROUNDS FROM DB");
            campsites = results;
        }
    });
    res.render("campgrounds/index.ejs", { campsites });
});

// NEW - form to submit a new campground
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new.ejs");
})

// CREATE - submits a new campground
app.post("/campgrounds", async (req, res) => {
    console.log("New campsite submitted: " + req.body.name);
    await Campground.create({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    }, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log("NEW CAMPGROUND: " + results);
        }
    });
    res.redirect("/campgrounds");
});

// SHOW - show details of specific campground
// :id looks for anything. "campgrounds/new" would redirect here if this route was first
app.get("/campgrounds/:id", (req, res) => {
    // find campground with provided id and populate comments array
    Campground.findById(req.params.id).populate("comments").exec((err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
            // render the show page
            res.render("campgrounds/show.ejs", { campground: results });
        }
    });
});


// ======COMMENTS======

app.get("/campgrounds/:id/comments/new", (req, res) => {
    Campground.findById(req.params.id, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new.ejs", { campground: results });
        }
    });
});

app.post("/campgrounds/:id/comments", (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});


app.listen(3000, () => {
    console.log("Listening on port 3000...");
});