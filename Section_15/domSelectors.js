// select individual element by id
let id = document.getElementById("highlight");
// select multiple elements by class names
let classes = document.getElementsByClassName("bolded");
// select all elements of type on page
let tagName = document.getElementsByTagName("li");

// select first element matching the CSS-style selectors
// NOTE: only returns first occurence (in this case, list item 2)
let query = document.querySelector(".bolded");
// select all elements with matching CSS-style selectors
let queryAll = document.querySelectorAll("li .bolded");