/* ===================================
   ADMIN DASHBOARD MODULE
   =================================== */
import orderService from '../../js/services/orderService.js';
import hardwareService from '../../js/services/hardwareService.js';
import galleryService from '../../js/services/galleryService.js';

/**
 * Get total count of quotation requests
 * @returns {number}
 */
function getQuotationCount() {
    const orders = orderService.getAllOrders();
    return orders.length;
}

/**
 * Get total count of hardware items
 * @returns {number}
 */
function getHardwareCount() {
    const hardware = hardwareService.getAdminHardware();
    return hardware.length;
}

/**
 * Get total count of gallery images
 * @returns {number}
 */
function getGalleryCount() {
    const gallery = galleryService.getAdminGallery();
    return gallery.length;
}

/**
 * Get total count of messages
 * @returns {number}
 */
function getMessageCount() {
    const messages = orderService.getMessages();
    return messages.length;
}

/**
 * Update dashboard statistics
 */
function updateDashboardStats() {
    // In a real app, this would fetch from a database or respective services
    // Since we are mocking with localStorage via services, we get data from there.
    
    // Get Orders/Quotations
    const orderCount = getQuotationCount();

    // Get Hardware count
    const hardwareCount = getHardwareCount();

    // Get Gallery count
    const galleryCount = getGalleryCount();

    // Get Messages count
    const messageCount = getMessageCount();

    // Update quotation count
    const quotationElement = document.getElementById('quotation-count');
    if (quotationElement) {
        quotationElement.textContent = getQuotationCount();
    }

    // Update hardware count
    const hardwareElement = document.getElementById('hardware-count');
    if (hardwareElement) {
        hardwareElement.textContent = getHardwareCount();
    }

    // Update gallery count
    const galleryElement = document.getElementById('gallery-count');
    if (galleryElement) {
        galleryElement.textContent = getGalleryCount();
    }

    // Update message count
    const messageElement = document.getElementById('message-count');
    if (messageElement) {
        messageElement.textContent = getMessageCount();
    }
}

/**
 * Initialize dashboard
 */
function initDashboard() {
    // Note: protectRoute, setActiveNav, displayUserInfo, handleLogout are guaranteed 
    // to be available globally because admin-auth.js exposes them to window.
    // However, if we transition to pure modules, we should import them.
    // For now, assuming they are loaded in the HTML via script tags.

    if (window.protectRoute) window.protectRoute();
    if (window.setActiveNav) window.setActiveNav('dashboard.html');
    if (window.displayUserInfo) window.displayUserInfo();

    // Update statistics
    updateDashboardStats();

    // Setup logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn && window.handleLogout) {
        logoutBtn.addEventListener('click', window.handleLogout);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initDashboard);
