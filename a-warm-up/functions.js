function sayMyName() {
    console.log("Abhishek Shakya");

};

sayMyName();
console.log("---------------------");

function greet(name) {
    console.log(`Namaste, ${name}`);

}

greet("Aman");
greet("Suraj");
console.log("---------------------");

function sum(a, b) {
    let result = a + b;
    console.log(result);

};

sum(2, 6);
console.log("---------------------");

function square(x) {
    let result = x * x;
    return result;      // yes sirf function se return krega value ko print nhi.
};

square(8);
console.log("---------------------");

let returnedValue = square(99);
console.log(returnedValue);

let b = 20;
console.log(returnedValue + b);

console.log("---------------------");

console.log(square(8));
console.log("---------------------");




const elegibilityToVote = (age) => {

    if (age < 0) {
        console.log("Invalid age");

    } else if (age < 18) {
        console.log("Not eligible to vote");

    } else {
        console.log("Eligible to Vote");

    }
};

elegibilityToVote(11);
elegibilityToVote(21);
elegibilityToVote(-1);
console.log("---------------------");



const evenOrOdd = (num) => {

    if (num % 2 === 0) {
        console.log("The number is Even");

    }
    else {
        console.log("The number is Odd");

    }
};

evenOrOdd(18);
evenOrOdd(11);


// ** Notes :-

// 1) Mod / Modulo % return krta hai Remainder ko





