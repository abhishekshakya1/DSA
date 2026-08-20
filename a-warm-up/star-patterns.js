// 1) Print a square pattern of stars (*) of size n x n.

let n = 4;
for (let i = 0; i < n; i++) {

    let row = "";
    for (let j = 0; j < n; j++) {
        row = row + " " + "*";

    }
    console.log(row);
};
console.log("------------------>>");


// 2) Print a right-angled triangle of stars with n rows.

for (let i = 0; i < n; i++) {

    let row = ""
    for (let j = 0; j <= i; j++) {
        row = row + " " + "*";
    }
    console.log(row);

};
console.log("------------------>>");


// 3) Write a program that prints a right-angled triangle of numbers of heightn.

for (let i = 0; i < n; i++) {

    let row = "";
    for (let j = 1; j <= i + 1; j++) {
        row = row + " " + j;
    }
    console.log(row);

};
console.log("------------------>>");

// 4) Write a program that prints a right-angled triangle where each row contains the same number repeated.

for (let i = 1; i <= n; i++) {

    let row = "";
    for (let j = 0; j < i; j++) {
        row = row + " " + i;
    }
    console.log(row);

};
console.log("------------------>>");


// 5) Write a program that prints a reverse right-angled triangle where each row starts from 1 and the number of elements decreases with each row.

for (let i = n; i >= 1; i--) {

    let row = "";
    for (let j = 1; j <= i; j++) {
        row = row + " " + j;
    }
    console.log(row);

}

console.log("------------------>>");



