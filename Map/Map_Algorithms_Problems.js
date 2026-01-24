// =============================================================================
// DSA MAP - ALGORITHM PROBLEMS AND SOLUTIONS
// Common Interview Questions and Coding Challenges
// =============================================================================

console.log("=== DSA MAP - ALGORITHM PROBLEMS AND SOLUTIONS ===");

// =============================================================================
// 1. TWO SUM PROBLEM
// =============================================================================

console.log("\n--- 1. TWO SUM PROBLEM ---");

function twoSum(nums, target) {
    const numMap = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        
        numMap.set(nums[i], i);
    }
    
    return [];
}

// Test cases
console.log("Two Sum [2,7,11,15], target=9:", twoSum([2,7,11,15], 9)); // [0,1]
console.log("Two Sum [3,2,4], target=6:", twoSum([3,2,4], 6)); // [1,2]
console.log("Two Sum [3,3], target=6:", twoSum([3,3], 6)); // [0,1]

// =============================================================================
// 2. GROUP ANAGRAMS
// =============================================================================

console.log("\n--- 2. GROUP ANAGRAMS ---");

function groupAnagrams(strs) {
    const groups = new Map();
    
    for (const str of strs) {
        // Sort characters to create key
        const sorted = str.split('').sort().join('');
        
        if (!groups.has(sorted)) {
            groups.set(sorted, []);
        }
        
        groups.get(sorted).push(str);
    }
    
    return Array.from(groups.values());
}

// Test cases
const words = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log("Group anagrams:", groupAnagrams(words));
// [["eat","tea","ate"], ["tan","nat"], ["bat"]]

// =============================================================================
// 3. LONGEST SUBSTRING WITHOUT REPEATING CHARACTERS
// =============================================================================

console.log("\n--- 3. LONGEST SUBSTRING WITHOUT REPEATING CHARACTERS ---");

function lengthOfLongestSubstring(s) {
    const charIndexMap = new Map();
    let maxLength = 0;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        
        if (charIndexMap.has(char) && charIndexMap.get(char) >= left) {
            left = charIndexMap.get(char) + 1;
        }
        
        charIndexMap.set(char, right);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// Test cases
console.log("Longest substring 'abcabcbb':", lengthOfLongestSubstring("abcabcbb")); // 3
console.log("Longest substring 'bbbbb':", lengthOfLongestSubstring("bbbbb")); // 1
console.log("Longest substring 'pwwkew':", lengthOfLongestSubstring("pwwkew")); // 3

// =============================================================================
// 4. FIND DUPLICATE ELEMENTS IN ARRAY
// =============================================================================

console.log("\n--- 4. FIND DUPLICATE ELEMENTS IN ARRAY ---");

function findDuplicates(nums) {
    const frequencyMap = new Map();
    const duplicates = [];
    
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }
    
    for (const [num, frequency] of frequencyMap) {
        if (frequency > 1) {
            duplicates.push(num);
        }
    }
    
    return duplicates;
}

// Alternative approach for finding first duplicate
function firstDuplicate(nums) {
    const seen = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        if (seen.has(nums[i])) {
            return nums[i];
        }
        seen.set(nums[i], true);
    }
    
    return -1;
}

// Test cases
const arr = [1, 2, 3, 2, 4, 5, 3, 6];
console.log("All duplicates:", findDuplicates(arr)); // [2, 3]
console.log("First duplicate:", firstDuplicate(arr)); // 2

// =============================================================================
// 5. MAJORITY ELEMENT
// =============================================================================

console.log("\n--- 5. MAJORITY ELEMENT ---");

function majorityElement(nums) {
    const frequencyMap = new Map();
    
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
        
        if (frequencyMap.get(num) > Math.floor(nums.length / 2)) {
            return num;
        }
    }
    
    return null;
}

// Test cases
console.log("Majority element [3,2,3]:", majorityElement([3,2,3])); // 3
console.log("Majority element [2,2,1,1,1,2,2]:", majorityElement([2,2,1,1,1,2,2])); // 2

// =============================================================================
// 6. INTERSECTION OF TWO ARRAYS
// =============================================================================

console.log("\n--- 6. INTERSECTION OF TWO ARRAYS ---");

function intersection(nums1, nums2) {
    const set1 = new Set(nums1);
    const intersectionSet = new Set();
    
    for (const num of nums2) {
        if (set1.has(num)) {
            intersectionSet.add(num);
        }
    }
    
    return Array.from(intersectionSet);
}

// For arrays with duplicates
function intersectWithDuplicates(nums1, nums2) {
    const frequencyMap = new Map();
    const result = [];
    
    // Count frequencies in first array
    for (const num of nums1) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }
    
    // Find common elements
    for (const num of nums2) {
        if (frequencyMap.has(num) && frequencyMap.get(num) > 0) {
            result.push(num);
            frequencyMap.set(num, frequencyMap.get(num) - 1);
        }
    }
    
    return result;
}

// Test cases
console.log("Intersection [1,2,2,1] & [2,2]:", intersection([1,2,2,1], [2,2])); // [2]
console.log("Intersection with duplicates [1,2,2,1] & [2,2]:", intersectWithDuplicates([1,2,2,1], [2,2])); // [2,2]

// =============================================================================
// 7. VALID ANAGRAM
// =============================================================================

console.log("\n--- 7. VALID ANAGRAM ---");

function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    
    const charCount = new Map();
    
    // Count characters in first string
    for (const char of s) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    // Decrease count for second string
    for (const char of t) {
        if (!charCount.has(char)) {
            return false;
        }
        charCount.set(char, charCount.get(char) - 1);
        
        if (charCount.get(char) === 0) {
            charCount.delete(char);
        }
    }
    
    return charCount.size === 0;
}

// Test cases
console.log("Is 'anagram' anagram of 'nagaram':", isAnagram("anagram", "nagaram")); // true
console.log("Is 'rat' anagram of 'car':", isAnagram("rat", "car")); // false

// =============================================================================
// 8. CONTAINS DUPLICATE
// =============================================================================

console.log("\n--- 8. CONTAINS DUPLICATE ---");

function containsDuplicate(nums) {
    const seen = new Map();
    
    for (const num of nums) {
        if (seen.has(num)) {
            return true;
        }
        seen.set(num, true);
    }
    
    return false;
}

// Test cases
console.log("Contains duplicate [1,2,3,1]:", containsDuplicate([1,2,3,1])); // true
console.log("Contains duplicate [1,2,3,4]:", containsDuplicate([1,2,3,4])); // false

// =============================================================================
// 9. FIND THE DIFFERENCE
// =============================================================================

console.log("\n--- 9. FIND THE DIFFERENCE ---");

function findTheDifference(s, t) {
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

// =============================================================================
// 10. ISOMORPHIC STRINGS
// =============================================================================

console.log("\n--- 10. ISOMORPHIC STRINGS ---");

function isIsomorphic(s, t) {
    if (s.length !== t.length) return false;
    
    const sToTMap = new Map();
    const tToSMap = new Map();
    
    for (let i = 0; i < s.length; i++) {
        const charS = s[i];
        const charT = t[i];
        
        if (sToTMap.has(charS)) {
            if (sToTMap.get(charS) !== charT) return false;
        } else {
            sToTMap.set(charS, charT);
        }
        
        if (tToSMap.has(charT)) {
            if (tToSMap.get(charT) !== charS) return false;
        } else {
            tToSMap.set(charT, charS);
        }
    }
    
    return true;
}

// Test cases
console.log("Isomorphic 'egg' & 'add':", isIsomorphic("egg", "add")); // true
console.log("Isomorphic 'foo' & 'bar':", isIsomorphic("foo", "bar")); // false
console.log("Isomorphic 'paper' & 'title':", isIsomorphic("paper", "title")); // true

// =============================================================================
// 11. WORD PATTERN
// =============================================================================

console.log("\n--- 11. WORD PATTERN ---");

function wordPattern(pattern, s) {
    const words = s.split(' ');
    
    if (pattern.length !== words.length) return false;
    
    const charToWord = new Map();
    const wordToChar = new Map();
    
    for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];
        const word = words[i];
        
        if (charToWord.has(char)) {
            if (charToWord.get(char) !== word) return false;
        } else {
            charToWord.set(char, word);
        }
        
        if (wordToChar.has(word)) {
            if (wordToChar.get(word) !== char) return false;
        } else {
            wordToChar.set(word, char);
        }
    }
    
    return true;
}

// Test cases
console.log("Word pattern 'abba', 'dog cat cat dog':", wordPattern("abba", "dog cat cat dog")); // true
console.log("Word pattern 'abba', 'dog cat cat fish':", wordPattern("abba", "dog cat cat fish")); // false

// =============================================================================
// 12. SUBDOMAIN VISIT COUNT
// =============================================================================

console.log("\n--- 12. SUBDOMAIN VISIT COUNT ---");

function subdomainVisits(cpdomains) {
    const domainCount = new Map();
    
    for (const cpdomain of cpdomains) {
        const [count, domain] = cpdomain.split(' ');
        const numCount = parseInt(count);
        
        // Split domain into parts
        const parts = domain.split('.');
        
        // Generate all possible subdomains
        for (let i = 0; i < parts.length; i++) {
            const subdomain = parts.slice(i).join('.');
            domainCount.set(subdomain, (domainCount.get(subdomain) || 0) + numCount);
        }
    }
    
    // Convert back to required format
    const result = [];
    for (const [domain, count] of domainCount) {
        result.push(`${count} ${domain}`);
    }
    
    return result;
}

// Test cases
const domains = ["9001 discuss.leetcode.com"];
console.log("Subdomain visits:", subdomainVisits(domains));
// ["9001 discuss.leetcode.com", "9001 leetcode.com", "9001 com"]

const domains2 = ["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com"];
console.log("Subdomain visits 2:", subdomainVisits(domains2));

// =============================================================================
// 13. CUSTOM SORT STRING
// =============================================================================

console.log("\n--- 13. CUSTOM SORT STRING ---");

function customSortString(order, s) {
    const orderMap = new Map();
    
    // Create order mapping
    for (let i = 0; i < order.length; i++) {
        orderMap.set(order[i], i);
    }
    
    // Convert string to array and sort
    const chars = s.split('');
    chars.sort((a, b) => {
        const orderA = orderMap.has(a) ? orderMap.get(a) : Infinity;
        const orderB = orderMap.has(b) ? orderMap.get(b) : Infinity;
        return orderA - orderB;
    });
    
    return chars.join('');
}

// Test cases
console.log("Custom sort 'cba' & 'abcd':", customSortString("cba", "abcd")); // "cbad"
console.log("Custom sort 'kqep' & 'pekeq':", customSortString("kqep", "pekeq")); // "kqeep"

console.log("\n✅ MAP ALGORITHM PROBLEMS COMPLETE!");
console.log("\n🎯 Key Takeaways:");
console.log("• Maps provide O(1) average time complexity for lookups");
console.log("• Perfect for counting frequencies and tracking relationships");
console.log("• Use Maps when you need non-string keys or ordered iteration");
console.log("• Essential for solving many interview problems efficiently");
