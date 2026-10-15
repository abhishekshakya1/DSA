/*
Problem statement -
Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.


Example 1:
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".


Example 2:
Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.


Example 3:
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false


Constraints:
-> 1 <= s.length <= 300
-> 1 <= wordDict.length <= 1000
-> 1 <= wordDict[i].length <= 20
-> s and wordDict[i] consist of only lowercase English letters.
-> All the strings of wordDict are unique.


## Solve on leetcode -> https://leetcode.com/problems/word-break/description/

*/

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
const wordBreak = (s, wordDict) => {
    let dp = {};
    let fn = (remS) => {
        if (remS === "") return true;
        if (remS in dp) return dp[remS];
        let res = false;
        for (let i = 0; i < remS.length; i++) {
            let substr = remS.substring(0, i + 1);
            if (wordDict.includes(substr) && fn(remS.substring(i + 1))) {
                res = true;
            }
        }
        return dp[remS] = res;
    }
    return fn(s);
};

let s = "catsandog";
let wordDict = ["cats", "dog", "sand", "and", "cat"];
let result = wordBreak(s, wordDict);
console.log(result);
