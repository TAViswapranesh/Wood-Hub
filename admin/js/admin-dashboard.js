/* ===================================
   ADMIN DASHBOARD MODULE
   =================================== */

/**
 * Get total count of quotation requests
 * @returns {number}
 */
function getQuotationCount() {
    const cart = JSON.parse(localStorage.getItem('woodhub_cart')) || [];
    return cart.length;
}

/**
 * Get total count of hardware items
 * @returns {number}
 */
function getHardwareCount() {
    const hardware = JSON.parse(localStorage.getItem('woodhub_admin_hardware')) || [];
    return hardware.length;
}

/**
 * Get total count of gallery images
 * @returns {number}
 */
function getGalleryCount() {
    const gallery = JSON.parse(localStorage.getItem('woodhub_admin_gallery')) || [];
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
    // Protect route
    protectRoute();

    // Set active navigation
    setActiveNav('dashboard.html');

    // Display user info
    displayUserInfo();

    // Update statistics
    updateDashboardStats();

    // Setup logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initDashboard);
