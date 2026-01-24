// =============================================================================
// DSA SET - INTERVIEW QUESTIONS WITH DETAILED COMMENTS
// Top Asked Questions with Explanations and Multiple Approaches
// =============================================================================

console.log("=== DSA SET - INTERVIEW QUESTIONS ===");

// =============================================================================
// 1. DESIGN A HASHSET
// =============================================================================

console.log("\n--- 1. DESIGN A HASHSET ---");

/*
PROBLEM: Implement a HashSet without using built-in hash table data structures
APPROACH: Use an array of buckets, each bucket is a Set to handle collisions
TIME COMPLEXITY: O(1) average, O(n) worst case
SPACE COMPLEXITY: O(n)
*/

class MyHashSet {
    constructor(size = 1000) {
        this.size = size;
        this.buckets = new Array(size).fill(null).map(() => new Set());
    }
    
    _hash(key) {
        return key % this.size;
    }
    
    add(key) {
        const hash = this._hash(key);
        this.buckets[hash].add(key);
    }
    
    remove(key) {
        const hash = this._hash(key);
        this.buckets[hash].delete(key);
    }
    
    contains(key) {
        const hash = this._hash(key);
        return this.buckets[hash].has(key);
    }
}

// Test MyHashSet
const myHashSet = new MyHashSet();
myHashSet.add(1);
myHashSet.add(2);
console.log("Contains 1:", myHashSet.contains(1)); // true
console.log("Contains 3:", myHashSet.contains(3)); // false
myHashSet.add(2);
console.log("Contains 2:", myHashSet.contains(2)); // true
myHashSet.remove(2);
console.log("Contains 2 after remove:", myHashSet.contains(2)); // false

// =============================================================================
// 2. DESIGN A PARKING SYSTEM
// =============================================================================

console.log("\n--- 2. DESIGN A PARKING SYSTEM ---");

/*
PROBLEM: Design a parking system with different car sizes
APPROACH: Use Sets to track available spots for each car type
TIME COMPLEXITY: O(1) for all operations
SPACE COMPLEXITY: O(n) where n is total spots
*/

class ParkingSystem {
    constructor(big, medium, small) {
        this.bigSpots = new Set(Array.from({length: big}, (_, i) => i + 1));
        this.mediumSpots = new Set(Array.from({length: medium}, (_, i) => i + 1));
        this.smallSpots = new Set(Array.from({length: small}, (_, i) => i + 1));
    }
    
    addCar(carType) {
        switch(carType) {
            case 1: // Big car
                if (this.bigSpots.size > 0) {
                    this.bigSpots.delete(this.bigSpots.values().next().value);
                    return true;
                }
                break;
            case 2: // Medium car
                if (this.mediumSpots.size > 0) {
                    this.mediumSpots.delete(this.mediumSpots.values().next().value);
                    return true;
                }
                break;
            case 3: // Small car
                if (this.smallSpots.size > 0) {
                    this.smallSpots.delete(this.smallSpots.values().next().value);
                    return true;
                }
                break;
        }
        return false;
    }
    
    // Additional methods for interview extension
    removeCar(carType, spotNumber) {
        switch(carType) {
            case 1:
                this.bigSpots.add(spotNumber);
                break;
            case 2:
                this.mediumSpots.add(spotNumber);
                break;
            case 3:
                this.smallSpots.add(spotNumber);
                break;
        }
    }
    
    getAvailableSpots(carType) {
        switch(carType) {
            case 1: return this.bigSpots.size;
            case 2: return this.mediumSpots.size;
            case 3: return this.smallSpots.size;
            default: return 0;
        }
    }
}

// Test ParkingSystem
const parking = new ParkingSystem(1, 1, 0);
console.log("Add big car:", parking.addCar(1)); // true
console.log("Add big car again:", parking.addCar(1)); // false
console.log("Add medium car:", parking.addCar(2)); // true
console.log("Add small car:", parking.addCar(3)); // false

// =============================================================================
// 3. DESIGN A PHONE DIRECTORY
// =============================================================================

console.log("\n--- 3. DESIGN A PHONE DIRECTORY ---");

/*
PROBLEM: Design a phone directory that can get, release, and check availability
APPROACH: Use Set to track available numbers for O(1) operations
TIME COMPLEXITY: O(1) for all operations
SPACE COMPLEXITY: O(n)
*/

class PhoneDirectory {
    constructor(maxNumbers) {
        this.available = new Set(Array.from({length: maxNumbers}, (_, i) => i));
        this.used = new Set();
    }
    
    get() {
        if (this.available.size === 0) return -1;
        
        const number = this.available.values().next().value;
        this.available.delete(number);
        this.used.add(number);
        return number;
    }
    
    release(number) {
        if (this.used.has(number)) {
            this.used.delete(number);
            this.available.add(number);
        }
    }
    
    check(number) {
        return this.available.has(number);
    }
    
    // Additional methods
    getAvailableCount() {
        return this.available.size;
    }
    
    getUsedCount() {
        return this.used.size;
    }
}

// Test PhoneDirectory
const phoneDir = new PhoneDirectory(3);
console.log("Get number:", phoneDir.get()); // 0
console.log("Get number:", phoneDir.get()); // 1
console.log("Check number 2:", phoneDir.check(2)); // true
console.log("Release number 1:", phoneDir.release(1));
console.log("Check number 1 after release:", phoneDir.check(1)); // true

// =============================================================================
// 4. DESIGN A SNAKE GAME
// =============================================================================

console.log("\n--- 4. DESIGN A SNAKE GAME ---");

/*
PROBLEM: Design a snake game with collision detection
APPROACH: Use Set to track occupied positions for O(1) collision detection
TIME COMPLEXITY: O(1) for move operations
SPACE COMPLEXITY: O(n) where n is snake length
*/

class SnakeGame {
    constructor(width, height, food) {
        this.width = width;
        this.height = height;
        this.food = food;
        this.score = 0;
        this.foodIndex = 0;
        
        // Snake starts at (0, 0)
        this.snake = new Set();
        this.snake.add("0,0");
        this.snakeQueue = ["0,0"]; // For maintaining order
        
        // Add all food positions to a Set for quick lookup
        this.foodSet = new Set(food.map(pos => `${pos[0]},${pos[1]}`));
    }
    
    move(direction) {
        const head = this.snakeQueue[this.snakeQueue.length - 1].split(',').map(Number);
        let [x, y] = head;
        
        // Calculate new head position
        switch(direction) {
            case 'U': y--; break;
            case 'D': y++; break;
            case 'L': x--; break;
            case 'R': x++; break;
        }
        
        const newHead = `${x},${y}`;
        
        // Check wall collision
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return -1; // Game over
        }
        
        // Check self collision (except tail which will move)
        if (this.snake.has(newHead) && newHead !== this.snakeQueue[0]) {
            return -1; // Game over
        }
        
        // Add new head
        this.snake.add(newHead);
        this.snakeQueue.push(newHead);
        
        // Check if food is eaten
        if (this.foodSet.has(newHead)) {
            this.score++;
            this.foodSet.delete(newHead);
            this.foodIndex++;
            
            // Add new food if available
            if (this.foodIndex < this.food.length) {
                const newFood = this.food[this.foodIndex];
                this.foodSet.add(`${newFood[0]},${newFood[1]}`);
            }
        } else {
            // Remove tail if no food eaten
            const tail = this.snakeQueue.shift();
            this.snake.delete(tail);
        }
        
        return this.score;
    }
    
    getCurrentState() {
        return {
            score: this.score,
            snake: Array.from(this.snake),
            food: Array.from(this.foodSet)
        };
    }
}

// Test SnakeGame
const food = [[1, 2], [1, 3]];
const snakeGame = new SnakeGame(3, 2, food);
console.log("Move Right:", snakeGame.move('R')); // 0
console.log("Move Down:", snakeGame.move('D')); // 0
console.log("Move Right:", snakeGame.move('R')); // 1 (ate food)
console.log("Move Down:", snakeGame.move('D')); // 1
console.log("Move Left:", snakeGame.move('L')); // 2 (ate food)
console.log("Current state:", snakeGame.getCurrentState());

// =============================================================================
// 5. DESIGN A UNIQUE DATA STRUCTURE
// =============================================================================

console.log("\n--- 5. DESIGN A UNIQUE DATA STRUCTURE ---");

/*
PROBLEM: Design a data structure that inserts, deletes, and returns random element - all in O(1)
APPROACH: Use Set for O(1) insert/delete and array for O(1) random access
TIME COMPLEXITY: O(1) for all operations
SPACE COMPLEXITY: O(n)
*/

class RandomizedSet {
    constructor() {
        this.elements = new Set();
        this.array = [];
    }
    
    insert(val) {
        if (this.elements.has(val)) {
            return false;
        }
        
        this.elements.add(val);
        this.array.push(val);
        return true;
    }
    
    remove(val) {
        if (!this.elements.has(val)) {
            return false;
        }
        
        this.elements.delete(val);
        const index = this.array.indexOf(val);
        
        // Swap with last element and pop
        const lastElement = this.array[this.array.length - 1];
        this.array[index] = lastElement;
        this.array.pop();
        
        return true;
    }
    
    getRandom() {
        const randomIndex = Math.floor(Math.random() * this.array.length);
        return this.array[randomIndex];
    }
    
    getSize() {
        return this.elements.size;
    }
}

// Test RandomizedSet
const randomSet = new RandomizedSet();
console.log("Insert 1:", randomSet.insert(1)); // true
console.log("Insert 2:", randomSet.insert(2)); // true
console.log("Insert 1 again:", randomSet.insert(1)); // false
console.log("Get random:", randomSet.getRandom()); // 1 or 2
console.log("Remove 1:", randomSet.remove(1)); // true
console.log("Get random after remove:", randomSet.getRandom()); // 2

// =============================================================================
// 6. DESIGN A CHAT ROOM SYSTEM
// =============================================================================

console.log("\n--- 6. DESIGN A CHAT ROOM SYSTEM ---");

/*
PROBLEM: Design a chat room system with user management and message broadcasting
APPROACH: Use Set to track active users in each chat room
TIME COMPLEXITY: O(1) for join/leave, O(n) for broadcast
SPACE COMPLEXITY: O(n) where n is total users
*/

class ChatRoom {
    constructor(name) {
        this.name = name;
        this.users = new Set();
        this.messages = [];
    }
    
    join(userId) {
        this.users.add(userId);
        return `User ${userId} joined ${this.name}`;
    }
    
    leave(userId) {
        this.users.delete(userId);
        return `User ${userId} left ${this.name}`;
    }
    
    sendMessage(userId, message) {
        if (!this.users.has(userId)) {
            throw new Error(`User ${userId} is not in the room`);
        }
        
        const messageObj = {
            userId: userId,
            message: message,
            timestamp: new Date(),
            room: this.name
        };
        
        this.messages.push(messageObj);
        return messageObj;
    }
    
    getUsers() {
        return Array.from(this.users);
    }
    
    getUserCount() {
        return this.users.size;
    }
    
    getRecentMessages(count = 10) {
        return this.messages.slice(-count);
    }
}

class ChatSystem {
    constructor() {
        this.rooms = new Map();
        this.userRooms = new Map(); // userId -> Set of room names
    }
    
    createRoom(name) {
        if (!this.rooms.has(name)) {
            this.rooms.set(name, new ChatRoom(name));
            return `Room ${name} created`;
        }
        return `Room ${name} already exists`;
    }
    
    joinRoom(userId, roomName) {
        if (!this.rooms.has(roomName)) {
            this.createRoom(roomName);
        }
        
        const room = this.rooms.get(roomName);
        const message = room.join(userId);
        
        if (!this.userRooms.has(userId)) {
            this.userRooms.set(userId, new Set());
        }
        this.userRooms.get(userId).add(roomName);
        
        return message;
    }
    
    leaveRoom(userId, roomName) {
        if (this.rooms.has(roomName)) {
            const room = this.rooms.get(roomName);
            const message = room.leave(userId);
            
            if (this.userRooms.has(userId)) {
                this.userRooms.get(userId).delete(roomName);
            }
            
            return message;
        }
        return `Room ${roomName} does not exist`;
    }
    
    sendMessage(userId, roomName, message) {
        if (!this.rooms.has(roomName)) {
            throw new Error(`Room ${roomName} does not exist`);
        }
        
        const room = this.rooms.get(roomName);
        return room.sendMessage(userId, message);
    }
    
    getUserRooms(userId) {
        return this.userRooms.has(userId) ? 
               Array.from(this.userRooms.get(userId)) : [];
    }
    
    getRoomUsers(roomName) {
        return this.rooms.has(roomName) ? 
               this.rooms.get(roomName).getUsers() : [];
    }
}

// Test ChatSystem
const chatSystem = new ChatSystem();
console.log(chatSystem.createRoom("general"));
console.log(chatSystem.createRoom("tech"));

console.log(chatSystem.joinRoom("user1", "general"));
console.log(chatSystem.joinRoom("user2", "general"));
console.log(chatSystem.joinRoom("user1", "tech"));

console.log(chatSystem.sendMessage("user1", "general", "Hello everyone!"));
console.log(chatSystem.sendMessage("user2", "general", "Hi user1!"));

console.log("User1 rooms:", chatSystem.getUserRooms("user1"));
console.log("General room users:", chatSystem.getRoomUsers("general"));

// =============================================================================
// 7. DESIGN A TICKET SYSTEM
// =============================================================================

console.log("\n--- 7. DESIGN A TICKET SYSTEM ---");

/*
PROBLEM: Design a ticket booking system with seat management
APPROACH: Use Set to track available and booked seats
TIME COMPLEXITY: O(1) for booking/cancellation
SPACE COMPLEXITY: O(n) where n is total seats
*/

class TicketSystem {
    constructor(totalSeats) {
        this.totalSeats = totalSeats;
        this.availableSeats = new Set(Array.from({length: totalSeats}, (_, i) => i + 1));
        this.bookedSeats = new Set();
        this.waitlist = new Set(); // For premium feature
    }
    
    bookSeat(seatNumber) {
        if (!this.availableSeats.has(seatNumber)) {
            return { success: false, message: "Seat not available" };
        }
        
        this.availableSeats.delete(seatNumber);
        this.bookedSeats.add(seatNumber);
        
        return { success: true, seat: seatNumber };
    }
    
    cancelBooking(seatNumber) {
        if (!this.bookedSeats.has(seatNumber)) {
            return { success: false, message: "No booking found for this seat" };
        }
        
        this.bookedSeats.delete(seatNumber);
        this.availableSeats.add(seatNumber);
        
        return { success: true, seat: seatNumber };
    }
    
    bookAnySeat() {
        if (this.availableSeats.size === 0) {
            return { success: false, message: "No seats available" };
        }
        
        const seatNumber = this.availableSeats.values().next().value;
        return this.bookSeat(seatNumber);
    }
    
    getAvailableSeats() {
        return Array.from(this.availableSeats).sort((a, b) => a - b);
    }
    
    getBookedSeats() {
        return Array.from(this.bookedSeats).sort((a, b) => a - b);
    }
    
    getAvailableCount() {
        return this.availableSeats.size;
    }
    
    getBookedCount() {
        return this.bookedSeats.size;
    }
    
    // Advanced feature: block booking
    blockBooking(seatCount) {
        if (this.availableSeats.size < seatCount) {
            return { success: false, message: "Not enough seats available" };
        }
        
        const seats = Array.from(this.availableSeats).slice(0, seatCount);
        const bookedSeats = [];
        
        for (const seat of seats) {
            const result = this.bookSeat(seat);
            if (result.success) {
                bookedSeats.push(seat);
            }
        }
        
        return { success: true, seats: bookedSeats };
    }
}

// Test TicketSystem
const ticketSystem = new TicketSystem(10);
console.log("Book seat 5:", ticketSystem.bookSeat(5));
console.log("Book any seat:", ticketSystem.bookAnySeat());
console.log("Available seats:", ticketSystem.getAvailableSeats());
console.log("Booked seats:", ticketSystem.getBookedSeats());

console.log("Block booking 3 seats:", ticketSystem.blockBooking(3));
console.log("Available count:", ticketSystem.getAvailableCount());
console.log("Cancel booking 5:", ticketSystem.cancelBooking(5));
console.log("Available after cancel:", ticketSystem.getAvailableSeats());

// =============================================================================
// 8. DESIGN A CACHE WITH SET
// =============================================================================

console.log("\n--- 8. DESIGN A CACHE WITH SET ---");

/*
PROBLEM: Design a cache that tracks recently accessed keys
APPROACH: Use Set to track access patterns for cache eviction
TIME COMPLEXITY: O(1) for basic operations
SPACE COMPLEXITY: O(n)
*/

class AccessCache {
    constructor(maxSize = 100) {
        this.maxSize = maxSize;
        this.cache = new Map();
        this.recentlyAccessed = new Set();
        this.accessOrder = [];
    }
    
    get(key) {
        if (this.cache.has(key)) {
            this._markAccessed(key);
            return this.cache.get(key);
        }
        return null;
    }
    
    set(key, value) {
        if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
            this._evictLeastRecentlyUsed();
        }
        
        this.cache.set(key, value);
        this._markAccessed(key);
    }
    
    _markAccessed(key) {
        this.recentlyAccessed.add(key);
    }
    
    _evictLeastRecentlyUsed() {
        // Simple eviction: remove first item
        const firstKey = this.cache.keys().next().value;
        this.cache.delete(firstKey);
        this.recentlyAccessed.delete(firstKey);
    }
    
    has(key) {
        return this.cache.has(key);
    }
    
    delete(key) {
        this.recentlyAccessed.delete(key);
        return this.cache.delete(key);
    }
    
    clear() {
        this.cache.clear();
        this.recentlyAccessed.clear();
        this.accessOrder = [];
    }
    
    getRecentlyAccessed() {
        return Array.from(this.recentlyAccessed);
    }
    
    getSize() {
        return this.cache.size;
    }
}

// Test AccessCache
const accessCache = new AccessCache(3);
accessCache.set("a", 1);
accessCache.set("b", 2);
accessCache.set("c", 3);
console.log("Get 'a':", accessCache.get("a"));
console.log("Recently accessed:", accessCache.getRecentlyAccessed());

accessCache.set("d", 4); // Should evict one item
console.log("Cache size after adding 'd':", accessCache.getSize());
console.log("Has 'a':", accessCache.has("a")); // Might be evicted

console.log("\n✅ SET INTERVIEW QUESTIONS COMPLETE!");
console.log("\n🎯 INTERVIEW TIPS:");
console.log("• Always consider time and space complexity");
console.log("• Think about edge cases (empty data, duplicates, etc.)");
console.log("• Explain why Set is better than other data structures for the problem");
console.log("• Consider using Set for O(1) lookups and uniqueness");
console.log("• Practice implementing these data structures from scratch");
