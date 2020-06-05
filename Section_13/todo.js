window.setTimeout(function() {
    let done = false;
    let input;
    let list = [];
    while (!done) {
        input = prompt("What would you like to do?").trim();
        switch (input.toLowerCase()) {
            case "new":
                list.push(prompt("Enter a todo:").trim());
                console.log(list[list.length - 1] + " added to list");
                break;
            case "list":
                console.log("**********");
                list.forEach(function(element, i) {
                    console.log(i + ": " + element);
                });
                console.log("**********");
                break;
            case "delete":
                input = prompt("Enter index of todo to delete").trim();
                if (isNaN(input)) {
                    alert(input + " is not a number");
                    break;
                } else if (input >= list.length) {
                    alert(input + " is an invalid index");
                }
                list.splice(input, 1);
                break;
            case "quit":
                console.log("Ok, you quit the app");
                done = true;
                break;
            default:
                alert("Command not recognized!");
                break;
        }
    }
}, 500);