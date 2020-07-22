/* eslint-disable no-unused-vars */
const express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    passport = require('passport');

// root
router.get("/", (req, res) => {
    res.render("campgrounds/landing.ejs");
});


// ======AUTH ROUTES======

// shows form to create an account
router.get("/register", (req, res) => {
    res.render('auth/register.ejs');
});

// creates a new user
router.post("/register", (req, res) => {
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
router.get("/login", (req, res) => {
    res.render('auth/login.ejs');
});

// authenticate user
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}));

// logout route
router.get("/logout", (req, res) => {
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

module.exports = router;