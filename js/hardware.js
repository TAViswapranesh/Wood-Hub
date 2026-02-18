import storageService from './services/storageService.js';
import { updateCartCount } from './main.js';

document.addEventListener('DOMContentLoaded', () => {
    initHardware();
});

function initHardware() {
    const grid = document.querySelector('.hardware-grid');
    if (grid) {
        grid.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-add-cart')) {
                const btn = e.target;
                const name = btn.dataset.name;
                const spec = btn.dataset.spec;
                addToCart(name, spec);
            }
        });
    }

    // Handle modal login form if present and distinct from main.js
    // If main.js handles 'login-form', then we should rename id in html to 'login-form'
    // But hardware.html might have 'login-form-modal'.
    // We will standardize ID in HTML to 'login-form' so main.js handles it.
}

function addToCart(name, spec) {
    const user = storageService.get('woodhub_user');
    if (!user) {
        const modal = document.getElementById('login-modal');
        if (modal) modal.classList.add('active');
        return;
    }

    const item = {
        id: Date.now(),
        type: 'Hardware',
        details: {
            name: name,
            spec: spec,
            quantity: 1
        }
    };

    const cart = storageService.get('woodhub_cart') || [];
    cart.push(item);
    storageService.set('woodhub_cart', cart);

    updateCartCount();
    alert(`Added ${name} to Quotation!`);
}
