/* ============================================================================
 * 🎯 FOUNDATION STUDY NOTES: PRIORITY QUEUES
 * ============================================================================
 * 📋 WHAT IS A PRIORITY QUEUE?
 * - A Priority Queue is an abstract data type (ADT) similar to a regular queue
 *   or stack, but with an added twist: every element has a "priority" attached.
 * - Unlike a standard FIFO (First-In-First-Out) queue, elements are served
 *   based on their priority level, not their arrival order.
 *
 * 🚨 THE TWO MAIN VARIANTS:
 * 1. Max-Priority Queue: The element with the HIGHEST priority value is always
 *                        extracted first (e.g., handling critical server tasks).
 * 2. Min-Priority Queue: The element with the LOWEST priority value is always
 *                        extracted first (e.g., shortest-job-first scheduling).
 * ============================================================================
 */

/* ============================================================================
 * 📊 THE UNDER-THE-HOOD IMPLEMENTATION MATRIX
 * ============================================================================
 * Priority Queues can be built using different underlying data structures.
 * Here is why Binary Heaps are the absolute king for this job:
 *
 * | Underlying Structure   | Insert Time | Extract Max/Min | Peek Time |
 * |------------------------|-------------|-----------------|-----------|
 * | Unsorted Array / List  | O(1)        | O(N)            | O(N)      |
 * | Sorted Array / List    | O(N)        | O(1)            | O(1)      |
 * | Binary Heap (Best)     | O(log N)    | O(log N)        | O(1)      |
 * ============================================================================
 */

/* ============================================================================
 * 🧠 INTERVIEW PATTERN RECOGNITION (रियल-वर्ल्ड प्रैक्टिकल यूज़ केसेस)
 * ============================================================================
 * 1. CPU Task Scheduling:
 *    - ऑपरेटिंग सिस्टम (OS) में जब किसी हाई-प्रायोरिटी टास्क (जैसे माउस क्लिक) को
 *      नॉर्मल बैकग्राउंड प्रोसेस से पहले एग्जीक्यूट करना हो।
 *
 * 2. Dijkstra's Algorithm (Graphs):
 *    - मैप्स (जैसे Google Maps) में शॉर्टेस्ट पाथ ढूंढने के लिए हर कदम पर सबसे
 *      कम दूरी वाले नोड को पहले निकालने के लिए Min-Priority Queue का यूज़ होता है।
 *
 * 3. Data Stream Filtering:
 *    - लगातार आते हुए बड़े लाइव डेटा में से हर सेकंड केवल टॉप 10 सबसे बड़े या
 *      छोटे एलिमेंट्स को ट्रैक करने के लिए।
 * ============================================================================
 */

/* ============================================================================
 * 💡 INTERVIEWER TRAP CHECKLIST (सावधान रहें):
 * - Abstract vs Concrete: हमेशा याद रखें कि Priority Queue एक *Abstract Data Type*
 *   (लॉजिकल मॉडल) है, जबकि Binary Heap उसका एक *Concrete Implementation* (मेमोरी स्ट्रक्चर) है।
 * - JavaScript Custom Rule: चूंकि जावास्क्रिप्ट में यह इन-बिल्ट नहीं होता, इंटरव्यू में
 *   या तो आपको अपनी पिछली 'MinHeap/MaxHeap' क्लास का यूज़ करके इसे मैन्युअली चलाना होगा,
 *   या फिर छोटे इनपुट्स के लिए साधारण सॉर्टेड एरे का यूज़ करना होगा।
 * ============================================================================
 */
