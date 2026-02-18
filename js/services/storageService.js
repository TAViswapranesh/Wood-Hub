/**
 * StorageService
 * Abstraction layer for localStorage interaction.
 * Handles JSON parsing/stringifying and error handling.
 */
class StorageService {
    constructor() {
        if (!window.localStorage) {
            console.error("StorageService: localStorage is not supported in this browser.");
        }
    }

    /**
     * Retrieve data from storage
     * @param {string} key 
     * @returns {any} Parsed data or null if not found
     */
    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error(`StorageService: Error parsing data for key "${key}"`, e);
            return null;
        }
    }

    /**
     * Save data to storage
     * @param {string} key 
     * @param {any} value 
     */
    set(key, value) {
        try {
            const stringValue = JSON.stringify(value);
            localStorage.setItem(key, stringValue);
        } catch (e) {
            console.error(`StorageService: Error saving data for key "${key}"`, e);
        }
    }

    /**
     * Remove data from storage
     * @param {string} key 
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error(`StorageService: Error removing data for key "${key}"`, e);
        }
    }

    /**
     * Clear all data (Use with caution)
     */
    clear() {
        localStorage.clear();
    }
}

// Export a singleton instance
const storageService = new StorageService();
// If using modules, we would use 'export default storageService;'
// For now, attaching to window or expecting global scope if loaded via script tag without type="module"
// But the plan implies modules or at least distinct files. 
// Given the constraints and browser target, we'll try to use ES modules if possible, 
// or just expose it globally if the user prefers simple script tags.
// The user prompt mentions "main.js" etc. I will assume ES Modules for cleaner architecture as requested "modular".
// However, existing HTML uses standard <script src="...">. I will try to convert to <script type="module"> in the HTML update phase.
// For now, I will use ES6 export syntax.

export default storageService;
