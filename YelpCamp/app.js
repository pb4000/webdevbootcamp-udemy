/* eslint-disable no-unused-vars */
// ======EXPRESS======
const express = require("express");
const app = express();
app.use(express.static("./public"));


// ======BODY PARSER======
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


// ======MONGOOSE SETUP======
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


// ======PASSPORT SETUP======
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


// ======CURRENT USER MIDDLEWARE======
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});


// ======ROUTES======
const commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/index');
app.use(indexRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);


app.listen(3000, () => {
    console.log("Listening on port 3000...");
});