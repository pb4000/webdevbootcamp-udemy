function isEven(num) {
    if (num % 2 === 0) {
        return true;
    }
    return false;
}

function factorial(num) {
    let output = num;
    for (let i = num - 1; i > 1; i--) {
        output *= i;
    }
    return output;
}

function kebabToSnake(input) {
    while (input.indexOf("-") !== -1) {
        input = input.slice(0, input.indexOf("-")) + "_" + input.slice(input.indexOf("-") + 1);
    }
    return input;
}