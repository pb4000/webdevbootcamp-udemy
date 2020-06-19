// text == textContent
console.log($('ul').text());
$('h1').text("New Text!!");
$('li').text("Rusty, Colt's dog, is adorable");

// html == innerHTML
console.log($('ul').html());
$('ul').html("<li>I hacked your UL!</li><li>Rusty is still adorable!</li>");

// attr == attribute
$('img').css("width", "200px");
$('img').attr("src", "https://www.lokeshdhakar.com/projects/lightbox2/images/image-5.jpg")
$('img:first-of-type').attr("src", "https://i.imgur.com/zvANQeG.jpg")
$('img').last().attr("src", "https://i.imgur.com/zvANQeG.jpg")

// val == value of
console.log($('input').val());
$('input').val("yo");

// addClass


// removeClass


// toggleGlass
