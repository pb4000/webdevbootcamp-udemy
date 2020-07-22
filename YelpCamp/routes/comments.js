const express = require('express'),
    router = express.Router({
        mergeParams: true
    }),
    Campground = require('../models/campground'),
    Comment = require('../models/comment');

// ======ROUTES======

// form to make a new comment
router.get("/new", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new.ejs", { campground: results });
        }
    });
});

// create a new comment
router.post("/", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author = {
                        id: req.user._id,
                        username: req.user.username
                    };
                    comment.save();
                    // save comment
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}

module.exports = router;