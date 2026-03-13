import storageService from './storageService.js';

class CartService {
    constructor() {
        this.STORAGE_KEY = 'woodhub_cart';
    }

    /**
     * Get all items in the cart
     * @returns {Array} List of cart items
     */
    getCart() {
        return storageService.get(this.STORAGE_KEY) || [];
    }

    /**
     * Add an item to the cart
     * @param {Object} item The item to add
     */
    addToCart(item) {
        const cart = this.getCart();
        cart.push(item);
        storageService.set(this.STORAGE_KEY, cart);
    }

    /**
     * Remove an item from the cart by index
     * @param {number} index Index of the item to remove
     */
    removeFromCart(index) {
        const cart = this.getCart();
        if (index >= 0 && index < cart.length) {
            cart.splice(index, 1);
            storageService.set(this.STORAGE_KEY, cart);
        }
    }

    /**
     * Update an item in the cart by index
     * @param {number} index Index of the item to update
     * @param {Object} item The new item data
     */
    updateCartItem(index, item) {
        const cart = this.getCart();
        if (index >= 0 && index < cart.length) {
            cart[index] = item;
            storageService.set(this.STORAGE_KEY, cart);
        }
    }

    /**
     * Clear all items in the cart
     */
    clearCart() {
        storageService.remove(this.STORAGE_KEY);
    }

    /**
     * Get the total number of items in the cart
     * @returns {number} Cart item count
     */
    getCartCount() {
        return this.getCart().length;
    }
}

const cartService = new CartService();
export default cartService;
