// Selection sort

const selectionSort = (arr) => {
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {

        let min = i;
        for (let j = i + 1; j < n; j++) {

            if (arr[j] < arr[min]) {
                min = j;
            }
        }

        if (min !== i) {
            let temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }
    return arr;
};

let arr = [7, 1, 5, 4, 3, 2];
let result = selectionSort(arr);
console.log(result);

/*
Notes :-

* Time Complexity: O(n2)

   In all cases best, average and worst.
   Roughly n*(n-1)/2 comparisons are always  performed.


* Space Complexity: O(1)

   Selection Sort is an in-place sorting algorithm, so it doesn’t require extra space
   
*/