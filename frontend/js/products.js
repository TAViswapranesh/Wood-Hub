document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');

    // Update Page Title and Content based on 'type'
    if (type) {
        const formattedType = type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        const titleElement = document.getElementById('product-title');
        const imgElement = document.getElementById('product-image');

        if (titleElement) titleElement.textContent = formattedType;
        // In a real app, this would map to specific images
        // Asset Mapping
        const assetMap = {
            'door': '../assets/images/product/wood/door.jpg',
            'door-frame': '../assets/images/product/wood/doorframe.jpg',
            'window': '../assets/images/product/wood/window.jpg',
            'window-frame': '../assets/images/product/wood/windowframe.jpg',
            'sofa': '../assets/images/product/furniture/sofa.jpg',
            'bed': '../assets/images/product/furniture/bed.jpg',
            'table': '../assets/images/product/furniture/table.jpg',
            'chair': '../assets/images/product/furniture/customfurniture.jpg', // Fallback/Shared
            'cupboard': '../assets/images/product/furniture/cupboard.jpg',
            'custom': '../assets/images/product/furniture/customfurniture.jpg',
            'wood-cnc': '../assets/images/product/cnc/woodcnc.jpg',
            'metal-cnc': '../assets/images/product/cnc/metalcnc.jpg'
        };

        if (imgElement && assetMap[type]) {
            imgElement.src = assetMap[type];
        } else if (imgElement) {
            // Fallback for safety if type mismatch
            console.warn('Type not found in asset map:', type);
        }

        // Handle specific field logic
        handleSpecificFields(type);
    }

    // Form Submission
    const form = document.getElementById('quotation-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Check login status
            const isLoggedIn = localStorage.getItem('woodhub_user'); // Simplified check
            if (!isLoggedIn) {
                // Trigger login modal
                const loginModal = document.getElementById('login-modal');
                if (loginModal) loginModal.classList.add('active');
                return;
            }

            addToCart();
        });
    }
});

function handleSpecificFields(type) {
    const thicknessContainer = document.getElementById('thickness-group');
    const materialContainer = document.getElementById('material-group');

    // Wood Specifics
    if (type === 'door') {
        if (thicknessContainer) {
            thicknessContainer.innerHTML = `
                <label>Thickness (mm)</label>
                <select name="thickness" required>
                    <option value="1.5 inch">1.5 inches</option>
                    <option value="2 inch">2 inches</option>
                    <option value="3 inch">3 inches</option>
                </select>
            `;
        }
    } else if (type === 'door-frame' || type === 'window-frame' || type === 'window') {
        if (thicknessContainer) {
            thicknessContainer.innerHTML = `
                <label>Section Size</label>
                <select name="thickness" required>
                    <option value="4x3">4 x 3 inches</option>
                    <option value="5x3">5 x 3 inches</option>
                </select>
            `;
        }
    }

    // CNC Specifics
    if (type === 'wood-cnc') {
        if (materialContainer) {
            materialContainer.innerHTML = `
                <label>Material</label>
                <select name="material" required>
                    <option value="Teak">Teak</option>
                    <option value="Sal">Sal</option>
                    <option value="Ply">Ply</option>
                    <option value="MDF">MDF</option>
                </select>
            `;
        }
    } else if (type === 'metal-cnc') {
        if (materialContainer) {
            materialContainer.innerHTML = `
                <label>Material</label>
                <select name="material" required>
                    <option value="MS">Mild Steel (MS)</option>
                    <option value="SS">Stainless Steel (SS)</option>
                    <option value="Aluminum">Aluminum</option>
                </select>
            `;
        }
    }
}

function addToCart() {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type') || 'Custom Item';

    // Gather form data
    const formData = new FormData(document.getElementById('quotation-form'));
    const item = {
        id: Date.now(),
        type: type,
        details: {}
    };

    for (let [key, value] of formData.entries()) {
        item.details[key] = value;
    }

    // Save to local storage
    const cart = JSON.parse(localStorage.getItem('woodhub_cart')) || [];
    cart.push(item);
    localStorage.setItem('woodhub_cart', JSON.stringify(cart));

    // Update badge (mock)
    const count = document.querySelector('.cart-count');
    if (count) count.textContent = cart.length;

    alert('Added to Quotation Cart!');
    // Ideally reset form or redirect
}
