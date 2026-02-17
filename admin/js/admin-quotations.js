/* ===================================
   ADMIN QUOTATIONS VIEWER MODULE
   =================================== */

const QUOTATIONS_STORAGE_KEY = 'woodhub_cart';

/**
 * Get all quotation requests from customer site
 * @returns {Array}
 */
function getAllQuotations() {
    const data = localStorage.getItem(QUOTATIONS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

/**
 * Format quotation type for display
 * @param {string} type 
 * @returns {string}
 */
function formatQuotationType(type) {
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

    const tableHTML = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Product Type</th>
                    <th>Details</th>
                    <th>Date Submitted</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${quotations.map((quote, index) => `
                    <tr>
                        <td><strong>${index + 1}</strong></td>
                        <td>
                            <span class="badge badge-primary">${formatQuotationType(quote.type)}</span>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-outline" onclick="viewQuotationDetails(${quote.id})">
                                <i class="fas fa-eye"></i> View Details
                            </button>
                        </td>
                        <td>${new Date(quote.id).toLocaleString()}</td>
                        <td>
                            <button class="btn btn-sm btn-success" onclick="contactCustomer(${quote.id})">
                                <i class="fas fa-phone"></i> Contact
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
 * @param {number} id 
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
                ${formatQuotationType(quote.type)}
            </h3>
            <p style="color: var(--admin-text-tertiary); font-size: var(--admin-font-sm);">
                Submitted: ${new Date(quote.id).toLocaleString()}
            </p>
        </div>
        
        <div class="admin-grid admin-grid-2" style="gap: var(--admin-space-md);">
    `;

    // Display all details
    for (const [key, value] of Object.entries(quote.details)) {
        const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
        detailsHTML += `
            <div>
                <strong style="color: var(--admin-text-secondary); display: block; margin-bottom: var(--admin-space-xs);">
                    ${label}:
                </strong>
                <span style="color: var(--admin-text-primary);">${value || 'N/A'}</span>
            </div>
        `;
    }

    detailsHTML += `</div>`;

    modalBody.innerHTML = detailsHTML;
    modal.classList.add('active');
}

/**
 * Contact customer (placeholder)
 * @param {number} id 
 */
function contactCustomer(id) {
    const quotations = getAllQuotations();
    const quote = quotations.find(q => q.id === id);

    if (!quote) return;

    const phone = quote.details.phone || quote.details.contact;

    if (phone) {
        const message = `Hello! This is regarding your quotation request for ${formatQuotationType(quote.type)}.`;
        const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    } else {
        alert('No contact information available for this quotation.');
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
    // Protect route
    protectRoute();

    // Set active navigation
    setActiveNav('quotations.html');

    // Display user info
    displayUserInfo();

    // Setup logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', initQuotationsPage);
