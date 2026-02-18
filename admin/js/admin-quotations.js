/* ===================================
   ADMIN QUOTATIONS VIEWER MODULE
   =================================== */
import orderService from '../../js/services/orderService.js';

/**
 * Get all quotation requests
 * @returns {Array}
 */
function getAllQuotations() {
    // Ensure we fetch latest orders
    return orderService.getAllOrders();
}

/**
 * Format quotation type for display
 * @param {string} type 
 * @returns {string}
 */
function formatQuotationType(type) {
    if (!type) return 'Unknown';
    return type.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

/**
 * Render quotations table
 */
function renderQuotationsTable() {
    const quotations = getAllQuotations();
    const container = document.getElementById('quotations-list');

    if (!container) return;

    if (quotations.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-invoice"></i>
                <p>No quotation requests yet.</p>
                <small style="color: var(--admin-text-tertiary);">
                    Quotations submitted by customers will appear here.
                </small>
            </div>
        `;
        return;
    }

    // Sort by date descending (newest first)
    quotations.sort((a, b) => new Date(b.date) - new Date(a.date));

    const tableHTML = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Date Submitted</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${quotations.map((quote) => `
                    <tr>
                        <td><strong>${quote.id}</strong></td>
                        <td>
                            ${quote.customer ? quote.customer.name : 'Guest'}<br>
                            <small>${quote.customer ? quote.customer.phone : ''}</small>
                        </td>
                        <td>
                            <span class="badge badge-primary">${quote.items.length} Items</span>
                        </td>
                        <td>${new Date(quote.date).toLocaleString()}</td>
                         <td>
                            <span class="badge badge-secondary">${quote.status || 'Pending'}</span>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-outline" onclick="window.viewQuotationDetails('${quote.id}')">
                                <i class="fas fa-eye"></i> Details
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    container.innerHTML = tableHTML;
}

/**
 * View quotation details in modal
 * @param {string} id 
 */
function viewQuotationDetails(id) {
    const quotations = getAllQuotations();
    const quote = quotations.find(q => q.id === id);

    if (!quote) return;

    const modal = document.getElementById('quotation-modal');
    const modalBody = document.getElementById('modal-quotation-details');

    if (!modal || !modalBody) return;

    // Build details HTML
    let detailsHTML = `
        <div style="margin-bottom: var(--admin-space-lg);">
            <h3 style="color: var(--admin-primary); margin-bottom: var(--admin-space-md);">
                Order #${quote.id}
            </h3>
            <p style="color: var(--admin-text-tertiary); font-size: var(--admin-font-sm);">
                Submitted: ${new Date(quote.date).toLocaleString()}
            </p>
             <p style="color: var(--admin-text-primary); margin-top: 0.5rem;">
                <strong>Status:</strong> ${quote.status}
            </p>
        </div>

        <h4 style="margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Customer Details</h4>
        <div class="admin-grid admin-grid-2" style="gap: var(--admin-space-md); margin-bottom: 2rem;">
            <div><strong>Name:</strong> ${quote.customer?.name || 'N/A'}</div>
            <div><strong>Phone:</strong> ${quote.customer?.phone || 'N/A'}</div>
            <div><strong>Email:</strong> ${quote.customer?.email || 'N/A'}</div>
        </div>
        
        <h4 style="margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Order Items</h4>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
    `;

    // Display items
    quote.items.forEach((item, index) => {
        let itemDetails = '';
        for (const [key, val] of Object.entries(item.details)) {
            if (key && val) itemDetails += `<div><span style="text-transform: capitalize; color: #666;">${key}:</span> <b>${val}</b></div>`;
        }

        detailsHTML += `
            <div style="padding: 1rem; background: #f9f9f9; border-radius: 8px;">
                <div style="font-weight: bold; margin-bottom: 0.5rem;">${index + 1}. ${formatQuotationType(item.type)}</div>
                <div style="font-size: 0.9rem;">${itemDetails}</div>
            </div>
        `;
    });

    detailsHTML += `</div>`;

    // Add Status Update Actions
    detailsHTML += `
        <div style="margin-top: 2rem; border-top: 1px solid #eee; padding-top: 1rem;">
             <h4 style="margin-bottom: 1rem;">Actions</h4>
             <div style="display: flex; gap: 1rem;">
                <button class="btn btn-success" onclick="window.updateStatus('${quote.id}', 'Approved')">Approve</button>
                <button class="btn btn-danger" onclick="window.updateStatus('${quote.id}', 'Rejected')">Reject</button>
                <button class="btn btn-primary" onclick="window.updateStatus('${quote.id}', 'Completed')">Mark Completed</button>
             </div>
        </div>
    `;

    modalBody.innerHTML = detailsHTML;
    modal.classList.add('active');
}

/**
 * Update Order Status
 * @param {string} id 
 * @param {string} status 
 */
function updateStatus(id, status) {
    if (confirm(`Are you sure you want to mark this order as ${status}?`)) {
        orderService.updateOrderStatus(id, status);
        closeQuotationModal();
        renderQuotationsTable();
        alert(`Order ${status} successfully!`);
    }
}

/**
 * Close modal
 */
function closeQuotationModal() {
    const modal = document.getElementById('quotation-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

/**
 * Initialize quotations page
 */
function initQuotationsPage() {
    if (window.protectRoute) window.protectRoute();
    if (window.setActiveNav) window.setActiveNav('quotations.html');
    if (window.displayUserInfo) window.displayUserInfo();

    // Setup logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn && window.handleLogout) {
        logoutBtn.addEventListener('click', window.handleLogout);
    }

    // Setup modal close
    const modalClose = document.getElementById('modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', closeQuotationModal);
    }

    const modal = document.getElementById('quotation-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeQuotationModal();
            }
        });
    }

    // Render quotations table
    renderQuotationsTable();
}

// Expose functions to window for onclick handlers
window.viewQuotationDetails = viewQuotationDetails;
window.updateStatus = updateStatus;

// Initialize on page load
document.addEventListener('DOMContentLoaded', initQuotationsPage);
