// EXPRESS
const express = require("express");
const app = express();
app.use(express.static(__dirname + "public"));


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


// PASSPORT SETUP
const passport = require('passport'),
    LocalStyrategy = require('passport-local'),
    User = require('./models/user');
app.use(require('express-session')({
    secret: 'I am making some bad websites',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStyrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// CURRENT USER MIDDLEWARE
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

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
    await Campground.find({}, (err, results) => {
        if (err) {
            console.log("ERROR RETRIEVING CAMPGROUNDS FROM THE DB\n" + err);
        } else {
            res.render("campgrounds/index.ejs", {
                campsites: results
            });
        }
    });
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

app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new.ejs", { campground: results });
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
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


// ======AUTH ROUTES======

// shows form to create an account
app.get("/register", (req, res) => {
    res.render('auth/register.ejs');
});

// creates a new user
app.post("/register", (req, res) => {
    User.register(new User({
        username: req.body.username
    }), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.render('auth/register.ejs');
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/campgrounds');
            });
        }
    });
});

// shows login form
app.get("/login", (req, res) => {
    res.render('auth/login.ejs');
});

// authenticate user
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}));

// logout route
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}


app.listen(3000, () => {
    console.log("Listening on port 3000...");
});