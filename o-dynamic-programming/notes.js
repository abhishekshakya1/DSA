/* ============================================================================
 * 🎯 FOUNDATION STUDY NOTES: 1D DYNAMIC PROGRAMMING (THE LEAN MODEL)
 * ============================================================================
 * 📘 WHAT IS DYNAMIC PROGRAMMING (DP)?
 * - Dynamic Programming is an algorithmic optimization technique used to solve
 *   complex problems by breaking them down into simpler subproblems.
 * - Simple Equation: DP = Recursion + Storage (Memorization)
 * - Core Strategy: Those who cannot remember the past are condemned to repeat it.
 *   हम पुराने सबप्रॉब्लम्स के आंसर्स को स्टोर कर लेते हैं ताकि उन्हें दोबारा
 *   कैलकुलेट करने में कीमती CPU साइकिल्स बर्बाद न हों!
 * ============================================================================
 */

/* ============================================================================
 * 🚨 THE TWO CONDITIONS FOR APPLYING DP (जब इंटरव्यू में DP पहचानना हो)
 * ============================================================================
 * 1. Overlapping Subproblems:
 *    - जब बड़ा प्रॉब्लम सॉल्व करते हुए छोटे-छोटे सबप्रॉब्लम्स बार-बार रिपीट हों
 *      (e.g., Fibonacci में f(3) को बार-बार कैलकुलेट करना)।
 *
 * 2. Optimal Substructure:
 *    - जब बड़े प्रॉब्लम का एब्सोल्यूट बेस्ट (Optimal) सॉल्यूशन, उसके छोटे-छोटे
 *      सबप्रॉब्लम्स के ऑप्टिमल सॉल्यूशंस को मिलाकर निकाला जा सके।
 * ============================================================================
 */

/* ============================================================================
 * 📊 THE TWO STRATEGIES OF DP (सॉल्व करने के दो अचूक तरीके)
 * ============================================================================
 * | Feature Matrix        | Top-Down Approach (Memoization) | Bottom-Up Approach (Tabulation) |
 * |-----------------------|---------------------------------|---------------------------------|
 * | Core Logic            | Recursion से शुरू होकर नीचे जाना| Loops का यूज़ करके ऊपर बढ़ना     |
 * | Dynamic Memory        | Uses a DP array + Call Stack    | Uses a flat DP array only       |
 * | Space Overhead        | O(N) Array + O(N) Stack Frames  | O(N) Array [No stack overhead] |
 * | Intuition / Ease      | Highly intuitive (Natural)      | Requires slight base state logic|
 * ============================================================================
 */

/* ============================================================================
 * 🧠 THE 3-STEP FORMULA TO MASTER 1D DP ( कोड करने की ट्रिक)
 * ============================================================================
 * 1. Identify Recursive State:
 *    - सबसे पहले नॉर्मल रिकर्शन सोचो (e.g., `f(n) = f(n-1) + f(n-2)`).
 *
 * 2. Apply Memoization (Top-Down):
 *    - एक `dp` एरे बनाओ। रिकर्सिव फ़ंक्शन के टॉप पर चेक करो: `if (dp[n] !== -1) return dp[n];`
 *    - रिटर्न करने से पहले वैल्यू स्टोर करो: `return dp[n] = calculation;`
 *
 * 3. Convert to Tabulation (Bottom-Up):
 *    - रिकर्शन को हटाओ, एक `dp` एरे बनाओ, बेस केसेस फिल करो (e.g., `dp[0]=0, dp[1]=1`),
 *      और साधारण `for` लूप चलाकर आगे का एरे भर दो।
 * ============================================================================
 */


