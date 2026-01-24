// =============================================================================
// DSA SET - ADVANCED APPLICATIONS WITH DETAILED COMMENTS
// Complex Real-world Applications and Algorithms
// =============================================================================

console.log("=== DSA SET - ADVANCED APPLICATIONS ===");

// =============================================================================
// 1. SET-BASED CACHE IMPLEMENTATION
// =============================================================================

console.log("\n--- 1. SET-BASED CACHE IMPLEMENTATION ---");

/*
SET-BASED CACHE CONCEPT:
Using Set to implement a simple cache that tracks recently accessed items.
This is different from LRU cache - it just tracks uniqueness without ordering.
*/

class SimpleCache {
    constructor(maxSize = 100) {
        this.cache = new Set();
        this.maxSize = maxSize;
    }

    // Add item to cache
    add(item) {
        if (this.cache.size >= this.maxSize) {
            // Remove the first item (FIFO - First In, First Out)
            const firstItem = this.cache.values().next().value;
            this.cache.delete(firstItem);
        }
        this.cache.add(item);
    }

    // Check if item exists in cache
    has(item) {
        return this.cache.has(item);
    }

    // Remove specific item
    remove(item) {
        return this.cache.delete(item);
    }

    // Clear cache
    clear() {
        this.cache.clear();
    }

    // Get cache size
    size() {
        return this.cache.size;
    }

    // Get all cached items
    getAll() {
        return Array.from(this.cache);
    }
}

// Test the cache
const cache = new SimpleCache(3);
cache.add("item1");
cache.add("item2");
cache.add("item3");
console.log("Cache after adding 3 items:", cache.getAll());

cache.add("item4"); // Should remove item1 (FIFO)
console.log("Cache after adding item4:", cache.getAll());
console.log("Has item2:", cache.has("item2")); // true
console.log("Has item1:", cache.has("item1")); // false (was removed)

// =============================================================================
// 2. SET-BASED PERMISSION SYSTEM
// =============================================================================

console.log("\n--- 2. SET-BASED PERMISSION SYSTEM ---");

/*
PERMISSION SYSTEM CONCEPT:
Using Set to manage user permissions for fast lookup and easy management.
Sets are perfect for this because:
- Permissions are unique (a user either has or doesn't have a permission)
- Fast O(1) lookup for permission checking
- Easy to add/remove permissions
*/

class PermissionSystem {
    constructor() {
        this.userPermissions = new Map(); // userId -> Set of permissions
        this.rolePermissions = new Map(); // role -> Set of permissions
    }

    // Define role permissions
    defineRole(role, permissions) {
        this.rolePermissions.set(role, new Set(permissions));
    }

    // Assign role to user
    assignRole(userId, role) {
        const rolePerms = this.rolePermissions.get(role);
        if (rolePerms) {
            if (!this.userPermissions.has(userId)) {
                this.userPermissions.set(userId, new Set());
            }
            // Add all role permissions to user permissions
            for (const perm of rolePerms) {
                this.userPermissions.get(userId).add(perm);
            }
        }
    }

    // Grant specific permission to user
    grantPermission(userId, permission) {
        if (!this.userPermissions.has(userId)) {
            this.userPermissions.set(userId, new Set());
        }
        this.userPermissions.get(userId).add(permission);
    }

    // Revoke permission from user
    revokePermission(userId, permission) {
        if (this.userPermissions.has(userId)) {
            this.userPermissions.get(userId).delete(permission);
        }
    }

    // Check if user has permission
    hasPermission(userId, permission) {
        return this.userPermissions.has(userId) && 
               this.userPermissions.get(userId).has(permission);
    }

    // Get all user permissions
    getUserPermissions(userId) {
        return this.userPermissions.has(userId) ? 
               Array.from(this.userPermissions.get(userId)) : [];
    }

    // Check multiple permissions (AND operation)
    hasAllPermissions(userId, permissions) {
        if (!this.userPermissions.has(userId)) return false;
        const userPerms = this.userPermissions.get(userId);
        return permissions.every(perm => userPerms.has(perm));
    }

    // Check if user has any of the permissions (OR operation)
    hasAnyPermission(userId, permissions) {
        if (!this.userPermissions.has(userId)) return false;
        const userPerms = this.userPermissions.get(userId);
        return permissions.some(perm => userPerms.has(perm));
    }
}

// Test permission system
const permissionSystem = new PermissionSystem();

// Define roles
permissionSystem.defineRole("admin", ["read", "write", "delete", "manage_users"]);
permissionSystem.defineRole("editor", ["read", "write"]);
permissionSystem.defineRole("viewer", ["read"]);

// Assign roles to users
permissionSystem.assignRole("user1", "admin");
permissionSystem.assignRole("user2", "editor");
permissionSystem.assignRole("user3", "viewer");

// Grant additional permission
permissionSystem.grantPermission("user2", "publish");

// Test permissions
console.log("User1 can delete:", permissionSystem.hasPermission("user1", "delete")); // true
console.log("User2 can delete:", permissionSystem.hasPermission("user2", "delete")); // false
console.log("User2 can publish:", permissionSystem.hasPermission("user2", "publish")); // true
console.log("User3 can write:", permissionSystem.hasPermission("user3", "write")); // false

// Test multiple permissions
console.log("User1 has all [read, write]:", permissionSystem.hasAllPermissions("user1", ["read", "write"])); // true
console.log("User2 has any [delete, publish]:", permissionSystem.hasAnyPermission("user2", ["delete", "publish"])); // true

// =============================================================================
// 3. SET-BASED DEPENDENCY GRAPH
// =============================================================================

console.log("\n--- 3. SET-BASED DEPENDENCY GRAPH ---");

/*
DEPENDENCY GRAPH CONCEPT:
Using Set to manage dependencies between tasks/modules.
Sets help track dependencies efficiently and detect circular dependencies.
*/

class DependencyGraph {
    constructor() {
        this.dependencies = new Map(); // node -> Set of dependencies
        this.dependents = new Map(); // node -> Set of nodes that depend on this
    }

    // Add dependency (node depends on dependency)
    addDependency(node, dependency) {
        // Add to dependencies map
        if (!this.dependencies.has(node)) {
            this.dependencies.set(node, new Set());
        }
        this.dependencies.get(node).add(dependency);

        // Add to dependents map
        if (!this.dependents.has(dependency)) {
            this.dependents.set(dependency, new Set());
        }
        this.dependents.get(dependency).add(node);
    }

    // Get all dependencies of a node
    getDependencies(node) {
        return this.dependencies.has(node) ? 
               Array.from(this.dependencies.get(node)) : [];
    }

    // Get all nodes that depend on this node
    getDependents(node) {
        return this.dependents.has(node) ? 
               Array.from(this.dependents.get(node)) : [];
    }

    // Check if there's a circular dependency
    hasCircularDependency() {
        const visited = new Set();
        const recursionStack = new Set();

        const hasCycle = (node) => {
            if (recursionStack.has(node)) {
                return true; // Found cycle
            }
            if (visited.has(node)) {
                return false; // Already processed
            }

            visited.add(node);
            recursionStack.add(node);

            const deps = this.dependencies.get(node) || new Set();
            for (const dep of deps) {
                if (hasCycle(dep)) {
                    return true;
                }
            }

            recursionStack.delete(node);
            return false;
        };

        for (const node of this.dependencies.keys()) {
            if (!visited.has(node) && hasCycle(node)) {
                return true;
            }
        }
        return false;
    }

    // Get execution order (topological sort)
    getExecutionOrder() {
        const visited = new Set();
        const result = [];

        const visit = (node) => {
            if (visited.has(node)) return;
            
            visited.add(node);
            const deps = this.dependencies.get(node) || new Set();
            
            // Visit all dependencies first
            for (const dep of deps) {
                visit(dep);
            }
            
            result.push(node);
        };

        for (const node of this.dependencies.keys()) {
            visit(node);
        }

        return result;
    }
}

// Test dependency graph
const depGraph = new DependencyGraph();
depGraph.addDependency("C", "A");
depGraph.addDependency("C", "B");
depGraph.addDependency("D", "C");
depGraph.addDependency("E", "D");

console.log("Dependencies of C:", depGraph.getDependencies("C")); // ["A", "B"]
console.log("Dependents of C:", depGraph.getDependents("C")); // ["D"]
console.log("Has circular dependency:", depGraph.hasCircularDependency()); // false
console.log("Execution order:", depGraph.getExecutionOrder()); // ["A", "B", "C", "D", "E"]

// Add circular dependency
depGraph.addDependency("A", "E");
console.log("Has circular dependency after adding A->E:", depGraph.hasCircularDependency()); // true

// =============================================================================
// 4. SET-BASED TAG SYSTEM
// =============================================================================

console.log("\n--- 4. SET-BASED TAG SYSTEM ---");

/*
TAG SYSTEM CONCEPT:
Using Set to implement a flexible tagging system for content categorization.
Sets are perfect for tags because:
- Tags should be unique per item
- Fast tag lookup and filtering
- Easy to add/remove tags
- Efficient tag intersection operations
*/

class TagSystem {
    constructor() {
        this.itemTags = new Map(); // itemId -> Set of tags
        this.tagItems = new Map(); // tag -> Set of items with this tag
    }

    // Add tag to item
    addTag(itemId, tag) {
        // Add to item's tags
        if (!this.itemTags.has(itemId)) {
            this.itemTags.set(itemId, new Set());
        }
        this.itemTags.get(itemId).add(tag);

        // Add to tag's items
        if (!this.tagItems.has(tag)) {
            this.tagItems.set(tag, new Set());
        }
        this.tagItems.get(tag).add(itemId);
    }

    // Remove tag from item
    removeTag(itemId, tag) {
        // Remove from item's tags
        if (this.itemTags.has(itemId)) {
            this.itemTags.get(itemId).delete(tag);
        }

        // Remove from tag's items
        if (this.tagItems.has(tag)) {
            this.tagItems.get(tag).delete(itemId);
        }
    }

    // Get all tags for an item
    getItemTags(itemId) {
        return this.itemTags.has(itemId) ? 
               Array.from(this.itemTags.get(itemId)) : [];
    }

    // Get all items with a specific tag
    getItemsWithTag(tag) {
        return this.tagItems.has(tag) ? 
               Array.from(this.tagItems.get(tag)) : [];
    }

    // Get items with multiple tags (AND operation)
    getItemsWithAllTags(tags) {
        if (tags.length === 0) return [];

        // Start with items that have the first tag
        const result = new Set(this.tagItems.get(tags[0]) || new Set());

        // Intersect with items that have other tags
        for (let i = 1; i < tags.length; i++) {
            const itemsWithTag = this.tagItems.get(tags[i]) || new Set();
            for (const item of result) {
                if (!itemsWithTag.has(item)) {
                    result.delete(item);
                }
            }
        }

        return Array.from(result);
    }

    // Get items with any of the tags (OR operation)
    getItemsWithAnyTag(tags) {
        const result = new Set();
        for (const tag of tags) {
            const items = this.tagItems.get(tag) || new Set();
            for (const item of items) {
                result.add(item);
            }
        }
        return Array.from(result);
    }

    // Get related items (items that share at least one tag)
    getRelatedItems(itemId) {
        const itemTags = this.itemTags.get(itemId) || new Set();
        return this.getItemsWithAnyTag(Array.from(itemTags)).filter(id => id !== itemId);
    }

    // Get all tags
    getAllTags() {
        return Array.from(this.tagItems.keys());
    }

    // Get tag popularity (number of items per tag)
    getTagPopularity() {
        const popularity = new Map();
        for (const [tag, items] of this.tagItems) {
            popularity.set(tag, items.size);
        }
        return popularity;
    }
}

// Test tag system
const tagSystem = new TagSystem();

// Add tags to items
tagSystem.addTag("item1", "javascript");
tagSystem.addTag("item1", "tutorial");
tagSystem.addTag("item1", "beginner");

tagSystem.addTag("item2", "javascript");
tagSystem.addTag("item2", "advanced");
tagSystem.addTag("item2", "performance");

tagSystem.addTag("item3", "python");
tagSystem.addTag("item3", "tutorial");
tagSystem.addTag("item3", "data-science");

tagSystem.addTag("item4", "javascript");
tagSystem.addTag("item4", "tutorial");

console.log("Tags for item1:", tagSystem.getItemTags("item1"));
console.log("Items with 'javascript' tag:", tagSystem.getItemsWithTag("javascript"));
console.log("Items with all tags ['javascript', 'tutorial']:", tagSystem.getItemsWithAllTags(["javascript", "tutorial"]));
console.log("Items with any tags ['python', 'javascript']:", tagSystem.getItemsWithAnyTag(["python", "javascript"]));
console.log("Related items to item1:", tagSystem.getRelatedItems("item1"));
console.log("Tag popularity:", tagSystem.getTagPopularity());

// =============================================================================
// 5. SET-BASED EVENT SYSTEM
// =============================================================================

console.log("\n--- 5. SET-BASED EVENT SYSTEM ---");

/*
EVENT SYSTEM CONCEPT:
Using Set to manage event listeners and prevent duplicate registrations.
Sets ensure each listener is registered only once per event type.
*/

class EventSystem {
    constructor() {
        this.listeners = new Map(); // event -> Set of listeners
    }

    // Add event listener
    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        
        // Check if listener already exists to prevent duplicates
        if (this.listeners.get(event).has(listener)) {
            console.log(`Listener already registered for event: ${event}`);
            return false;
        }
        
        this.listeners.get(event).add(listener);
        console.log(`Listener added for event: ${event}`);
        return true;
    }

    // Remove event listener
    off(event, listener) {
        if (this.listeners.has(event)) {
            const removed = this.listeners.get(event).delete(listener);
            if (removed) {
                console.log(`Listener removed for event: ${event}`);
            }
            
            // Clean up empty event sets
            if (this.listeners.get(event).size === 0) {
                this.listeners.delete(event);
            }
            return removed;
        }
        return false;
    }

    // Emit event to all listeners
    emit(event, ...args) {
        if (!this.listeners.has(event)) {
            console.log(`No listeners for event: ${event}`);
            return;
        }

        console.log(`Emitting event: ${event} to ${this.listeners.get(event).size} listeners`);
        
        // Create a copy of listeners to avoid issues if listeners are modified during iteration
        const listeners = Array.from(this.listeners.get(event));
        
        for (const listener of listeners) {
            try {
                listener(...args);
            } catch (error) {
                console.error(`Error in listener for event ${event}:`, error);
            }
        }
    }

    // Get number of listeners for an event
    listenerCount(event) {
        return this.listeners.has(event) ? this.listeners.get(event).size : 0;
    }

    // Get all event names
    eventNames() {
        return Array.from(this.listeners.keys());
    }

    // Remove all listeners for an event
    removeAllListeners(event) {
        if (this.listeners.has(event)) {
            const count = this.listeners.get(event).size;
            this.listeners.delete(event);
            console.log(`Removed ${count} listeners for event: ${event}`);
            return count;
        }
        return 0;
    }

    // Remove all listeners for all events
    clear() {
        const totalListeners = Array.from(this.listeners.values())
            .reduce((total, set) => total + set.size, 0);
        this.listeners.clear();
        console.log(`Cleared ${totalListeners} listeners for all events`);
    }
}

// Test event system
const eventSystem = new EventSystem();

// Define listeners
const listener1 = (data) => console.log("Listener 1 received:", data);
const listener2 = (data) => console.log("Listener 2 received:", data);
const listener3 = (data) => console.log("Listener 3 received:", data);

// Add listeners
eventSystem.on("data", listener1);
eventSystem.on("data", listener2);
eventSystem.on("click", listener3);

// Try to add duplicate listener
eventSystem.on("data", listener1); // Should be ignored

// Emit events
eventSystem.emit("data", "Hello World!");
eventSystem.emit("click", { x: 100, y: 200 });

// Check listener counts
console.log("Data event listeners:", eventSystem.listenerCount("data"));
console.log("Click event listeners:", eventSystem.listenerCount("click"));

// Remove listener
eventSystem.off("data", listener1);
console.log("Data listeners after removing listener1:", eventSystem.listenerCount("data"));

// =============================================================================
// 6. SET-BASED STATE MANAGEMENT
// =============================================================================

console.log("\n--- 6. SET-BASED STATE MANAGEMENT ---");

/*
STATE MANAGEMENT CONCEPT:
Using Set to manage application state, particularly for tracking active items,
selected items, or loading states efficiently.
*/

class StateManager {
    constructor() {
        this.state = {
            selectedItems: new Set(),
            activeUsers: new Set(),
            loadingOperations: new Set(),
            errorMessages: new Map(), // operation -> error message
            completedTasks: new Set()
        };
    }

    // Selected items management
    selectItem(itemId) {
        this.state.selectedItems.add(itemId);
    }

    deselectItem(itemId) {
        this.state.selectedItems.delete(itemId);
    }

    toggleItemSelection(itemId) {
        if (this.state.selectedItems.has(itemId)) {
            this.state.selectedItems.delete(itemId);
        } else {
            this.state.selectedItems.add(itemId);
        }
    }

    isItemSelected(itemId) {
        return this.state.selectedItems.has(itemId);
    }

    getSelectedItems() {
        return Array.from(this.state.selectedItems);
    }

    clearSelection() {
        this.state.selectedItems.clear();
    }

    // Active users management
    addUser(userId) {
        this.state.activeUsers.add(userId);
    }

    removeUser(userId) {
        this.state.activeUsers.delete(userId);
    }

    isUserActive(userId) {
        return this.state.activeUsers.has(userId);
    }

    getActiveUserCount() {
        return this.state.activeUsers.size;
    }

    // Loading operations management
    startLoading(operation) {
        this.state.loadingOperations.add(operation);
        this.state.errorMessages.delete(operation); // Clear any previous errors
    }

    stopLoading(operation) {
        this.state.loadingOperations.delete(operation);
    }

    isLoading(operation) {
        return this.state.loadingOperations.has(operation);
    }

    isAnyLoading() {
        return this.state.loadingOperations.size > 0;
    }

    getLoadingOperations() {
        return Array.from(this.state.loadingOperations);
    }

    // Error management
    setError(operation, errorMessage) {
        this.state.errorMessages.set(operation, errorMessage);
        this.state.loadingOperations.delete(operation);
    }

    clearError(operation) {
        this.state.errorMessages.delete(operation);
    }

    hasError(operation) {
        return this.state.errorMessages.has(operation);
    }

    getError(operation) {
        return this.state.errorMessages.get(operation);
    }

    // Task completion tracking
    completeTask(taskId) {
        this.state.completedTasks.add(taskId);
    }

    isTaskCompleted(taskId) {
        return this.state.completedTasks.has(taskId);
    }

    getCompletedTasks() {
        return Array.from(this.state.completedTasks);
    }

    // Get overall state summary
    getStateSummary() {
        return {
            selectedCount: this.state.selectedItems.size,
            activeUserCount: this.state.activeUsers.size,
            loadingOperations: this.state.loadingOperations.size,
            errorCount: this.state.errorMessages.size,
            completedTaskCount: this.state.completedTasks.size
        };
    }
}

// Test state manager
const stateManager = new StateManager();

// Test item selection
stateManager.selectItem("item1");
stateManager.selectItem("item2");
stateManager.selectItem("item3");
console.log("Selected items:", stateManager.getSelectedItems());
console.log("Is item2 selected:", stateManager.isItemSelected("item2"));

stateManager.toggleItemSelection("item2"); // Should deselect
console.log("Selected items after toggle item2:", stateManager.getSelectedItems());

// Test active users
stateManager.addUser("user1");
stateManager.addUser("user2");
console.log("Active user count:", stateManager.getActiveUserCount());
console.log("Is user1 active:", stateManager.isUserActive("user1"));

// Test loading operations
stateManager.startLoading("fetchData");
stateManager.startLoading("uploadFile");
console.log("Is fetchData loading:", stateManager.isLoading("fetchData"));
console.log("Is any loading:", stateManager.isAnyLoading());

stateManager.stopLoading("fetchData");
console.log("Loading operations after stopping fetchData:", stateManager.getLoadingOperations());

// Test state summary
console.log("State summary:", stateManager.getStateSummary());

console.log("\n✅ ADVANCED SET APPLICATIONS COMPLETE!");
console.log("\n🎯 KEY TAKEAWAYS:");
console.log("• Sets are perfect for managing unique collections");
console.log("• Excellent for permission systems and dependency tracking");
console.log("• Ideal for tag systems and event listener management");
console.log("• Great for state management with boolean conditions");
console.log("• Provide O(1) operations for most use cases");
