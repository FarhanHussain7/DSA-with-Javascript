// =============================================================================
// DSA SET - ALGORITHM PROBLEMS WITH DETAILED COMMENTS
// Common Interview Questions and Coding Challenges Using Sets
// =============================================================================

console.log("=== DSA SET - ALGORITHM PROBLEMS ===");

// =============================================================================
// 1. CONTAINS DUPLICATE
// =============================================================================

console.log("\n--- 1. CONTAINS DUPLICATE ---");

/*
PROBLEM: Given an array of integers, find if the array contains any duplicates.
APPROACH: Use Set to track seen numbers. If we encounter a number already in the Set,
we know there's a duplicate.
TIME COMPLEXITY: O(n) - we visit each element once
SPACE COMPLEXITY: O(n) - worst case when all elements are unique
*/

function containsDuplicate(nums) {
    const seen = new Set();
    
    for (const num of nums) {
        if (seen.has(num)) {
            return true; // Found duplicate
        }
        seen.add(num);
    }
    
    return false; // No duplicates found
}

// Alternative one-liner solution
function containsDuplicateOneLiner(nums) {
    return new Set(nums).size !== nums.length;
}

// Test cases
console.log("Contains duplicate [1,2,3,1]:", containsDuplicate([1,2,3,1])); // true
console.log("Contains duplicate [1,2,3,4]:", containsDuplicate([1,2,3,4])); // false
console.log("Contains duplicate [1,1,1,1]:", containsDuplicate([1,1,1,1])); // true
console.log("One-liner version:", containsDuplicateOneLiner([1,2,3,1])); // true

// =============================================================================
// 2. SINGLE NUMBER
// =============================================================================

console.log("\n--- 2. SINGLE NUMBER ---");

/*
PROBLEM: Given an array where every element appears twice except one, find the single one.
APPROACH: While this can be solved with XOR, we can also use Set to track pairs.
TIME COMPLEXITY: O(n)
SPACE COMPLEXITY: O(n)
*/

function singleNumber(nums) {
    const numSet = new Set();
    
    for (const num of nums) {
        if (numSet.has(num)) {
            numSet.delete(num); // Remove if we've seen it before (pair found)
        } else {
            numSet.add(num); // Add if we haven't seen it before
        }
    }
    
    // The remaining element is the single number
    return numSet.values().next().value;
}

// Alternative approach using sum
function singleNumberSum(nums) {
    const uniqueSum = [...new Set(nums)].reduce((a, b) => a + b, 0);
    const totalSum = nums.reduce((a, b) => a + b, 0);
    return 2 * uniqueSum - totalSum;
}

// Test cases
console.log("Single number [2,2,1]:", singleNumber([2,2,1])); // 1
console.log("Single number [4,1,2,1,2]:", singleNumber([4,1,2,1,2])); // 4
console.log("Single number [1]:", singleNumber([1])); // 1
console.log("Sum approach:", singleNumberSum([2,2,1])); // 1

// =============================================================================
// 3. INTERSECTION OF TWO ARRAYS
// =============================================================================

console.log("\n--- 3. INTERSECTION OF TWO ARRAYS ---");

/*
PROBLEM: Given two arrays, return their intersection.
APPROACH: Use Set to store elements of one array, then check against the other.
TIME COMPLEXITY: O(n + m) where n and m are lengths of the arrays
SPACE COMPLEXITY: O(min(n, m))
*/

function intersection(nums1, nums2) {
    // Use the smaller array to create the set for better space efficiency
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1]; // Swap if nums1 is larger
    }
    
    const set1 = new Set(nums1);
    const resultSet = new Set();
    
    for (const num of nums2) {
        if (set1.has(num)) {
            resultSet.add(num);
        }
    }
    
    return Array.from(resultSet);
}

// Test cases
console.log("Intersection [1,2,2,1] & [2,2]:", intersection([1,2,2,1], [2,2])); // [2]
console.log("Intersection [4,9,5] & [9,4,9,8,4]:", intersection([4,9,5], [9,4,9,8,4])); // [4,9]
console.log("Intersection [] & [1,2,3]:", intersection([], [1,2,3])); // []

// =============================================================================
// 4. HAPPY NUMBER
// =============================================================================

console.log("\n--- 4. HAPPY NUMBER ---");

/*
PROBLEM: Determine if a number is happy (eventually reaches 1 when replaced by sum of squares of digits)
APPROACH: Use Set to detect cycles in the sequence. If we see a number again, we're in a loop.
TIME COMPLEXITY: O(log n) for each iteration, but bounded by the cycle detection
SPACE COMPLEXITY: O(log n) for storing seen numbers
*/

function isHappy(n) {
    const seen = new Set();
    
    while (n !== 1 && !seen.has(n)) {
        seen.add(n);
        n = getNextNumber(n);
    }
    
    return n === 1;
}

function getNextNumber(n) {
    let sum = 0;
    while (n > 0) {
        const digit = n % 10;
        sum += digit * digit;
        n = Math.floor(n / 10);
    }
    return sum;
}

// Test cases
console.log("Is 19 happy:", isHappy(19)); // true (19 → 82 → 68 → 100 → 1)
console.log("Is 2 happy:", isHappy(2)); // false (2 → 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4)
console.log("Is 7 happy:", isHappy(7)); // true

// =============================================================================
// 5. FIND THE DIFFERENCE
// =============================================================================

console.log("\n--- 5. FIND THE DIFFERENCE ---");

/*
PROBLEM: Find the character that was added to string t compared to string s
APPROACH: Use Set to track characters in s, then find the extra character in t
TIME COMPLEXITY: O(n)
SPACE COMPLEXITY: O(n)
*/

function findTheDifference(s, t) {
    const charSet = new Set(s);
    
    for (const char of t) {
        if (!charSet.has(char)) {
            return char;
        }
        // Remove the character to handle duplicates properly
        charSet.delete(char);
    }
    
    return ''; // Should not reach here if input is valid
}

// Alternative approach using character count
function findTheDifferenceCount(s, t) {
    const charCount = new Map();
    
    // Count characters in s
    for (const char of s) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    // Find the extra character in t
    for (const char of t) {
        if (!charCount.has(char) || charCount.get(char) === 0) {
            return char;
        }
        charCount.set(char, charCount.get(char) - 1);
    }
    
    return '';
}

// Test cases
console.log("Find difference 'abcd' & 'abcde':", findTheDifference("abcd", "abcde")); // 'e'
console.log("Find difference '' & 'y':", findTheDifference("", "y")); // 'y'
console.log("Count approach:", findTheDifferenceCount("abcd", "abcde")); // 'e'

// =============================================================================
// 6. JEWELS AND STONES
// =============================================================================

console.log("\n--- 6. JEWELS AND STONES ---");

/*
PROBLEM: Count how many stones are also jewels
APPROACH: Use Set to store jewel types for O(1) lookup
TIME COMPLEXITY: O(j + s) where j is length of jewels, s is length of stones
SPACE COMPLEXITY: O(j)
*/

function numJewelsInStones(jewels, stones) {
    const jewelSet = new Set(jewels);
    let count = 0;
    
    for (const stone of stones) {
        if (jewelSet.has(stone)) {
            count++;
        }
    }
    
    return count;
}

// Test cases
console.log("Jewels 'aA', stones 'aAAbbbb':", numJewelsInStones("aA", "aAAbbbb")); // 3
console.log("Jewels 'z', stones 'ZZ':", numJewelsInStones("z", "ZZ")); // 0
console.log("Jewels 'abc', stones 'aabbbccc':", numJewelsInStones("abc", "aabbbccc")); // 9

// =============================================================================
// 7. FIND DUPLICATES IN ARRAY
// =============================================================================

console.log("\n--- 7. FIND DUPLICATES IN ARRAY ---");

/*
PROBLEM: Find all duplicates in an array where elements appear 1-3 times
APPROACH: Use Set to track seen elements and another Set for duplicates
TIME COMPLEXITY: O(n)
SPACE COMPLEXITY: O(n)
*/

function findDuplicates(nums) {
    const seen = new Set();
    const duplicates = new Set();
    
    for (const num of nums) {
        if (seen.has(num)) {
            duplicates.add(num);
        } else {
            seen.add(num);
        }
    }
    
    return Array.from(duplicates);
}

// Test cases
console.log("Duplicates in [4,3,2,7,8,2,3,1]:", findDuplicates([4,3,2,7,8,2,3,1])); // [2,3]
console.log("Duplicates in [1,1,2]:", findDuplicates([1,1,2])); // [1]
console.log("Duplicates in [1,2,3,4]:", findDuplicates([1,2,3,4])); // []

// =============================================================================
// 8. UNIQUE EMAIL ADDRESSES
// =============================================================================

console.log("\n--- 8. UNIQUE EMAIL ADDRESSES ---");

/*
PROBLEM: Count unique email addresses after normalizing (ignoring '.' in local part and everything after '@')
APPROACH: Use Set to store normalized email addresses
TIME COMPLEXITY: O(n * L) where L is average email length
SPACE COMPLEXITY: O(n)
*/

function numUniqueEmails(emails) {
    const uniqueEmails = new Set();
    
    for (const email of emails) {
        const [local, domain] = email.split('@');
        
        // Remove '.' and ignore everything after '+'
        const normalizedLocal = local.split('+')[0].replace(/\./g, '');
        const normalizedEmail = normalizedLocal + '@' + domain;
        
        uniqueEmails.add(normalizedEmail);
    }
    
    return uniqueEmails.size;
}

// Test cases
const emails1 = ["test.email+alex@leetcode.com", "test.e.mail+bob.cathy@leetcode.com", "testemail+david@lee.tcode.com"];
console.log("Unique emails count:", numUniqueEmails(emails1)); // 2

const emails2 = ["a@leetcode.com", "b@leetcode.com", "c@leetcode.com"];
console.log("Unique emails count 2:", numUniqueEmails(emails2)); // 3

// =============================================================================
// 9. LONGEST CONSECUTIVE SEQUENCE
// =============================================================================

console.log("\n--- 9. LONGEST CONSECUTIVE SEQUENCE ---");

/*
PROBLEM: Find the length of longest consecutive elements sequence
APPROACH: Use Set for O(1) lookup and only start sequences from the beginning
TIME COMPLEXITY: O(n)
SPACE COMPLEXITY: O(n)
*/

function longestConsecutive(nums) {
    const numSet = new Set(nums);
    let longest = 0;
    
    for (const num of numSet) {
        // Only start counting if num is the beginning of a sequence
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;
            
            while (numSet.has(currentNum + 1)) {
                currentNum += 1;
                currentStreak += 1;
            }
            
            longest = Math.max(longest, currentStreak);
        }
    }
    
    return longest;
}

// Test cases
console.log("Longest consecutive [100,4,200,1,3,2]:", longestConsecutive([100,4,200,1,3,2])); // 4 (1,2,3,4)
console.log("Longest consecutive [0,3,7,2,5,8,4,6,0,1]:", longestConsecutive([0,3,7,2,5,8,4,6,0,1])); // 9 (0,1,2,3,4,5,6,7,8)
console.log("Longest consecutive []:", longestConsecutive([])); // 0

// =============================================================================
// 10. REVERSE VOWELS OF A STRING
// =============================================================================

console.log("\n--- 10. REVERSE VOWELS OF A STRING ---");

/*
PROBLEM: Reverse only the vowels in a string
APPROACH: Use Set to store vowels for O(1) lookup, then use two-pointer technique
TIME COMPLEXITY: O(n)
SPACE COMPLEXITY: O(1) - the vowel set is constant size
*/

function reverseVowels(s) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    const chars = s.split('');
    let left = 0;
    let right = chars.length - 1;
    
    while (left < right) {
        // Find next vowel from left
        while (left < right && !vowels.has(chars[left])) {
            left++;
        }
        
        // Find next vowel from right
        while (left < right && !vowels.has(chars[right])) {
            right--;
        }
        
        // Swap vowels
        if (left < right) {
            [chars[left], chars[right]] = [chars[right], chars[left]];
            left++;
            right--;
        }
    }
    
    return chars.join('');
}

// Test cases
console.log("Reverse vowels 'hello':", reverseVowels("hello")); // "holle"
console.log("Reverse vowels 'leetcode':", reverseVowels("leetcode")); // "leotcede"
console.log("Reverse vowels 'aA':", reverseVowels("aA")); // "Aa"

// =============================================================================
// 11. SET MATRIX ZEROES
// =============================================================================

console.log("\n--- 11. SET MATRIX ZEROES ---");

/*
PROBLEM: Set entire row and column to zero if an element is zero
APPROACH: Use Sets to track which rows and columns need to be zeroed
TIME COMPLEXITY: O(m * n) where m is rows, n is columns
SPACE COMPLEXITY: O(m + n)
*/

function setZeroes(matrix) {
    const rows = new Set();
    const cols = new Set();
    const m = matrix.length;
    const n = matrix[0].length;
    
    // First pass: find all zeros
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
                rows.add(i);
                cols.add(j);
            }
        }
    }
    
    // Second pass: set zeros
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (rows.has(i) || cols.has(j)) {
                matrix[i][j] = 0;
            }
        }
    }
    
    return matrix;
}

// Test cases
const matrix1 = [
    [1,1,1],
    [1,0,1],
    [1,1,1]
];
console.log("Set zeroes:", setZeroes(matrix1));

const matrix2 = [
    [0,1,2,0],
    [3,4,5,2],
    [1,3,1,5]
];
console.log("Set zeroes 2:", setZeroes(matrix2));

// =============================================================================
// 12. FIND THE TOWN JUDGE
// =============================================================================

console.log("\n--- 12. FIND THE TOWN JUDGE ---");

/*
PROBLEM: Find the town judge (person trusted by everyone else, trusts no one)
APPROACH: Use Sets to track trust relationships
TIME COMPLEXITY: O(n + trust.length)
SPACE COMPLEXITY: O(n)
*/

function findJudge(n, trust) {
    if (trust.length === 0 && n === 1) return 1;
    
    const trustedBy = new Map(); // person -> Set of people who trust them
    const trusts = new Set(); // Set of people who trust someone
    
    for (const [a, b] of trust) {
        if (!trustedBy.has(b)) {
            trustedBy.set(b, new Set());
        }
        trustedBy.get(b).add(a);
        trusts.add(a);
    }
    
    // Find person who is trusted by everyone else and trusts no one
    for (let i = 1; i <= n; i++) {
        if (trustedBy.has(i) && 
            trustedBy.get(i).size === n - 1 && 
            !trusts.has(i)) {
            return i;
        }
    }
    
    return -1;
}

// Test cases
console.log("Town judge (2, [[1,2]]):", findJudge(2, [[1,2]])); // 2
console.log("Town judge (3, [[1,3],[2,3]]):", findJudge(3, [[1,3],[2,3]])); // 3
console.log("Town judge (3, [[1,3],[2,3],[3,1]]):", findJudge(3, [[1,3],[2,3],[3,1]])); // -1

console.log("\n✅ SET ALGORITHM PROBLEMS COMPLETE!");
console.log("\n🎯 KEY TAKEAWAYS:");
console.log("• Sets provide O(1) average time complexity for lookups");
console.log("• Perfect for detecting duplicates and cycles");
console.log("• Excellent for membership testing and filtering");
console.log("• Use Sets when you need to ensure uniqueness");
console.log("• Great for mathematical set operations (union, intersection, difference)");
