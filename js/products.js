import { productAssetMap, getProductConfig, products } from './data/productsData.js';
import cartService from './services/cartService.js';
import orderService from './services/orderService.js';
import { updateCartCount } from './main.js';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');

    if (type) {
        renderProductPage(type);
    }

    initQuotationForm();
});

function renderProductPage(type) {
    // Format Title: 'wood-cnc' -> 'Wood Cnc'
    const formattedType = type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const titleElement = document.getElementById('product-title');
    const imgElement = document.getElementById('product-image');

    if (titleElement) titleElement.textContent = formattedType;

    if (imgElement && productAssetMap[type]) {
        imgElement.src = productAssetMap[type];
    }

    renderSpecificFields(type);
}

function renderSpecificFields(type) {
    const config = getProductConfig(type);
    if (!config) return;

    // We assume the HTML has containers for these. 
    // In the existing code, it targeted specific IDs like 'thickness-group' or 'material-group'.
    // We should be dynamic or map field IDs to container IDs.
    // Existing code: thickness-group, material-group.

    config.fields.forEach(field => {
        // Determine container based on field ID or type
        // This is a bit rigid based on current HTML, but robust for this refactor.
        let containerId = '';

        if (field.id === 'thickness') containerId = 'thickness-group';
        else if (field.id === 'material') containerId = 'material-group';

        const container = document.getElementById(containerId);
        if (container) {
            let optionsHtml = field.options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');
            container.innerHTML = `
                <label>${field.label}</label>
                <select name="${field.id}" required>
                    ${optionsHtml}
                </select>
            `;
        }
    });
}

function initQuotationForm() {
    const form = document.getElementById('quotation-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Check auth state
            const user = orderService.getUser();
            if (!user) {
                alert('Please register/login using the profile icon first to request quotes.');
                // Optionally, show login modal if desired, but alert is simpler for now.
                // const loginModal = document.getElementById('login-modal');
                // if (loginModal) loginModal.classList.add('active');
                return;
            }

            addToCart(form);
        });
    }
}

function addToCart(form) {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type') || 'Custom Item';

    const formData = new FormData(form);
    const item = {
        id: Date.now(),
        type: type,
        details: {}
    };

    for (let [key, value] of formData.entries()) {
        item.details[key] = value;
    }

    cartService.addToCart(item);

    updateCartCount();
    alert('Added to Quotation Cart!');
    form.reset();
}
