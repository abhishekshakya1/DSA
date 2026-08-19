for (let i = 0; i <= 9; i++) {

    // console.log(i, "Hello, world !!");

};


// Problem Statement:
// Write a program to print all even numbers from an array.

// Example:
// Input: [10, 3, 5, 2, 7, 6, 9]

// Output: 10 2 6


let arr = [10, 3, 5, 2, 7, 6, 9];
// let arr = [];

const printEvenNumbers = (arr) => {
    // if (arr.length === 0) {
    //     return;
    // }

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            console.log(arr[i]);
        } else {
            console.log("Odd => ", arr[i]);

        }
    }
};

// printEvenNumbers(arr);

let i = 0;

while (i < 5) {
    // console.log("Hello !!");
    i++;
};



// Practice ---------------

// let array = [4, 2, 0, 10, 8, 30];

const searchElement = (array, target) => {

    for (let i = 0; i < array.length; i++) {

        if (array[i] === target) {
            return i;
        }
    }

    return -1;
}

// let value = searchElement(array, 98);
// console.log(value);


// let array = [2, -9, 17, 0, 1, -10, -4, 8];

const countNegativeNumbers = (array) => {
    let count = 0;

    for (let i = 0; i < array.length; i++) {

        if (array[i] < 0) {
            count = count + 1;
        }
    }
    return count;

};

// const result = countNegativeNumbers(array);
// console.log(result);


// let array = [5, 0, 10, 8, 17, 1];
// let array = [-9, -19, -3];

const largestNumber = (array) => {
    let largest = array[0];

    for (let i = 1; i < array.length; i++) {

        if (array[i] > largest) {
            largest = array[i];
        };

    };

    return largest;
};

// let result = largestNumber(array);
// console.log(result);


// let array = [5, 0, 10, 8, 17, 1];
// let array = [-9, -19, -3];

const smallestNumber = (array) => {
    let smallest = Infinity;

    for (let i = 0; i < array.length; i++) {

        if (array[i] < smallest) {
            smallest = array[i];
        };
    };
    return smallest;
};

// let result = smallestNumber(array);
// console.log(result);




// let array = [4, 9, 0, 2, 8, 7, 1];

// const secondlargestNumber = (array) => {
//     let largest = -Infinity;
//     let secondLargest = -Infinity;

//     for (let i = 0; i < array.length; i++) {

//         if (array[i] > largest) {
//             largest = array[i];
//         };

//         if (array[i] < largest && array[i] > secondLargest) {
//             secondLargest = array[i];
//         };
//     };

//     return secondLargest;

// };

// let result = secondlargestNumber(array);
// console.log(result);




// let array = [4, 9, 0, 2, 8, 7, 1];
// let array = [0, 3, 5, 2, 7, 9];
let array = [0, 3, 5, 2, 7, 9, 9, 10, 10, 10];
// let array = [4, 4, 4, 4];
// let array = [5];
// let array = [10, 20];
// let array = [];

const secondlargestNumber = (array) => {

    if (array.length < 2) {
        return "Array should have at least two numbers"
    };

    let largest = -Infinity;
    let secondLargest = -Infinity;

    for (let i = 0; i < array.length; i++) {

        if (array[i] > largest) {
            secondLargest = largest
            largest = array[i];

        } else if (array[i] > secondLargest && array[i] !== largest) {
            secondLargest = array[i];
        };
    };

    return secondLargest === -Infinity ? "No second largest found" : secondLargest;

};

// let result = secondlargestNumber(array);
// console.log(result);





// Loop within a Loop

for (let i = 5; i > 0; i--) {

    for (let j = 0; j < i; j++) {

        console.log("i => ", i, "j => ", j);

    }
    console.log("--------------------------");
}



// ** Notes : -
/*
1. The "One and Done" Rule of return

Takeaway: A function can only execute a return statement once per call.

The Trap: Putting a return inside a for loop stops the loop completely on the very first match.

Rule: If you need to find multiple items, never use a plain return inside the loop. Use it only after the loop finishes.


2. Output vs. Delivery (console.log vs. return)

Takeaway: console.log is just a mirror; it shows a value on the screen but your program cannot use it. return is a delivery truck; it hands the data over to another variable or function.

Rule: If the question says "print", use console.log. If it says "return", you must use the return keyword.


3. The "Bucket" Strategy for Multiple Values

Takeaway: If a function needs to return multiple individual items (like 10, 2, and 6), it needs a container (a "bucket") to carry them out together.

Rule: Initialize an empty array ([]) or string ("") before the loop, collect the items inside the loop, and return that container after the loop ends.


4. Code Execution Flow (The Exit Door)

Takeaway: Think of return as the emergency exit door of a function. The moment the computer steps through it, the function collapses, variables inside it are deleted, and no further lines of code in that function are read.


5. Advanced Alternative: Streams over Buckets

Takeaway: If you absolutely cannot use an array/bucket but still need multiple values returned one by one, you must switch from a standard function to a Generator Function using the yield keyword.


*/










