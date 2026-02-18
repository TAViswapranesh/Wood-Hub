/* ===================================
   ADMIN DASHBOARD MODULE
   =================================== */
import orderService from '../../js/services/orderService.js';
import storageService from '../../js/services/storageService.js';

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
    const hardware = storageService.get('woodhub_admin_hardware') || [];
    return hardware.length;
}

/**
 * Get total count of gallery images
 * @returns {number}
 */
function getGalleryCount() {
    const gallery = storageService.get('woodhub_admin_gallery') || [];
    return gallery.length;
}

/**
 * Update dashboard statistics
 */
function updateDashboardStats() {
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
