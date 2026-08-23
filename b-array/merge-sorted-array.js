/*
Problem statement -
You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Merge nums1 and nums2 into a single array sorted in non-decreasing order.

The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.



Example 1:
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.

Example 2:
Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
Explanation: The arrays we are merging are [1] and [].
The result of the merge is [1].

Example 3:
Input: nums1 = [0], m = 0, nums2 = [1], n = 1
Output: [1]
Explanation: The arrays we are merging are [] and [1].
The result of the merge is [1].
Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.


Constraints:

-> nums1.length == m + n
-> nums2.length == n
-> 0 <= m, n <= 200
-> 1 <= m + n <= 200
-> -109 <= nums1[i], nums2[j] <= 109

## Solve on leetcode --> https://leetcode.com/problems/merge-sorted-array/description/

*/

const merge = (nums1, m, nums2, n) => {

    let p1 = m - 1;
    let p2 = n - 1;

    for (let i = m + n - 1; i >= 0; i--) {

        if (p2 < 0) break;

        if (p1 >= 0 && nums1[p1] > nums2[p2]) {
            nums1[i] = nums1[p1];
            p1--;

        } else {
            nums1[i] = nums2[p2];
            p2--;
        }
    }
    console.log(nums1);

};

let nums1 = [1, 2, 3, 0, 0, 0];
let nums2 = [2, 5, 6];
merge(nums1, 3, nums2, 3);

/*
Notes :-

* Time complexity - O(m+n)

why? -> We iterate through the total length of the merged array exactly once from back to front. Each step performs fixed, constant-time O(1)operations.

* Space complexity - O(1)

why? -> The merging happens directly inside the existing memory space allocated for nums1. No new arrays or data structures are created.


🌟 Pattern Used: Three-Pointer Approach(Back-to-Front)

* Standard Two-Pointer vs. Reverse Two-Pointer: In normal merging (like in Merge Sort), we track elements from index 0. However, doing that here would overwrite elements in nums1.

* The Trick: By exploiting the extra trailing zeros (empty space) at the end of nums1, we position our insertion pointer i at the very end (m + n - 1) and work backward. We compare the largest available elements from both arrays and greedily place the largest one at index i.

💡 Key Interview Takeaways
* Look for Extra Space: Whenever an array question provides pre-allocated "empty space" (like the trailing zeros in nums1), always think about starting your pointers from the end instead of the beginning.

* Early Exit Optimization: Once p2 becomes less than 0, any remaining elements in nums1 do not need to be moved. Your if (p2 < 0) break; line perfectly captures this optimization.

*/