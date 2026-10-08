/*
Problem statement -
The beauty of a string is the difference in frequencies between the most frequent and least frequent characters.

For example, the beauty of "abaacc" is 3 - 1 = 2.

Given a string s, return the sum of beauty of all of its substrings.


Example 1:
Input: s = "aabcb"
Output: 5
Explanation: The substrings with non-zero beauty are ["aab","aabc","aabcb","abcb","bcb"], each with beauty equal to 1.


Example 2:
Input: s = "aabcbaa"
Output: 17


Constraints:
-> 1 <= s.length <= 500
-> s consists of only lowercase English letters.


## Solve on leetcode -> https://leetcode.com/problems/sum-of-beauty-of-all-substrings/description/

*/


/**
 * @param {string} s
 * @return {number}
 */
const beautySum = (s) => {
    let sumOfBeauty = 0;

    for (let i = 0; i < s.length; i++) {
        let freq = new Array(26).fill(0);

        for (let j = i; j < s.length; j++) {
            let index = s.charCodeAt(j) - "a".charCodeAt(0);
            freq[index]++;

            let max = 0;
            let min = Infinity;
            for (let k = 0; k < 26; k++) {
                if (freq[k] > 0) {
                     max = Math.max(max, freq[k]);
                     min = Math.min(min, freq[k]);
                }
            }

            sumOfBeauty += (max - min);
        }
    }
    return sumOfBeauty;
};

let s = "aabcbaa";
let result = beautySum(s);
console.log(result);


/*
Notes :-

## Time Complexity

The time complexity of this code is O(n^2), where n is the length of the string s.

• Substring Generation: The nested loops (i and j) explore every possible substring. The outer loop runs n times, and the inner loop runs an average of n/2 times, resulting in O(n^2) iterations.

• Frequency Evaluation: Inside the inner loop, the code iterates through a fixed array of size 26 (k loop) to find the max and min frequencies. Because 26 is a constant, this inner check takes O(1) constant time.

• Total Time: O(n^2) * O(1) = O(n^2).


## Space Complexity

The space complexity of this code is O(1) (Constant Space).

• Fixed Array Size: The code allocates a frequency array freq of a fixed size of 26 elements (representing the lowercase English
alphabet) during each iteration of the outer loop.

• No Scalable Memory: The memory required by the array does not grow, regardless of whether the input string has 7 characters or 50,000 characters.

*/