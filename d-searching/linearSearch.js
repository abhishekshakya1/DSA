// Linear Search
const linerSearch = (arr, target) => {

    for (let i = 0; i < arr.length; i++) {

        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
};

let arr = [4, 9, 1, 0, 2];
let result = linerSearch(arr, 10);
console.log(result);

/*
Notes :-

* Time Complexity: O(n)
where n is the size of the array.

In the worst case, the algorithm traverses the entire array.

Each element is checked exactly once.


* Space Complexity: O(1)
Constant Space

*/
