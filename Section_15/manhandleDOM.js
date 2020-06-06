document.querySelector("p").classList.toggle("big");

let p = document.getElementsByTagName("p")[0];
let ul = document.querySelector("ul");
// preserves <strong> tag inside
let imgs = document.getElementsByTagName("img");
imgs[0].setAttribute("src", "https://s3-eu-west-1.amazonaws.com/bowwowtimes-new/wp-content/uploads/2015/05/German-Shepherd-Corgi-mix-Imgur.jpg");
imgs[1].setAttribute("src", "https://s3-eu-west-1.amazonaws.com/bowwowtimes-new/wp-content/uploads/2015/05/German-Shepherd-Corgi-mix-Imgur.jpg");
let link = document.querySelector("a");
link.setAttribute("href", "https://www.duck.com");