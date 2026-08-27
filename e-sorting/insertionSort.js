// Insertion sort

const insertionSort = (arr) => {
    let n = arr.length;

    for (let i = 1; i < n; i++) {
        let curr = arr[i];
        let prev = i - 1;

        while (prev >= 0 && arr[prev] > curr) {

                arr[prev + 1] = arr[prev];
                prev--;
            }
         arr[prev + 1] = curr;
    }
    return arr;
};

let arr = [7, 4, 3, 5, 1, 2];
let result = insertionSort(arr);
console.log(result);

/*
Notes :-

* Time Complexity:
   Best Case - O(n) Already Sorted.
   Average Case: O(n2)
   Worst Case: O(n2)
    Every element has to be compared and shifted back to the start.

* Space Complexity: O(1)
    No extra array is used; sorting is done in-place.
    
*/
