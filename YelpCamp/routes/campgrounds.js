/* eslint-disable no-unused-vars */
const { rawListeners } = require('../models/campground');

/* eslint-disable no-unused-vars */
const express = require('express'),
    router = express.Router(),
    Campground = require('../models/campground'),
    Comment = require("../models/comment");

// ======CAMPGROUNDS======

// INDEX - list of all campgrounds
router.get("/", async (req, res) => {
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
router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new.ejs");
})

// CREATE - submits a new campground
router.post("/", isLoggedIn, async (req, res) => {
    console.log("New campsite submitted: " + req.body.campground.name);
    req.body.campground.author = {
        id: req.user._id,
        username: req.user.username
    };
    await Campground.create(req.body.campground, (err, results) => {
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
router.get("/:id", (req, res) => {
    // find campground with provided id and populate comments array
    Campground.findById(req.params.id).populate("comments").exec((err, results) => {
        if (err) {
            console.log(err);
        } else {
            // render the show page
            res.render("campgrounds/show.ejs", { campground: results });
        }
    });
});

// EDIT - form to edit a campground
router.get("/:id/edit", checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit.ejs", { campground: campground });
        }
    });
});

// UPDATE - put request to update a caompground
router.put("/:id", checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds/" + req.params.id + "/edit");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

// DESTROY - deletes a campground and its comments
router.delete("/:id", checkCampgroundOwnership, (req, res) => {
    // delete campground
    Campground.findByIdAndDelete(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds/" + req.params.id);
        } else {
            // if successful, delete comments
            campground.comments.forEach(element => {
                Comment.findByIdAndDelete(element._id, (err, output) => {
                    if (err) {
                        console.log(err);
                    }
                });
            });
            res.redirect("/campgrounds");
        }
    })
})

// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}

function checkCampgroundOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, campground) => {
            if (err) {
                res.redirect("back");
            } else {
                if (campground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("/login");
    }
}


module.exports = router;