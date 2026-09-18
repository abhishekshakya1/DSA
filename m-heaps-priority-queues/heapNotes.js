/* ============================================================================
 * 📂 FOUNDATION STUDY NOTES: HEAPS & PRIORITY QUEUES (INVARIANTS & CONCEPTS)
 * ============================================================================
 * 📘 WHAT IS A HEAP?
 * - A Heap is a specialized tree-based data structure that satisfies the
 *   "Heap Property" and is ALWAYS a Complete Binary Tree (CBT).
 * - It is primarily used to implement Priority Queues, where elements are
 *   retrieved based on their priority (highest or lowest) rather than FIFO order.
 *
 * 🚨 THE TWO TYPES OF HEAPS (CRITICAL PROPERTY):
 * 1. Max-Heap: The value of the parent node is ALWAYS greater than or equal
 *              to the values of its children. The absolute MAXIMUM value
 *              is always sitting at the Root.
 * 2. Min-Heap: The value of the parent node is ALWAYS less than or equal
 *              to the values of its children. The absolute MINIMUM value
 *              is always sitting at the Root.
 * ============================================================================
 */

/* ============================================================================
 * 🌲 THE STRUCTURAL INVARIANT: COMPLETE BINARY TREE (CBT)
 * ============================================================================
 * - A Binary Tree is complete if ALL levels are completely filled except
 *   possibly the last level, and the last level has all nodes as far LEFT as possible.
 * - Why this matters: Because a Heap is a CBT, it does NOT use node pointers
 *   (left/right pointers like Binary Trees). It is completely simulated inside
 *   a standard **Sequential Array**, saving massive pointer memory overhead!
 * ============================================================================
 */

/* ============================================================================
 * 📊 THE ARRAY REPRESENTATION FORMULA (ZERO-BASED INDEXING)
 * ============================================================================
 * If a heap node is stored at index `i` inside a flat array:
 * | Target Node Position   | Mathematical Array Index Formula                |
 * |------------------------|-------------------------------------------------|
 * | Parent Node            | index = Math.floor((i - 1) / 2)                 |
 * | Left Child Node        | index = (2 * i) + 1                             |
 * | Right Child Node       | index = (2 * i) + 2                             |
 * ============================================================================
 */

/* ============================================================================
 * ⏱️ ALGORITHMIC COMPLEXITY MATRIX
 * ============================================================================
 * | Heap Operation         | Time Complexity | Why it happens                |
 * |------------------------|-----------------|-------------------------------|
 * | Get Max / Get Min      | O(1)            | Element is always at index 0  |
 * | Insert Element         | O(log N)        | Element bubbles up the height |
 * | Delete Root (Pop)      | O(log N)        | Last element shifts down      |
 * | Heapify (Build Heap)   | O(N)            | Optimal bottom-up building    |
 * ============================================================================
 */

/* ============================================================================
 * 🧠 INTERVIEW PATTERN RECOGNITION (जब क्वेश्चन देखते ही हीप पहचानना हो)
 * ============================================================================
 * 1. "K-th" Element Invariant:
 *    - जब भी सवाल में "Find the Kth Largest", "Kth Smallest", या "K Closest" पूछा जाए,
 *      तो समझ जाओ वहां Heap 100% फिट बैठेगा।
 *
 * 2. Dynamic Sorting:
 *    - अगर डेटा लगातार स्ट्रीम हो रहा है (Continuous Stream) और आपको हर कदम पर
 *      मैक्सिमम या मिनिमम एलिमेंट चाहिए, तो Sorting [O(N log N)] के बजाय Heap [O(log N)] लगाओ।
 * ============================================================================
 */

/* ============================================================================
 * ⚠️ THE JAVASCRIPT CAVEAT (जावास्क्रिप्ट का सबसे बड़ा सिरदर्द)
 * ============================================================================
 * - Java (PriorityQueue), C++ (std::priority_queue), और Python (heapq) में Heap
 *   पहले से इन-बिल्ट आता है।
 * - लेकिन **JavaScript में कोई इन-बिल्ट Heap डेटा स्ट्रक्चर नहीं होता!**
 * - इंटरव्यू में आपको या तो एरे इंडेक्सिंग फ़ॉर्मूले का इस्तेमाल करके खुद का एक छोटा
 *   MinHeap/MaxHeap क्लास स्क्रैच से लिखना पड़ता है, या फिर इंटरव्यूअर एरे के
 *   ऊपर ही हीप एलीमेंट ऑपरेशन को मैन्युअली ड्राई-रन करवा कर चेक करता है।
 * ============================================================================
 */
