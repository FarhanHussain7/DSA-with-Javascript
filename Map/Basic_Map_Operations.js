// =============================================================================
// DSA MAP - BASIC OPERATIONS
// Most Important Topics and Examples
// =============================================================================

console.log("=== DSA MAP - BASIC OPERATIONS ===");

// =============================================================================
// 1. MAP CREATION AND INITIALIZATION
// =============================================================================

console.log("\n--- 1. MAP CREATION AND INITIALIZATION ---");

// Create empty map
const emptyMap = new Map();
console.log("Empty map:", emptyMap);

// Create map with initial values
const initialMap = new Map([
    ['key1', 'value1'],
    ['key2', 'value2'],
    [3, 'number key']
]);
console.log("Map with initial values:", initialMap);

// Create map from array
const array = [['a', 1], ['b', 2], ['c', 3]];
const fromArray = new Map(array);
console.log("Map from array:", fromArray);

// =============================================================================
// 2. BASIC CRUD OPERATIONS
// =============================================================================

console.log("\n--- 2. BASIC CRUD OPERATIONS ---");

const map = new Map();

// CREATE/UPDATE - set()
map.set('name', 'Alice');
map.set('age', 25);
map.set(42, 'numeric key');
console.log("After set operations:", map);

// UPDATE existing key
map.set('age', 26); // Updates existing value
console.log("After updating age:", map);

// READ - get()
console.log("Get name:", map.get('name')); // 'Alice'
console.log("Get age:", map.get('age'));   // 26
console.log("Get non-existent:", map.get('nonexistent')); // undefined

// CHECK existence - has()
console.log("Has name:", map.has('name'));      // true
console.log("Has non-existent:", map.has('xyz')); // false

// DELETE - delete()
map.delete('age');
console.log("After deleting age:", map);
console.log("Has age after delete:", map.has('age')); // false

// CLEAR all entries
map.clear();
console.log("After clear:", map); // Map(0) {}

// =============================================================================
// 3. SIZE AND ITERATION
// =============================================================================

console.log("\n--- 3. SIZE AND ITERATION ---");

const fruitMap = new Map([
    ['apple', 5],
    ['banana', 3],
    ['orange', 8]
]);

console.log("Map size:", fruitMap.size); // 3

// Iterate using for...of
console.log("Iterating with for...of:");
for (const [key, value] of fruitMap) {
    console.log(`${key}: ${value}`);
}

// Iterate keys only
console.log("Keys only:");
for (const key of fruitMap.keys()) {
    console.log(key);
}

// Iterate values only
console.log("Values only:");
for (const value of fruitMap.values()) {
    console.log(value);
}

// Iterate entries (same as default)
console.log("Entries:");
for (const [key, value] of fruitMap.entries()) {
    console.log(`${key} -> ${value}`);
}

// =============================================================================
// 4. MAP VS OBJECT COMPARISON
// =============================================================================

console.log("\n--- 4. MAP VS OBJECT COMPARISON ---");

const obj = {
    name: 'Bob',
    age: 30,
    'has space': 'value with space key'
};

const mapComparison = new Map([
    ['name', 'Bob'],
    ['age', 30],
    ['has space', 'value with space key']
]);

console.log("Object keys:", Object.keys(obj));
console.log("Map keys:", [...mapComparison.keys()]);

// Key types
obj[42] = 'number key in object';
mapComparison.set(42, 'number key in map');

console.log("Object with number key:", obj);
console.log("Map with number key:", mapComparison);

// Size property
console.log("Object size (calculated):", Object.keys(obj).length);
console.log("Map size property:", mapComparison.size);

// =============================================================================
// 5. WORKING WITH DIFFERENT KEY TYPES
// =============================================================================

console.log("\n--- 5. WORKING WITH DIFFERENT KEY TYPES ---");

const diverseMap = new Map();

// String keys
diverseMap.set('string', 'string value');

// Number keys
diverseMap.set(42, 'number key value');
diverseMap.set(3.14, 'float key value');

// Boolean keys
diverseMap.set(true, 'true key value');
diverseMap.set(false, 'false key value');

// Object keys
const objKey1 = { id: 1 };
const objKey2 = { id: 2 };
diverseMap.set(objKey1, 'object key 1');
diverseMap.set(objKey2, 'object key 2');

// Array keys
const arrKey = [1, 2, 3];
diverseMap.set(arrKey, 'array key');

// Function keys
const funcKey = () => console.log('hello');
diverseMap.set(funcKey, 'function key');

console.log("Map with diverse key types:");
for (const [key, value] of diverseMap) {
    console.log(`Key (${typeof key}):`, key, "-> Value:", value);
}

// Accessing object keys
console.log("Access with object key 1:", diverseMap.get(objKey1));
console.log("Access with array key:", diverseMap.get(arrKey));

// =============================================================================
// 6. PRACTICAL EXAMPLES
// =============================================================================

console.log("\n--- 6. PRACTICAL EXAMPLES ---");

// Example 1: User management system
const userManager = new Map();

function addUser(id, name, email) {
    userManager.set(id, {
        name: name,
        email: email,
        createdAt: new Date(),
        isActive: true
    });
}

function getUser(id) {
    return userManager.get(id);
}

function deactivateUser(id) {
    const user = userManager.get(id);
    if (user) {
        user.isActive = false;
        userManager.set(id, user);
    }
}

// Add users
addUser(1, 'Alice', 'alice@example.com');
addUser(2, 'Bob', 'bob@example.com');
addUser(3, 'Charlie', 'charlie@example.com');

console.log("All users:", [...userManager.entries()]);
console.log("User 2:", getUser(2));

deactivateUser(2);
console.log("User 2 after deactivation:", getUser(2));

// Example 2: Cache implementation
const cache = new Map();

function expensiveCalculation(n) {
    console.log(`Performing expensive calculation for ${n}...`);
    return n * n * n; // Cube calculation
}

function getCachedResult(n) {
    if (cache.has(n)) {
        console.log(`Returning cached result for ${n}`);
        return cache.get(n);
    }
    
    const result = expensiveCalculation(n);
    cache.set(n, result);
    return result;
}

// Test cache
console.log(getCachedResult(5)); // Calculates
console.log(getCachedResult(5)); // From cache
console.log(getCachedResult(10)); // Calculates
console.log(getCachedResult(5)); // From cache

console.log("Cache contents:", [...cache.entries()]);

// Example 3: Frequency counter
function frequencyCounter(arr) {
    const freqMap = new Map();
    
    for (const item of arr) {
        freqMap.set(item, (freqMap.get(item) || 0) + 1);
    }
    
    return freqMap;
}

const numbers = [1, 2, 3, 2, 1, 4, 2, 5, 1];
const frequency = frequencyCounter(numbers);
console.log("Frequency counter:", frequency);

// Example 4: Group by property
function groupBy(array, key) {
    const grouped = new Map();
    
    for (const item of array) {
        const groupKey = item[key];
        if (!grouped.has(groupKey)) {
            grouped.set(groupKey, []);
        }
        grouped.get(groupKey).push(item);
    }
    
    return grouped;
}

const people = [
    { name: 'Alice', department: 'Engineering' },
    { name: 'Bob', department: 'Marketing' },
    { name: 'Charlie', department: 'Engineering' },
    { name: 'Diana', department: 'Marketing' },
    { name: 'Eve', department: 'HR' }
];

const byDepartment = groupBy(people, 'department');
console.log("Grouped by department:");
for (const [dept, employees] of byDepartment) {
    console.log(`${dept}:`, employees.map(e => e.name));
}

// =============================================================================
// 7. MAP METHODS REFERENCE
// =============================================================================

console.log("\n--- 7. MAP METHODS REFERENCE ---");

const referenceMap = new Map([
    ['a', 1],
    ['b', 2],
    ['c', 3]
]);

console.log("Original map:", referenceMap);

// set(key, value) - Add or update
referenceMap.set('d', 4);
console.log("After set('d', 4):", referenceMap);

// get(key) - Retrieve value
console.log("get('b'):", referenceMap.get('b'));

// has(key) - Check existence
console.log("has('c'):", referenceMap.has('c'));

// delete(key) - Remove entry
referenceMap.delete('a');
console.log("After delete('a'):", referenceMap);

// clear() - Remove all entries
// referenceMap.clear();
// console.log("After clear():", referenceMap);

// size - Get number of entries
console.log("Size:", referenceMap.size);

// keys() - Get iterator for keys
console.log("Keys:", [...referenceMap.keys()]);

// values() - Get iterator for values
console.log("Values:", [...referenceMap.values()]);

// entries() - Get iterator for [key, value] pairs
console.log("Entries:", [...referenceMap.entries()]);

// forEach() - Execute function for each entry
console.log("forEach results:");
referenceMap.forEach((value, key) => {
    console.log(`${key} = ${value}`);
});

console.log("\n✅ BASIC MAP OPERATIONS COMPLETE!");
