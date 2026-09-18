/* ============================================================================
 * 🎯 HEAP SORT ALGORITHM (IN-PLACE MAX-HEAP SORTING MODEL)
 * ============================================================================
 * 📋 CODE SUMMARY:
 * - A high-performance, unstable, comparison-based sorting algorithm.
 * - Utilizes an in-place Max-Heap blueprint directly within the input array.
 * - Entirely avoids auxiliary array allocations, operating at strict O(1) space.
 *
 * 📂 ALGORITHM WORKING STEPS (बिना कोड के याद रखने के लिए आसान गाइड):
 * 1. STEP 1: BUILD MAX-HEAP (एरे को हीप में बदलो)
 *    - सबसे पहले हम पूरे अनसॉर्टेड एरे को एक 'Max-Heap' के ढांचे में बदलते हैं।
 *    - इसके लिए हम एरे के आधे इंडेक्स (Math.floor(n/2) - 1) से शुरू करके पीछे
 *      इंडेक्स 0 तक जाते हैं और हर नोड पर 'heapifyDown' चलाते हैं।
 *    - इस स्टेप के खत्म होते ही एरे का सबसे बड़ा एलिमेंट इंडेक्स 0 (रूट) पर आ जाता है।
 *
 * 2. STEP 2: SWAP & SHRINK (सबसे बड़े को पीछे भेजो और हीप छोटा करो)
 *    - अब हम एक लूप चलाते हैं जो एरे के अंत (index n-1) से शुरू होकर आगे इंडेक्स 1 तक आता.
 *    - हर बार हम इंडेक्स 0 (जो सबसे बड़ा नंबर है) को एरे के आखिरी उपलब्ध इंडेक्स से स्वैप (Swap) कर देते हैं।
 *    - स्वैप करते ही सबसे बड़ा नंबर अपनी सही जगह (पीछे) पहुँच जाता है। अब हम हीप का साइज 1 घटा देते हैं।
 *
 * 3. STEP 3: HEAL THE HEAP (रूट को दोबारा सही जगह पहुँचाओ)
 *    - स्वैप के बाद इंडेक्स 0 पर कोई छोटा नंबर आ जाता है। हीप की प्रॉपर्टी को दोबारा ठीक करने के लिए
 *      हम इंडेक्स 0 पर फिर से 'heapifyDown' चलाते हैं।
 *    - यह प्रोसेस बार-बार तब तक चलती है जब तक पूरा एरे छोटे से बड़े (Ascending Order) में सॉर्ट नहीं हो जाता।
 * ============================================================================
 */

let arr = [4, 10, 3, 5, 1];

/**
 * @param {number[]} arr
 * @returns {number[]}
 */
const heapSort = (arr) => {
    let n = arr.length;

    // STEP 1: Build Max-Heap (O(N) operations)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapifyDown(arr, i, n);
    }

    // STEP 2 & 3: Swap, Shrink and Heapify (O(N log N) operations)
    for (let i = n - 1; i > 0; i--) {
        // Swap current root to the sorted partition at the back
        [arr[0], arr[i]] = [arr[i], arr[0]];

        // Call heapifyDown on the reduced heap boundary to pull the next max to index 0
        heapifyDown(arr, 0, i);
    }
    return arr;
};

const heapifyDown = (arr, i, n) => {
    let largest = i;
    let left = (2 * i) + 1;
    let right = (2 * i) + 2;

    // Check if the left child is larger than the current largest node
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // Check if the right child is larger than the current largest node
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // If the largest is not the current root node, swap and cascade down
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapifyDown(arr, largest, n); // Recursive adjustment down the branch
    }
};

// --- Execution & Testing ---
console.log("--- Testing In-Place Heap Sort Algorithm ---");
const sortedArray = heapSort(arr);
console.log("Sorted Array: ", sortedArray); // Output: [1, 3, 4, 5, 10]


/* ============================================================================
 * 📂 MATRIX & INTERVIEW INVARIANTS
 * ============================================================================
 * | Scenario / Metrics    | Time Complexity | Space Complexity (Auxiliary)  |
 * |------------------------|-----------------|-------------------------------|
 * | Best Case              | O(N log N)      | O(1) [Pure In-Place]          |
 * | Average Case           | O(N log N)      | O(1) [Pure In-Place]          |
 * | Worst Case             | O(N log N)      | O(1) [Pure In-Place]          |
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - Pure O(1) Space Invariant: Heap Sort एक विशुद्ध In-place एल्गोरिदम है। क्योंकि
 *   इनपुट एरे के बाहर कोई नया स्ट्रक्चर नहीं बनता, इसकी Space Complexity हमेशा O(1) होती है।
 *   इंटरव्यूअर को बताएं कि `heapifyDown` को `while` लूप से लिखकर स्टैक फ्रेम भी O(1) रखा जा सकता है।
 * - Why starting at Math.floor(n / 2) - 1? In a Complete Binary Tree, all nodes
 *   beyond this index are leaf nodes. Leaf nodes do not have children, so running
 *   heapifyDown on them is redundant. We save half the processing time!
 * - Max-Heap vs Sorting Order: Always remember, Ascending Order (छोटे से बड़ा) में
 *   सॉर्ट करने के लिए **Max-Heap** बनाया जाता है, और Descending Order के लिए **Min-Heap**।
 * - Array Destructuring Swap: Utilizing `[a, b] = [b, a]` provides a clean, syntax-safe alternative
 *   to manual temporary variable swaps inside JavaScript runtimes.
 * - Stability Pitfall: Heap Sort is NOT stable. The pointer swapping across long intervals
 *   can distort the original sequence of duplicate items.
 * ============================================================================
 */
