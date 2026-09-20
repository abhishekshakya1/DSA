/* ============================================================================
 * 🎯 MASTER FOUNDATION STUDY NOTES: GRAPH TERMINOLOGIES & INVARIANTS
 * ============================================================================
 * 📋 WHAT IS A GRAPH?
 * - A Graph is a non-linear data structure consisting of a finite set of
 *   Nodes/Vertices connected by a set of links called Edges.
 * - Equation: G = (V, E) where V = Vertices, E = Edges.
 * ============================================================================
 */

/* ============================================================================
 * 📂 THE CORE TERMINOLOGIES W/ PRACTICAL REAL-WORLD EXAMPLES
 * ============================================================================
 *
 * 1. Vertex (plural: Vertices) / Node
 *    - Definition: The fundamental structural unit or individual data point in a graph.
 *    - Real-World Example: In LinkedIn, a Vertex is a User Profile. In Google Maps,
 *      a Vertex is a City or an Intersection.
 *
 * 2. Edge / Link
 *    - Definition: The connection line between two vertices. It represents a
 *      relationship or a physical path between them.
 *    - Real-World Example: In Facebook, an Edge is a Friendship bond between two users.
 *      In flight networks, an Edge is a direct Flight Route between two airports.
 *
 * 3. Path
 *    - Definition: A sequence of unique vertices connected by edges that allows you
 *      to travel from a starting Vertex 'A' to an ending Vertex 'B'.
 *    - Real-World Example: If you travel from Delhi -> Mumbai -> Bangalore via train,
 *      the entire route taken is a Path.
 *
 * 4. Cycle
 *    - Definition: A closed path that starts and ends at the exact same vertex,
 *      without repeating any other vertices or edges along the way.
 *    - Real-World Example: A round-trip flight package that takes you from
 *      Delhi -> Goa -> Mumbai -> Delhi forms a Cycle.
 *
 * 5. Degree of a Vertex
 *    - Definition: The total number of edges directly connected to a specific vertex.
 *    - In-Degree (Directed Graph): Number of incoming edges pointing towards the node.
 *    - Out-Degree (Directed Graph): Number of outgoing edges pointing away from the node.
 *    - Real-World Example: On Instagram, your "Followers" count represents your In-Degree,
 *      and your "Following" count represents your Out-Degree.
 * ============================================================================
 */

/* ============================================================================
 * 🚨 THE GRAPH CLASSIFICATION BLUEPRINT (ग्राफ के प्रकार)
 * ============================================================================
 *
 * 1. Directed vs Undirected Graph
 *    - Undirected Graph: Edges are bidirectional (two-way). If A is linked to B,
 *      B is automatically linked to A.
 *      * Example: Facebook (If A is friends with B, B is friends with A).
 *    - Directed Graph (Digraph): Edges have a strict arrow direction (one-way).
 *      * Example: Twitter/Instagram (A can follow B, but B might not follow A).
 *
 * 2. Weighted vs Unweighted Graph
 *    - Weighted Graph: Every edge has a numeric value/cost/weight assigned to it.
 *      * Example: Google Maps (Edges between cities have weights like "250 km" or "5 hours").
 *    - Unweighted Graph: All edges are treated equally with no numeric cost (implicit cost = 1).
 *      * Example: A basic mutual-friends network.
 *
 * 3. Connected vs Disconnected Graph
 *    - Connected Graph: You can reach *any* vertex from *any* other vertex via some path.
 *    - Disconnected Graph: The graph is broken into isolated chunks (Connected Components).
 *      * Example: The global internet network is a Connected Graph. But if an under-sea cable
 *        snaps and isolates an island completely, the global graph becomes a Disconnected Graph.
 * ============================================================================
 */

/* ============================================================================
 * 📊 GRAPH REPRESENTATION MATRIX (मेमोरी में स्टोर करने का तरीका)
 * ============================================================================
 * | Feature Matrix        | Adjacency Matrix (2D Array) | Adjacency List (Map/Array of Lists) |
 * |-----------------------|-----------------------------|-------------------------------------|
 * | Storage Space         | O(V^2)                      | O(V + E) [Highly Space Efficient]  |
 * | Check Edge (U -> V)   | O(1) [Immediate lookup]     | O(V) [Must scan neighbor bucket]   |
 * | Find All Neighbors    | O(V) [Must scan full row]   | O(Degree of V) [Direct access]     |
 * | Practical Preference  | Bad for sparse graphs       | Absolute King for Production/Interviews|
 * ============================================================================
 */

/* ============================================================================
 * ⚠️ THE `VISITED` SET SHIELD INVARIANT (सबसे जरूरी इंटरव्यू पॉइंट)
 * ============================================================================
 * - Trees में हम हमेशा ऊपर से नीचे जाते हैं, इसलिए वहां कभी इनफिनिट लूप का डर नहीं होता।
 * - लेकिन Graphs में Cycles (लूप्स) होने की वजह से, अगर हम विज़िट किए गए नोड्स को
 *   ट्रैक नहीं करेंगे, तो हमारा ट्रैवर्सल एल्गोरिदम हमेशा के लिए एक Infinite Loop में
 *   फंस जाएगा और कॉल स्टैक/मेमोरी क्रैश कर देगा (`Maximum call stack size exceeded`)।
 * - इसके लिए हम हमेशा एक `visited` Set या Array रखते हैं। किसी भी नोड पर आगे कदम
 *   बढ़ाने से पहले हम चेक करते हैं: `if (visited.has(neighbor)) continue;`
 * ============================================================================
 */
