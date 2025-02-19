
var sum_to_n_a = function(n) {
    return (n * (n + 1)) / 2;
};

var sum_to_n_b = function(n) {
    let sum = 0;
    for (let i = 0; i <= n; i++){
        sum += i;
    }
    return sum;
};

var sum_to_n_c = function(n) { 
    return Array.from({ length: n }, (_, i) => i + 1).reduce((sum, num) => sum + num, 0);
};

function test_sum_to_n() {
    console.log(sum_to_n_a(99));
    console.log(sum_to_n_b(99));
    console.log(sum_to_n_c(99));
}

test_sum_to_n();
