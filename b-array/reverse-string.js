/*
Problem statement -
Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.



Example 1:
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]

Example 2:
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]


Constraints:
* 1 <= s.length <= 105
* s[i] is a printable ascii character.


## Solve on leetcode --> https://leetcode.com/problems/reverse-string/description/

*/

const reverseString = (s) => {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {

        let temp = s[left];
        s[left] = s[right];
        s[right] = temp;

        left++;
        right--;
    }
    console.log(s);

};

let string = ["h", "e", "l", "l", "o"];
reverseString(string);

/*
Notes :-

Time complexity = O(n)
Space complexity = O(1)

** Approach used is Two Pointers

*/



