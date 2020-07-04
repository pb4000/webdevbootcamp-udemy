const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/cat_app");

const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

const Cat = mongoose.model("Cat", catSchema);

// add a new cat to DB

// let norris = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });
// norris.save((err, cat) => {
//     if (err) {
//         console.log("SOMETHING WENT WRONG");
//     } else {
//         console.log("WE JUST SAVED A CAT TO THE DATABASE: " + cat);
//     }
// });

Cat.create({
    name: "Daisy",
    age: 8,
    temperament: "Sweet"
}, (err, results) => {
    if (err) {
        console.log(err);
    } else {
        console.log(results);
    }
});

// retrieve all cats from DB

// Cat.find({}, (err, results) => {
//     if (err) {
//         console.log("UH OH SPAGHETTIOS");
//         console.log(err);
//     } else {
//         console.log("ALL THE CATS!!!");
//         console.log(results);
//     }
// });