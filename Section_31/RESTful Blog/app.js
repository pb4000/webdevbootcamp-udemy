const e = require('express');

// init imports
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    expressSanitizer = require('express-sanitizer');

// pass arguments to express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


// connect to DB
mongoose.connect("mongodb://localhost:27017/restful-blog", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// set up schema
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    // date created
    created: {
        type: Date,
        default: Date.now
    }
});
const Blog = mongoose.model("blog", blogSchema);


// redirect root to index
app.get("/", (req, res) => {
    res.redirect("/blogs");
});

// RESTFUL ROUTES

// index - list all blogs
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.render("index.ejs", { blogs: results });
        }
    });
});

// new - show form to make new blog
app.get("/blogs/new", (req, res) => {
    res.render("new.ejs");
});

// create - post route to create a new blog, then redirect to index route
app.post("/blogs", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, (err, results) => {
        if (err) {
            console.log(err);
            res.render("new.ejs");
        } else {
            res.redirect("/blogs");
        }
    });
});

// show - show details about a specific blog post
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, results) => {
        if (err) {
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.render("show.ejs", { post: results });
        }
    });
});

// edit - show form to edit a blog
app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, results) => {
        if (err) {
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.render("edit.ejs", { post: results });
        }
    });
});

// update - update a particular blog post
app.put("/blogs/:id", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, results) => {
        if (err) {
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
});

// delete - delete a particular blog post
app.delete("/blogs/:id", (req, res) => {
    Blog.findByIdAndDelete(req.params.id, (err, results) => {
        if (err) {
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    })
});


app.listen(3000, () => {
    console.log("Listening on port 3000");
});