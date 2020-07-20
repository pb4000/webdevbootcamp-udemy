// body parser
const bodyParser = require('body-parser');

// mongoose
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/authdemo", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});

//express
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// passport
const passport = require('passport'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    User = require("./models/user");
app.use(require('express-session')({
    secret: "Daisy will not shut up",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ======ROUTES=======

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/secret', isLoggedIn, (req, res) => {
    res.render('secret');
});

// auth routes

// show sign up form
app.get('/register', (req, res) => {
    res.render('register');
});

// handle registeration requests
app.post('/register', (req, res) => {
    User.register(new User({
        username: req.body.username
    }), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render('register');
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/secret');
            });
        }
    });
});

// show login form
app.get('/login', (req, res) => {
    res.render('login');
});

// login logic
app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}), (req, res) => {
});

// logout logic
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// ======MIDDLEWARE=======

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}


// ======START SERVER======

app.listen(3000, () => {
    console.log("Listening on port 3000...");
});