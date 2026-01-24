// =============================================================================
// DSA SET - BASIC OPERATIONS WITH DETAILED COMMENTS
// Understanding Set Data Structure from Scratch
// =============================================================================

console.log("=== DSA SET - BASIC OPERATIONS ===");

// =============================================================================
// 1. WHAT IS A SET? - FUNDAMENTAL CONCEPT
// =============================================================================

console.log("\n--- 1. WHAT IS A SET? FUNDAMENTAL CONCEPT ---");

/*
SET DEFINITION:
A Set is a collection of UNIQUE values. Unlike arrays, sets cannot contain duplicate elements.
Think of it like a mathematical set - each element appears only once.

KEY CHARACTERISTICS:
- Stores only UNIQUE values
- No index-based access (no random access)
- Maintains insertion order (in modern JavaScript)
- Fast O(1) average time for add, delete, has operations
- Can store any type of values (primitives, objects, etc.)
*/

// Creating an empty set
const emptySet = new Set();
console.log("Empty set:", emptySet); // Set(0) {}

// Creating set with initial values
const initialSet = new Set([1, 2, 3, 4, 5]);
console.log("Set with initial values:", initialSet); // Set(5) {1, 2, 3, 4, 5}

// Creating set from string (each character becomes an element)
const stringSet = new Set("hello");
console.log("Set from string 'hello':", stringSet); // Set(4) {'h', 'e', 'l', 'o'}
// Notice: 'l' appears only once because sets store unique values!

// =============================================================================
// 2. BASIC CRUD OPERATIONS
// =============================================================================

console.log("\n--- 2. BASIC CRUD OPERATIONS ---");

const mySet = new Set();

// CREATE/ADD - add() method
console.log("\n--- ADDING ELEMENTS ---");
mySet.add(10);
mySet.add(20);
mySet.add(30);
console.log("After adding 10, 20, 30:", mySet); // Set(3) {10, 20, 30}

// Adding duplicate values (they get ignored)
mySet.add(10); // This won't be added because 10 already exists
mySet.add(20); // This won't be added because 20 already exists
console.log("After trying to add duplicates 10, 20:", mySet); // Still Set(3) {10, 20, 30}

// Adding different data types
mySet.add("hello");
mySet.add(true);
mySet.add(null);
mySet.add(undefined);
console.log("After adding different types:", mySet);

// Adding objects (each object is unique even if they look the same)
const obj1 = { id: 1 };
const obj2 = { id: 1 }; // Different object reference
mySet.add(obj1);
mySet.add(obj2);
console.log("After adding objects:", mySet); // Both objects are added separately

// READ/EXISTS - has() method
console.log("\n--- CHECKING EXISTENCE ---");
console.log("Has 10:", mySet.has(10)); // true
console.log("Has 99:", mySet.has(99)); // false
console.log("Has 'hello':", mySet.has("hello")); // true
console.log("Has obj1:", mySet.has(obj1)); // true
console.log("Has {id: 1}:", mySet.has({ id: 1 })); // false (different object reference)

// DELETE - delete() method
console.log("\n--- DELETING ELEMENTS ---");
console.log("Delete 20:", mySet.delete(20)); // true (element existed and was deleted)
console.log("Delete 99:", mySet.delete(99)); // false (element didn't exist)
console.log("After deleting 20:", mySet); // 20 is removed

// CLEAR - clear() method (removes all elements)
console.log("\n--- CLEARING SET ---");
const tempSet = new Set([1, 2, 3, 4, 5]);
console.log("Before clear:", tempSet);
tempSet.clear();
console.log("After clear:", tempSet); // Set(0) {}

// =============================================================================
// 3. SIZE AND ITERATION
// =============================================================================

console.log("\n--- 3. SIZE AND ITERATION ---");

const iterationSet = new Set(['apple', 'banana', 'orange', 'grape']);

// SIZE property
console.log("Set size:", iterationSet.size); // 4

// ITERATION METHODS
console.log("\n--- ITERATION METHODS ---");

// Method 1: for...of loop (most common)
console.log("Using for...of loop:");
for (const fruit of iterationSet) {
    console.log(`Fruit: ${fruit}`);
}

// Method 2: forEach() method
console.log("\nUsing forEach():");
iterationSet.forEach((value, valueAgain, set) => {
    // Note: forEach passes (value, value, set) for sets (same value twice)
    console.log(`forEach: ${value}`);
});

// Method 3: Using keys() iterator
console.log("\nUsing keys():");
for (const key of iterationSet.keys()) {
    console.log(`Key: ${key}`);
}

// Method 4: Using values() iterator (same as keys() for sets)
console.log("\nUsing values():");
for (const value of iterationSet.values()) {
    console.log(`Value: ${value}`);
}

// Method 5: Using entries() iterator
console.log("\nUsing entries():");
for (const entry of iterationSet.entries()) {
    console.log(`Entry: [${entry[0]}, ${entry[1]}]`); // [value, value] for sets
}

// =============================================================================
// 4. SET VS ARRAY COMPARISON
// =============================================================================

console.log("\n--- 4. SET VS ARRAY COMPARISON ---");

/*
WHEN TO USE SET VS ARRAY:

USE SET WHEN:
- You need to ensure uniqueness of values
- You need fast existence checking (O(1) vs O(n) for arrays)
- You don't need indexed access
- You need to perform set operations (union, intersection, difference)

USE ARRAY WHEN:
- You need ordered access with indices
- You need to store duplicates
- You need array-specific methods (map, filter, reduce, etc.)
- You need to sort elements
*/

const numbersArray = [1, 2, 2, 3, 4, 4, 5];
const numbersSet = new Set(numbersArray);

console.log("Original array:", numbersArray); // [1, 2, 2, 3, 4, 4, 5]
console.log("Array to set (duplicates removed):", numbersSet); // Set(5) {1, 2, 3, 4, 5}

// Performance comparison for existence checking
const largeArray = Array.from({ length: 100000 }, (_, i) => i);
const largeSet = new Set(largeArray);

console.time("Array existence check");
largeArray.includes(99999); // O(n) operation
console.timeEnd("Array existence check");

console.time("Set existence check");
largeSet.has(99999); // O(1) operation
console.timeEnd("Set existence check");

// =============================================================================
// 5. PRACTICAL EXAMPLES
// =============================================================================

console.log("\n--- 5. PRACTICAL EXAMPLES ---");

// Example 1: Remove duplicates from array
function removeDuplicates(arr) {
    return [...new Set(arr)]; // Spread operator converts set back to array
}

const duplicateArray = [1, 2, 2, 3, 4, 4, 5, 5, 5];
const uniqueArray = removeDuplicates(duplicateArray);
console.log("Original with duplicates:", duplicateArray);
console.log("After removing duplicates:", uniqueArray);

// Example 2: Check if all characters in string are unique
function hasUniqueChars(str) {
    const charSet = new Set(str);
    return charSet.size === str.length;
}

console.log("Has unique chars 'hello':", hasUniqueChars("hello")); // false
console.log("Has unique chars 'world':", hasUniqueChars("world")); // true

// Example 3: Find common elements between two arrays
function findCommonElements(arr1, arr2) {
    const set1 = new Set(arr1);
    const common = new Set();
    
    for (const item of arr2) {
        if (set1.has(item)) {
            common.add(item);
        }
    }
    
    return Array.from(common);
}

const array1 = [1, 2, 3, 4, 5];
const array2 = [4, 5, 6, 7, 8];
const commonElements = findCommonElements(array1, array2);
console.log("Common elements:", commonElements); // [4, 5]

// Example 4: Track unique visitors
class WebsiteAnalytics {
    constructor() {
        this.uniqueVisitors = new Set();
        this.pageViews = 0;
    }
    
    trackVisit(visitorId) {
        this.uniqueVisitors.add(visitorId);
        this.pageViews++;
    }
    
    getUniqueVisitorCount() {
        return this.uniqueVisitors.size;
    }
    
    getTotalPageViews() {
        return this.pageViews;
    }
    
    hasVisitor(visitorId) {
        return this.uniqueVisitors.has(visitorId);
    }
}

const analytics = new WebsiteAnalytics();
analytics.trackVisit("user123");
analytics.trackVisit("user456");
analytics.trackVisit("user123"); // Same visitor again
analytics.trackVisit("user789");

console.log("Unique visitors:", analytics.getUniqueVisitorCount()); // 3
console.log("Total page views:", analytics.getTotalPageViews()); // 4
console.log("Has user123 visited:", analytics.hasVisitor("user123")); // true

// Example 5: Simple todo list with unique tasks
class TodoList {
    constructor() {
        this.tasks = new Set();
    }
    
    addTask(task) {
        if (this.tasks.has(task)) {
            console.log(`Task "${task}" already exists!`);
            return false;
        }
        this.tasks.add(task);
        console.log(`Task "${task}" added successfully!`);
        return true;
    }
    
    removeTask(task) {
        if (this.tasks.delete(task)) {
            console.log(`Task "${task}" completed!`);
            return true;
        }
        console.log(`Task "${task}" not found!`);
        return false;
    }
    
    listTasks() {
        console.log("Current tasks:");
        this.tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task}`);
        });
    }
    
    getTaskCount() {
        return this.tasks.size;
    }
}

const todoList = new TodoList();
todoList.addTask("Learn JavaScript");
todoList.addTask("Practice coding");
todoList.addTask("Learn JavaScript"); // Duplicate - won't be added
todoList.listTasks();
console.log("Total tasks:", todoList.getTaskCount());

// =============================================================================
// 6. SET OPERATIONS (MATHEMATICAL)
// =============================================================================

console.log("\n--- 6. SET OPERATIONS (MATHEMATICAL) ---");

// Union (A ∪ B) - All elements from both sets
function union(setA, setB) {
    return new Set([...setA, ...setB]);
}

// Intersection (A ∩ B) - Elements common to both sets
function intersection(setA, setB) {
    return new Set([...setA].filter(x => setB.has(x)));
}

// Difference (A - B) - Elements in A but not in B
function difference(setA, setB) {
    return new Set([...setA].filter(x => !setB.has(x)));
}

// Symmetric Difference (A △ B) - Elements in either set but not both
function symmetricDifference(setA, setB) {
    return new Set([...setA].filter(x => !setB.has(x)).concat([...setB].filter(x => !setA.has(x))));
}

// Test set operations
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

console.log("Set A:", [...setA]);
console.log("Set B:", [...setB]);

console.log("Union (A ∪ B):", [...union(setA, setB)]); // [1, 2, 3, 4, 5, 6]
console.log("Intersection (A ∩ B):", [...intersection(setA, setB)]); // [3, 4]
console.log("Difference (A - B):", [...difference(setA, setB)]); // [1, 2]
console.log("Symmetric Difference (A △ B):", [...symmetricDifference(setA, setB)]); // [1, 2, 5, 6]

// =============================================================================
// 7. WEAKSET - SPECIAL TYPE OF SET
// =============================================================================

console.log("\n--- 7. WEAKSET - SPECIAL TYPE OF SET ---");

/*
WEAKSET CHARACTERISTICS:
- Can only store objects (not primitives)
- Holds weak references to objects
- Objects can be garbage collected if no other references exist
- Not iterable (no forEach, no size property)
- Useful for private data and memory management
*/

const weakSet = new WeakSet();

const objA = { name: "Object A" };
const objB = { name: "Object B" };
const objC = { name: "Object C" };

// Add objects to WeakSet
weakSet.add(objA);
weakSet.add(objB);
weakSet.add(objC);

// Check existence
console.log("WeakSet has objA:", weakSet.has(objA)); // true
console.log("WeakSet has objB:", weakSet.has(objB)); // true

// Remove object
weakSet.delete(objA);
console.log("WeakSet has objA after delete:", weakSet.has(objA)); // false

// Practical use case: Tracking private object instances
class PrivateData {
    constructor() {
        this.instances = new WeakSet();
    }
    
    addInstance(obj) {
        this.instances.add(obj);
    }
    
    isInstance(obj) {
        return this.instances.has(obj);
    }
}

const privateTracker = new PrivateData();
const instance1 = { data: "sensitive" };
const instance2 = { data: "more data" };

privateTracker.addInstance(instance1);
privateTracker.addInstance(instance2);

console.log("Instance1 is tracked:", privateTracker.isInstance(instance1)); // true
console.log("Instance2 is tracked:", privateTracker.isInstance(instance2)); // true

console.log("\n✅ BASIC SET OPERATIONS COMPLETE!");
console.log("\n🎯 KEY TAKEAWAYS:");
console.log("• Sets store only unique values");
console.log("• O(1) time complexity for add, delete, has operations");
console.log("• Perfect for removing duplicates and fast existence checking");
console.log("• Support mathematical set operations (union, intersection, etc.)");
console.log("• WeakSet is useful for garbage collection and private data");
