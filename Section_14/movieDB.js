let newMovie = function (titleIn, ratingIn, watchedIn) {
    return {
        title: titleIn,
        rating: ratingIn,
        watched: watchedIn
    };
};

const movies = [];
movies.push(newMovie("In Bruges", 5, true));
movies.push(newMovie("Frozen", 4.5, false));
movies.push(newMovie("Mad max: Fury Road", 5, true));
movies.push(newMovie("Les Miserables", 3.5, false));

movies.forEach(function(movie) {
    if (movie.watched) {
        console.log("You have watched \"" + movie.title + "\" - " + movie.rating + " stars");
    } else {
        console.log("You not have watched \"" + movie.title + "\" - " + movie.rating + " stars");
    }
});