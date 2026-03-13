import cartService from './services/cartService.js';
import orderService from './services/orderService.js';
import { updateCartCount } from './main.js';

document.addEventListener('DOMContentLoaded', () => {
    initCart();
});

function initCart() {
    renderCart();

    // Attach Global Event Listeners (Delegation)
    const cartBody = document.getElementById('cart-body');
    if (cartBody) {
        cartBody.addEventListener('click', (e) => {
            if (e.target.closest('.btn-remove')) {
                const btn = e.target.closest('.btn-remove');
                const index = parseInt(btn.dataset.index);
                removeItem(index);
            }
        });
    }

    const submitBtn = document.getElementById('submit-quotation-btn'); // Need to ID this in HTML
    if (submitBtn) {
        submitBtn.addEventListener('click', submitQuotation);
    }
}

function renderCart() {
    const cart = cartService.getCart();
    const tbody = document.getElementById('cart-body');
    const cartContent = document.getElementById('cart-content');
    const emptyState = document.getElementById('empty-state');

    if (!tbody || !cartContent || !emptyState) return;

    if (cart.length === 0) {
        cartContent.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    cartContent.style.display = 'block';
    emptyState.style.display = 'none';
    tbody.innerHTML = '';

    cart.forEach((item, index) => {
        let detailsStr = '';
        if (item.type === 'Hardware') {
            detailsStr = `Name: <b>${item.details.name}</b><br>Spec: ${item.details.spec}`;
        } else {
            for (const [key, val] of Object.entries(item.details)) {
                if (key && val) detailsStr += `<span style="text-transform: capitalize;">${key}:</span> <b>${val}</b><br>`;
            }
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-weight: 500; text-transform: capitalize;">${item.type || 'Custom Item'}</td>
            <td style="font-size: 0.95rem; line-height: 1.6;">${detailsStr}</td>
            <td>
                <button class="btn-remove" data-index="${index}" style="color: red; opacity: 0.7; border:none; background:none; cursor:pointer;">
                    <i class="fa-solid fa-trash"></i> Remove
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function removeItem(index) {
    cartService.removeFromCart(index);
    renderCart();
    updateCartCount();
}

function submitQuotation() {
    const cart = cartService.getCart();
    if (cart.length === 0) return;

    const user = orderService.getUser();

    if (!user) {
        // Prompt login if not logged in (optional based on requirements, but good practice)
        // For now, allow anonymous or rely on earlier checks.
        // The prompt "Do not lose data" implies robust handling.
        // Let's assume user must be logged in, or we just submit with "Guest".
        // Implementation plan said "customerData".
    }

    const customerData = user || { name: 'Guest', mobile: 'Not Provided' };

    try {
        orderService.submitOrder(cart, customerData);

        // UI Updates
        document.getElementById('cart-content').style.display = 'none';

        const successMsg = document.getElementById('success-message');
        if (successMsg) successMsg.style.display = 'block';

        updateCartCount();

    } catch (error) {
        console.error("Order Submission Failed", error);
        alert("Failed to submit order.");
    }
}
