const express = require("express");
const app = express();

const ejsInput = {
    campgrounds: [
        {
            name: "Salmon Creek",
            image: "https://www.visitmt.com/binaries/content/gallery/MTOT/responsive/hero-f/places-to-stay/camping/dsc_9240-2_web.jpg"
        },
        {
            name: "Granite Hills",
            image: "https://cdn.vox-cdn.com/thumbor/FMUIaXcnBaKK9YqdP8qtxUog150=/0x0:4741x3161/1200x800/filters:focal(1992x1202:2750x1960)/cdn.vox-cdn.com/uploads/chorus_image/image/59535149/shutterstock_625918454.0.jpg"
        },
        {
            name: "Mountain Goat's Rest",
            image: "https://i.ytimg.com/vi/BO4NpbNKPPE/maxresdefault.jpg"
        }
    ]
};

app.get("/", (req, res) => {
    res.render("landing.ejs");
});

app.get("/campgrounds", (req, res) => {
    res.render("campsites.ejs", ejsInput);
});

app.listen(3000, () => {
    console.log("Listening on port 3000...");
});