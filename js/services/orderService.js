import storageService from './storageService.js';
import cartService from './cartService.js';

/**
 * OrderService
 * Handles order submission, retrieval, and status updates.
 */
class OrderService {
    constructor() {
        this.STORAGE_KEY_ORDERS = 'woodhub_orders';
        this.STORAGE_KEY_CART = 'woodhub_cart';
    }

    /**
     * Submit a new order
     * @param {Array} cartItems 
     * @param {Object} customerData 
     * @returns {Object} The created order object
     */
    submitOrder(cartItems, customerData) {
        if (!cartItems || cartItems.length === 0) {
            throw new Error("Cannot submit empty order.");
        }

        const orders = storageService.get(this.STORAGE_KEY_ORDERS) || [];

        const newOrder = {
            id: 'ORD-' + Date.now(),
            date: new Date().toISOString(),
            customer: customerData,
            items: cartItems,
            status: 'Pending', // Pending, Approved, Rejected, Completed
            totalItems: cartItems.length
        };

        orders.push(newOrder);
        storageService.set(this.STORAGE_KEY_ORDERS, orders);

        // Clear cart after successful submission
        cartService.clearCart();

        return newOrder;
    }

    /**
     * Get all orders (for Admin)
     * @returns {Array} List of orders
     */
    getAllOrders() {
        return storageService.get(this.STORAGE_KEY_ORDERS) || [];
    }

    /**
     * Get a specific order by ID
     * @param {string} orderId 
     * @returns {Object|null}
     */
    getOrderById(orderId) {
        const orders = this.getAllOrders();
        return orders.find(o => o.id === orderId) || null;
    }

    /**
     * Update the status of an order
     * @param {string} orderId 
     * @param {string} newStatus 
     * @returns {boolean} True if updated, False if not found
     */
    updateOrderStatus(orderId, newStatus) {
        const orders = this.getAllOrders();
        const orderIndex = orders.findIndex(o => o.id === orderId);

        if (orderIndex !== -1) {
            orders[orderIndex].status = newStatus;
            orders[orderIndex].updatedAt = new Date().toISOString();
            storageService.set(this.STORAGE_KEY_ORDERS, orders);
            return true;
        }
        return false;
    }

    /**
     * Get orders for a specific customer (by phone or email if needed later)
     * @param {string} identifier 
     */
    getCustomerOrders(identifier) {
        // Implementation for future if needed
        const orders = this.getAllOrders();
        // ample implementation
        return orders.filter(o => o.customerRes?.phone === identifier);
    }

    // --- Strict Storage Compliance Methods ---

    // User Management
    getUser() { return storageService.get('woodhub_user'); }
    setUser(user) { storageService.set('woodhub_user', user); }

    // Admin Session Management
    getAdminSession() { return storageService.get('woodhub_admin_session'); }
    setAdminSession(session) { storageService.set('woodhub_admin_session', session); }
    clearAdminSession() { storageService.remove('woodhub_admin_session'); }

    // Messages Management
    getMessages() { return storageService.get('woodhub_messages') || []; }
    saveMessages(msgs) { storageService.set('woodhub_messages', msgs); }
    addMessage(msg) {
        const msgs = this.getMessages();
        msgs.push(msg);
        this.saveMessages(msgs);
    }
}

const orderService = new OrderService();
export default orderService;
