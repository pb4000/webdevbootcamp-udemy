const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});


// POST - title. content
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Post = mongoose.model("Post", postSchema);


// USER - email, name
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
const User = mongoose.model("User", userSchema);

// User.findOne({
//     name: "John Green"
// }, (err, user) => {
//     if (err) {
//         console.log(err);
//     } else {
//         user.posts.push({
//             title: "Why is my Last name 'Green'?",
//             content: "IDK"
//         });
//         user.save((err, user) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(user);
//             }
//         });
//     }
// });

// let newUser = new User({
//     email: "john@green.edu",
//     name: "John Green"
// });

// newUser.posts.push({
//     title: "How to make cool videos",
//     content: "Skill"
// });

// newUser.save((err, results) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(results);
//     }
// })

// User.create({
//     email: "john@green.edu",
//     name: "John Green"
// }, (err, results) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(results);
//     }
// });

// Post.create({
//     title: "Reclections on Apples",
//     content: "They are delicious!"
// }, (err, results) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(results);
//     }
// });