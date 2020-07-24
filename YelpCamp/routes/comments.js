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

// show form to edit a comment
router.get("/:comment_id/edit", checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, comment) => {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            Campground.findById(req.params.id, (err, campground) => {
                if (err) {
                    console.log(err);
                    res.redirect("back");
                } else {
                    res.render("comments/edit.ejs", {
                        comment: comment,
                        campground: campground
                    });
                }
            });
        }
    });
});

// update a comment
router.put("/:comment_id", checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err) => {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// delete a comment
router.delete("/:comment_id", checkCommentOwnership, (req, res) => {
    // delete comment from comment db
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            // delete comment from campground
            Campground.findById(req.params.id, (err, campground) => {
                if (err) {
                    console.log(err);
                    res.redirect("back");
                } else {
                    for (let i = 0; i < campground.comments.length; i++) {
                        if (campground.comments[i].equals(req.params.comment_id)) {
                            campground.comments.splice(i, 1);
                            break;
                        }
                    }
                    Campground.findByIdAndUpdate(campground._id, campground, (err) => {
                        if (err) {
                            console.log(err);
                            res.redirect("back");
                        } else {
                            res.redirect("/campgrounds/" + req.params.id);
                        }
                    });
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

function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, comment) => {
            if (err) {
                res.redirect("back");
            } else {
                if (comment.author.id.equals(req.user._id)) {
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