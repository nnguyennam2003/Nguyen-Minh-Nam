var sum_to_n_a = function (n) {
    const sum = (n * (n + 1)) / 2;
    return sum;
};

var sum_to_n_b = function (n) {
    let sum = 0
    for (i = 1; i <= n; i++) {
        sum += i
    }
    return sum
};

var sum_to_n_c = function (n) {
    if (n === 1) return 1;
    return n + sum_to_n_c(n - 1);
};

const sumMethod = (method) => {
    let n = parseInt(document.getElementById("input").value);
    if (isNaN(n) || n < 1) {
        alert("Please enter a valid number")
        return;
    }

    let result
    if (method === 'a') {
        result = sum_to_n_a(n)
    } else if (method === 'b') {
        result = sum_to_n_b(n)
    } else if (method === 'c') {
        result = sum_to_n_c(n)
    }

    alert("Result: " + result);
}