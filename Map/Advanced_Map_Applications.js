// =============================================================================
// DSA MAP - ADVANCED APPLICATIONS
// Complex Data Structures and Algorithms
// =============================================================================

console.log("=== DSA MAP - ADVANCED APPLICATIONS ===");

// =============================================================================
// 1. LRU CACHE IMPLEMENTATION
// =============================================================================

console.log("\n--- 1. LRU CACHE IMPLEMENTATION ---");

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }

        // Move to end (most recently used)
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            // Update existing
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            // Remove least recently used (first item)
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }

        this.cache.set(key, value);
    }

    display() {
        console.log("LRU Cache contents:");
        for (const [key, value] of this.cache) {
            console.log(`  ${key}: ${value}`);
        }
    }
}

// Test LRU Cache
const lruCache = new LRUCache(3);
lruCache.put(1, 'A');
lruCache.put(2, 'B');
lruCache.put(3, 'C');
lruCache.display();

console.log("Get 1:", lruCache.get(1)); // Access 1, moves to end
lruCache.display();

lruCache.put(4, 'D'); // Evicts 2 (least recently used)
lruCache.display();

// =============================================================================
// 2. GRAPH ADJACENCY LIST WITH MAP
// =============================================================================

console.log("\n--- 2. GRAPH ADJACENCY LIST WITH MAP ---");

class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }

    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    addEdge(vertex1, vertex2) {
        this.addVertex(vertex1);
        this.addVertex(vertex2);
        
        this.adjacencyList.get(vertex1).push(vertex2);
        this.adjacencyList.get(vertex2).push(vertex1); // Undirected graph
    }

    getNeighbors(vertex) {
        return this.adjacencyList.get(vertex) || [];
    }

    display() {
        console.log("Graph Adjacency List:");
        for (const [vertex, neighbors] of this.adjacencyList) {
            console.log(`${vertex} -> [${neighbors.join(', ')}]`);
        }
    }

    // BFS traversal
    bfs(startVertex) {
        const visited = new Set();
        const queue = [startVertex];
        const result = [];

        visited.add(startVertex);

        while (queue.length > 0) {
            const vertex = queue.shift();
            result.push(vertex);

            const neighbors = this.getNeighbors(vertex);
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }

        return result;
    }

    // DFS traversal
    dfs(startVertex) {
        const visited = new Set();
        const result = [];

        const dfsHelper = (vertex) => {
            if (visited.has(vertex)) return;
            
            visited.add(vertex);
            result.push(vertex);

            const neighbors = this.getNeighbors(vertex);
            for (const neighbor of neighbors) {
                dfsHelper(neighbor);
            }
        };

        dfsHelper(startVertex);
        return result;
    }
}

// Test Graph
const graph = new Graph();
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'D');
graph.addEdge('D', 'E');

graph.display();
console.log("BFS from A:", graph.bfs('A'));
console.log("DFS from A:", graph.dfs('A'));

// =============================================================================
// 3. DICTIONARY / THESAURUS IMPLEMENTATION
// =============================================================================

console.log("\n--- 3. DICTIONARY / THESAURUS IMPLEMENTATION ---");

class Thesaurus {
    constructor() {
        this.wordMap = new Map();
    }

    addWord(word, synonyms) {
        if (this.wordMap.has(word)) {
            // Add to existing synonyms
            const existingSynonyms = this.wordMap.get(word);
            const newSynonyms = [...new Set([...existingSynonyms, ...synonyms])];
            this.wordMap.set(word, newSynonyms);
        } else {
            this.wordMap.set(word, synonyms);
        }

        // Add reverse mapping
        for (const synonym of synonyms) {
            if (!this.wordMap.has(synonym)) {
                this.wordMap.set(synonym, []);
            }
            if (!this.wordMap.get(synonym).includes(word)) {
                this.wordMap.get(synonym).push(word);
            }
        }
    }

    getSynonyms(word) {
        return this.wordMap.get(word) || [];
    }

    areSynonyms(word1, word2) {
        return this.getSynonyms(word1).includes(word2);
    }

    getAllWords() {
        return [...this.wordMap.keys()];
    }

    displayWord(word) {
        const synonyms = this.getSynonyms(word);
        console.log(`${word}: [${synonyms.join(', ')}]`);
    }
}

// Test Thesaurus
const thesaurus = new Thesaurus();
thesaurus.addWord('happy', ['joyful', 'cheerful', 'glad']);
thesaurus.addWord('sad', ['unhappy', 'sorrowful', 'depressed']);
thesaurus.addWord('joyful', ['elated', 'ecstatic']);

thesaurus.displayWord('happy');
thesaurus.displayWord('joyful');
console.log("Are 'happy' and 'joyful' synonyms?", thesaurus.areSynonyms('happy', 'joyful'));

// =============================================================================
// 4. MULTIKEY MAP (COMPOSITE KEYS)
// =============================================================================

console.log("\n--- 4. MULTIKEY MAP (COMPOSITE KEYS) ---");

class MultiKeyMap {
    constructor() {
        this.map = new Map();
    }

    // Create composite key
    _createKey(...keys) {
        return JSON.stringify(keys);
    }

    set(...args) {
        const value = args.pop();
        const key = this._createKey(...args);
        this.map.set(key, value);
    }

    get(...keys) {
        const key = this._createKey(...keys);
        return this.map.get(key);
    }

    has(...keys) {
        const key = this._createKey(...keys);
        return this.map.has(key);
    }

    delete(...keys) {
        const key = this._createKey(...keys);
        return this.map.delete(key);
    }

    clear() {
        this.map.clear();
    }

    size() {
        return this.map.size;
    }
}

// Test MultiKeyMap
const multiMap = new MultiKeyMap();
multiMap.set('user', 'session', 'token', 'abc123');
multiMap.set('user', 'session', 'timeout', 3600);
multiMap.set('api', 'endpoint', '/users', 'GET');

console.log("User session token:", multiMap.get('user', 'session', 'token'));
console.log("API endpoint method:", multiMap.get('api', 'endpoint', '/users'));
console.log("Has user session:", multiMap.has('user', 'session'));

// =============================================================================
// 5. WEAKMAP FOR PRIVATE DATA
// =============================================================================

console.log("\n--- 5. WEAKMAP FOR PRIVATE DATA ---");

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        
        // Private data using WeakMap
        privateData.set(this, {
            ssn: '123-45-6789',
            salary: 50000,
            secrets: ['loves JavaScript', 'hates bugs']
        });
    }

    getPrivateData() {
        return privateData.get(this);
    }

    updateSalary(newSalary) {
        const data = privateData.get(this);
        data.salary = newSalary;
        privateData.set(this, data);
    }
}

const privateData = new WeakMap();

const john = new Person('John', 30);
const jane = new Person('Jane', 25);

console.log("John's private data:", john.getPrivateData());
john.updateSalary(60000);
console.log("John's updated salary:", john.getPrivateData().salary);

// WeakMap doesn't prevent garbage collection
console.log("WeakMap size:", privateData.has(john)); // true

// =============================================================================
// 6. PERFORMANCE COMPARISON
// =============================================================================

console.log("\n--- 6. PERFORMANCE COMPARISON ---");

// Map vs Object performance test
const iterations = 100000;

// Test Map performance
console.time("Map insertion");
const testMap = new Map();
for (let i = 0; i < iterations; i++) {
    testMap.set(i, `value${i}`);
}
console.timeEnd("Map insertion");

console.time("Map lookup");
for (let i = 0; i < iterations; i++) {
    testMap.get(i);
}
console.timeEnd("Map lookup");

// Test Object performance
console.time("Object insertion");
const testObj = {};
for (let i = 0; i < iterations; i++) {
    testObj[i] = `value${i}`;
}
console.timeEnd("Object insertion");

console.time("Object lookup");
for (let i = 0; i < iterations; i++) {
    testObj[i];
}
console.timeEnd("Object lookup");

// =============================================================================
// 7. REAL-WORLD APPLICATION: SHOPPING CART
// =============================================================================

console.log("\n--- 7. REAL-WORLD APPLICATION: SHOPPING CART ---");

class ShoppingCart {
    constructor() {
        this.items = new Map(); // productId -> {product, quantity, price}
        this.discounts = new Map(); // discountCode -> {percentage, minAmount}
    }

    addItem(product, quantity = 1) {
        const productId = product.id;
        
        if (this.items.has(productId)) {
            const existingItem = this.items.get(productId);
            existingItem.quantity += quantity;
        } else {
            this.items.set(productId, {
                product: product,
                quantity: quantity,
                price: product.price
            });
        }
    }

    removeItem(productId) {
        this.items.delete(productId);
    }

    updateQuantity(productId, newQuantity) {
        if (this.items.has(productId) && newQuantity > 0) {
            const item = this.items.get(productId);
            item.quantity = newQuantity;
        } else if (newQuantity <= 0) {
            this.removeItem(productId);
        }
    }

    getSubtotal() {
        let subtotal = 0;
        for (const [productId, item] of this.items) {
            subtotal += item.price * item.quantity;
        }
        return subtotal;
    }

    applyDiscount(discountCode) {
        if (this.discounts.has(discountCode)) {
            const discount = this.discounts.get(discountCode);
            const subtotal = this.getSubtotal();
            
            if (subtotal >= discount.minAmount) {
                return subtotal * (1 - discount.percentage / 100);
            }
        }
        return this.getSubtotal();
    }

    addDiscount(discountCode, percentage, minAmount = 0) {
        this.discounts.set(discountCode, { percentage, minAmount });
    }

    getCartSummary() {
        const summary = {
            items: [],
            subtotal: 0,
            totalItems: 0
        };

        for (const [productId, item] of this.items) {
            summary.items.push({
                id: productId,
                name: item.product.name,
                quantity: item.quantity,
                price: item.price,
                total: item.price * item.quantity
            });
            summary.subtotal += item.price * item.quantity;
            summary.totalItems += item.quantity;
        }

        return summary;
    }
}

// Test Shopping Cart
const cart = new ShoppingCart();

const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 29 },
    { id: 3, name: 'Keyboard', price: 79 }
];

cart.addItem(products[0]);
cart.addItem(products[1], 2);
cart.addItem(products[2]);

cart.addDiscount('SAVE10', 10, 500); // 10% off for orders over $500

const summary = cart.getCartSummary();
console.log("Cart Summary:", summary);
console.log("Subtotal:", summary.subtotal);
console.log("With 10% discount:", cart.applyDiscount('SAVE10'));

console.log("\n✅ ADVANCED MAP APPLICATIONS COMPLETE!");
