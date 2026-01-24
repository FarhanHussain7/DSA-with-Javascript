// =============================================================================
// DSA MAP - INTERVIEW QUESTIONS COLLECTION
// Top Asked Questions with Detailed Explanations
// =============================================================================

console.log("=== DSA MAP - INTERVIEW QUESTIONS COLLECTION ===");

// =============================================================================
// 1. DESIGN A LOGGER SYSTEM
// =============================================================================

console.log("\n--- 1. DESIGN A LOGGER SYSTEM ---");

class Logger {
    constructor() {
        this.messageTimestamps = new Map();
    }

    shouldPrintMessage(timestamp, message) {
        if (this.messageTimestamps.has(message)) {
            const lastTimestamp = this.messageTimestamps.get(message);
            if (timestamp - lastTimestamp < 10) {
                return false;
            }
        }
        
        this.messageTimestamps.set(message, timestamp);
        return true;
    }
}

// Test Logger
const logger = new Logger();
console.log("Should print (1, 'foo'):", logger.shouldPrintMessage(1, "foo")); // true
console.log("Should print (2, 'bar'):", logger.shouldPrintMessage(2, "bar")); // true
console.log("Should print (3, 'foo'):", logger.shouldPrintMessage(3, "foo")); // false (10 seconds not passed)
console.log("Should print (11, 'foo'):", logger.shouldPrintMessage(11, "foo")); // true

// =============================================================================
// 2. IMPLEMENT A PHONE DIRECTORY
// =============================================================================

console.log("\n--- 2. IMPLEMENT A PHONE DIRECTORY ---");

class PhoneDirectory {
    constructor(maxNumbers) {
        this.available = new Set();
        this.used = new Map(); // number -> timestamp
        
        for (let i = 0; i < maxNumbers; i++) {
            this.available.add(i);
        }
    }

    get() {
        if (this.available.size === 0) return -1;
        
        const number = this.available.values().next().value;
        this.available.delete(number);
        this.used.set(number, Date.now());
        return number;
    }

    check(number) {
        return this.used.has(number);
    }

    release(number) {
        if (this.used.has(number)) {
            this.used.delete(number);
            this.available.add(number);
        }
    }
}

// Test Phone Directory
const phoneDir = new PhoneDirectory(3);
console.log("Get number:", phoneDir.get()); // 0
console.log("Get number:", phoneDir.get()); // 1
console.log("Check number 2:", phoneDir.check(2)); // false
console.log("Release number 1:", phoneDir.release(1));
console.log("Check number 1:", phoneDir.check(1)); // false

// =============================================================================
// 3. DESIGN A FILE SYSTEM
// =============================================================================

console.log("\n--- 3. DESIGN A FILE SYSTEM ---");

class FileSystem {
    constructor() {
        this.root = new Map();
    }

    createPath(path, value) {
        const parts = path.split('/').filter(part => part.length > 0);
        let current = this.root;
        
        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            if (!current.has(part)) {
                return false;
            }
            current = current.get(part);
        }
        
        const lastPart = parts[parts.length - 1];
        if (current.has(lastPart)) {
            return false;
        }
        
        current.set(lastPart, value);
        return true;
    }

    get(path) {
        const parts = path.split('/').filter(part => part.length > 0);
        let current = this.root;
        
        for (const part of parts) {
            if (!current.has(part)) {
                return -1;
            }
            current = current.get(part);
        }
        
        return current;
    }
}

// Test File System
const fs = new FileSystem();
console.log("Create '/a', 1:", fs.createPath("/a", 1)); // true
console.log("Get '/a':", fs.get("/a")); // 1
console.log("Create '/leet', 1:", fs.createPath("/leet/code", 2)); // false

// =============================================================================
// 4. DESIGN A TIME BASED KEY-VALUE STORE
// =============================================================================

console.log("\n--- 4. DESIGN A TIME BASED KEY-VALUE STORE ---");

class TimeMap {
    constructor() {
        this.store = new Map(); // key -> [{timestamp, value}]
    }

    set(key, value, timestamp) {
        if (!this.store.has(key)) {
            this.store.set(key, []);
        }
        
        const entries = this.store.get(key);
        entries.push({ timestamp, value });
    }

    get(key, timestamp) {
        if (!this.store.has(key)) {
            return "";
        }
        
        const entries = this.store.get(key);
        
        // Binary search for the rightmost entry with timestamp <= given timestamp
        let left = 0;
        let right = entries.length - 1;
        let result = "";
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (entries[mid].timestamp <= timestamp) {
                result = entries[mid].value;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
}

// Test TimeMap
const timeMap = new TimeMap();
timeMap.set("foo", "bar", 1);
console.log("Get 'foo' at 1:", timeMap.get("foo", 1)); // "bar"
console.log("Get 'foo' at 3:", timeMap.get("foo", 3)); // "bar"
timeMap.set("foo", "bar2", 4);
console.log("Get 'foo' at 4:", timeMap.get("foo", 4)); // "bar2"
console.log("Get 'foo' at 5:", timeMap.get("foo", 5)); // "bar2"

// =============================================================================
// 5. DESIGN A RATE LIMITER
// =============================================================================

console.log("\n--- 5. DESIGN A RATE LIMITER ---");

class RateLimiter {
    constructor(maxRequests, timeWindow) {
        this.maxRequests = maxRequests;
        this.timeWindow = timeWindow;
        this.requests = new Map(); // clientId -> [timestamps]
    }

    shouldAllow(clientId) {
        const now = Date.now();
        
        if (!this.requests.has(clientId)) {
            this.requests.set(clientId, []);
        }
        
        const clientRequests = this.requests.get(clientId);
        
        // Remove old requests outside the time window
        while (clientRequests.length > 0 && clientRequests[0] <= now - this.timeWindow) {
            clientRequests.shift();
        }
        
        // Check if under limit
        if (clientRequests.length < this.maxRequests) {
            clientRequests.push(now);
            return true;
        }
        
        return false;
    }
}

// Test Rate Limiter
const rateLimiter = new RateLimiter(5, 60000); // 5 requests per minute

console.log("Allow client 1:", rateLimiter.shouldAllow(1)); // true
console.log("Allow client 1:", rateLimiter.shouldAllow(1)); // true
console.log("Allow client 1:", rateLimiter.shouldAllow(1)); // true
console.log("Allow client 1:", rateLimiter.shouldAllow(1)); // true
console.log("Allow client 1:", rateLimiter.shouldAllow(1)); // true
console.log("Allow client 1:", rateLimiter.shouldAllow(1)); // false (rate limited)

// =============================================================================
// 6. DESIGN A LRU CACHE (ADVANCED VERSION)
// =============================================================================

console.log("\n--- 6. DESIGN A LRU CACHE (ADVANCED VERSION) ---");

class LRUCacheAdvanced {
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

    // Additional methods for interview
    getMostRecent() {
        if (this.cache.size === 0) return null;
        const keys = [...this.cache.keys()];
        return keys[keys.length - 1];
    }

    getLeastRecent() {
        if (this.cache.size === 0) return null;
        return this.cache.keys().next().value;
    }

    getAllKeys() {
        return [...this.cache.keys()];
    }

    clear() {
        this.cache.clear();
    }
}

// Test Advanced LRU Cache
const lru = new LRUCacheAdvanced(2);
lru.put(1, 1);
lru.put(2, 2);
console.log("Get 1:", lru.get(1)); // 1
console.log("Most recent:", lru.getMostRecent()); // 1
console.log("Least recent:", lru.getLeastRecent()); // 2
lru.put(3, 3); // Evicts key 2
console.log("Get 2:", lru.get(2)); // -1 (not found)

// =============================================================================
// 7. DESIGN A HIT COUNTER
// =============================================================================

console.log("\n--- 7. DESIGN A HIT COUNTER ---");

class HitCounter {
    constructor() {
        this.hits = new Map(); // timestamp -> count
        this.total = 0;
    }

    hit(timestamp) {
        // Clean up old hits (older than 5 minutes)
        const cutoff = timestamp - 300;
        for (const [ts, count] of this.hits) {
            if (ts <= cutoff) {
                this.total -= count;
                this.hits.delete(ts);
            }
        }

        // Add new hit
        this.hits.set(timestamp, (this.hits.get(timestamp) || 0) + 1);
        this.total++;
    }

    getHits(timestamp) {
        // Clean up old hits
        const cutoff = timestamp - 300;
        for (const [ts, count] of this.hits) {
            if (ts <= cutoff) {
                this.total -= count;
                this.hits.delete(ts);
            }
        }

        return this.total;
    }
}

// Test Hit Counter
const counter = new HitCounter();
counter.hit(1);
counter.hit(2);
counter.hit(3);
console.log("Hits at 4:", counter.getHits(4)); // 3
counter.hit(300);
console.log("Hits at 301:", counter.getHits(301)); // 4 (hit at 1 is still counted)
console.log("Hits at 302:", counter.getHits(302)); // 3 (hit at 1 is now out of window)

// =============================================================================
// 8. DESIGN A CACHING SYSTEM FOR API RESPONSES
// =============================================================================

console.log("\n--- 8. DESIGN A CACHING SYSTEM FOR API RESPONSES ---");

class APICache {
    constructor(maxSize = 100, ttl = 300000) { // 5 minutes default TTL
        this.cache = new Map();
        this.maxSize = maxSize;
        this.ttl = ttl;
    }

    _isExpired(entry) {
        return Date.now() - entry.timestamp > this.ttl;
    }

    _evictExpired() {
        for (const [key, entry] of this.cache) {
            if (this._isExpired(entry)) {
                this.cache.delete(key);
            }
        }
    }

    _evictLRU() {
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
    }

    set(key, value) {
        this._evictExpired();
        this._evictLRU();

        this.cache.set(key, {
            value: value,
            timestamp: Date.now()
        });
    }

    get(key) {
        const entry = this.cache.get(key);
        
        if (!entry) {
            return null;
        }

        if (this._isExpired(entry)) {
            this.cache.delete(key);
            return null;
        }

        // Move to end (most recently used)
        const value = entry.value;
        this.cache.delete(key);
        this.cache.set(key, entry);
        
        return value;
    }

    clear() {
        this.cache.clear();
    }

    size() {
        this._evictExpired();
        return this.cache.size;
    }
}

// Test API Cache
const apiCache = new APICache(3, 1000); // 3 items, 1 second TTL
apiCache.set("user:1", { name: "Alice" });
apiCache.set("user:2", { name: "Bob" });
console.log("Get user:1:", apiCache.get("user:1")); // { name: "Alice" }

// Wait for expiration (in real scenario)
setTimeout(() => {
    console.log("Get user:1 after TTL:", apiCache.get("user:1")); // null (expired)
}, 1100);

// =============================================================================
// 9. DESIGN A SESSION MANAGER
// =============================================================================

console.log("\n--- 9. DESIGN A SESSION MANAGER ---");

class SessionManager {
    constructor(sessionTimeout = 1800000) { // 30 minutes default
        this.sessions = new Map(); // sessionId -> {data, lastAccessed}
        this.sessionTimeout = sessionTimeout;
    }

    generateSessionId() {
        return Math.random().toString(36).substr(2, 9);
    }

    createSession(userData) {
        const sessionId = this.generateSessionId();
        this.sessions.set(sessionId, {
            data: userData,
            lastAccessed: Date.now(),
            createdAt: Date.now()
        });
        return sessionId;
    }

    getSession(sessionId) {
        const session = this.sessions.get(sessionId);
        
        if (!session) {
            return null;
        }

        if (Date.now() - session.lastAccessed > this.sessionTimeout) {
            this.sessions.delete(sessionId);
            return null;
        }

        session.lastAccessed = Date.now();
        return session.data;
    }

    updateSession(sessionId, userData) {
        const session = this.sessions.get(sessionId);
        
        if (session) {
            session.data = userData;
            session.lastAccessed = Date.now();
            return true;
        }
        
        return false;
    }

    destroySession(sessionId) {
        return this.sessions.delete(sessionId);
    }

    cleanupExpiredSessions() {
        const now = Date.now();
        let cleaned = 0;
        
        for (const [sessionId, session] of this.sessions) {
            if (now - session.lastAccessed > this.sessionTimeout) {
                this.sessions.delete(sessionId);
                cleaned++;
            }
        }
        
        return cleaned;
    }

    getActiveSessionCount() {
        this.cleanupExpiredSessions();
        return this.sessions.size;
    }
}

// Test Session Manager
const sessionManager = new SessionManager(60000); // 1 minute timeout
const sessionId = sessionManager.createSession({ userId: 123, role: "admin" });
console.log("Created session:", sessionId);

console.log("Get session:", sessionManager.getSession(sessionId));
console.log("Active sessions:", sessionManager.getActiveSessionCount());

// =============================================================================
// 10. DESIGN A LEADERBOARD SYSTEM
// =============================================================================

console.log("\n--- 10. DESIGN A LEADERBOARD SYSTEM ---");

class Leaderboard {
    constructor() {
        this.scores = new Map(); // playerId -> score
        this.sortedPlayers = []; // Cache sorted list
        this.needsUpdate = false;
    }

    addScore(playerId, score) {
        const currentScore = this.scores.get(playerId) || 0;
        this.scores.set(playerId, currentScore + score);
        this.needsUpdate = true;
    }

    _updateSortedPlayers() {
        if (!this.needsUpdate) return;
        
        this.sortedPlayers = Array.from(this.scores.entries())
            .sort((a, b) => b[1] - a[1]); // Sort by score descending
        this.needsUpdate = false;
    }

    getTopK(k) {
        this._updateSortedPlayers();
        return this.sortedPlayers.slice(0, k);
    }

    getPlayerRank(playerId) {
        this._updateSortedPlayers();
        
        for (let i = 0; i < this.sortedPlayers.length; i++) {
            if (this.sortedPlayers[i][0] === playerId) {
                return i + 1; // 1-based ranking
            }
        }
        
        return -1; // Player not found
    }

    reset() {
        this.scores.clear();
        this.sortedPlayers = [];
        this.needsUpdate = false;
    }
}

// Test Leaderboard
const leaderboard = new Leaderboard();
leaderboard.addScore("player1", 100);
leaderboard.addScore("player2", 150);
leaderboard.addScore("player3", 80);
leaderboard.addScore("player1", 50); // player1 now has 150

console.log("Top 2 players:", leaderboard.getTopK(2));
console.log("Player1 rank:", leaderboard.getPlayerRank("player1"));
console.log("Player3 rank:", leaderboard.getPlayerRank("player3"));

console.log("\n✅ MAP INTERVIEW QUESTIONS COMPLETE!");
console.log("\n🎯 Interview Tips:");
console.log("• Always consider time and space complexity");
console.log("• Think about edge cases (empty data, duplicates, etc.)");
console.log("• Explain your thought process clearly");
console.log("• Consider using Maps for O(1) lookups and frequency counting");
console.log("• Practice implementing these data structures from scratch");
