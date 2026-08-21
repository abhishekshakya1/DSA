/*
Problem statement -
Write a function countDigits(n)that takes an integer n and returns how many digits it contains.

Requirements -
Handles both positive and negative integers.
Return 1 if n is 0(since 0 is a single-digit number).

 */

const countDigits = (n) => {

    if (n === 0) {
        return 1;
    }

    n = Math.abs(n);

    let count = 0;

    while (n > 0) {
        n = Math.floor(n / 10);
        count++;
    };

    return count;

};

let num = 259;
let result = countDigits(num);
console.log(result);


/*
Time Complexity: O(n), where n is the number of digits in n. Each division reduces the number by one digit, so the loop iterates n times.

Auxiliary Space: O(1), since only a constant amount of extra space is used.

Edge Cases
1) Edge Case for Zero: If n=0, the function should return 1 since 0 has only one digit

*/