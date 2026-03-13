import cartService from './services/cartService.js';
import hardwareService from './services/hardwareService.js';
import orderService from './services/orderService.js';
import { updateCartCount } from './main.js';

document.addEventListener('DOMContentLoaded', () => {
    initHardware();
});

function initHardware() {
    renderHardwareGrid();

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
}

function renderHardwareGrid() {
    const grid = document.querySelector('.hardware-grid');
    if (!grid) return;

    const products = hardwareService.getHardwareProducts();
    let html = '';

    products.forEach(item => {
        // Construct spec string
        let spec = item.size || '';
        if (item.color) {
            spec += (spec ? ' | ' : '') + item.color + ' Finish';
        }
        
        let specData = item.size || '';
        if (item.color) {
            specData += (specData ? ' - ' : '') + item.color;
        }

        const imageHtml = item.image ? `<img src="${item.image}" alt="${item.name}" class="hw-img">` : 
                          (item.thumbnail ? `<img src="${item.thumbnail}" alt="${item.name}" class="hw-img">` : '');

        html += `
            <div class="hw-card">
                ${imageHtml}
                <div class="hw-content">
                    <div class="hw-title">${item.name}</div>
                    <div class="hw-meta">${spec}</div>
                    <button class="btn btn-outline btn-add-cart"
                        style="width: 100%; padding: 6px; font-size: 0.9rem;" data-name="${item.name}"
                        data-spec="${specData}">Add to Quote</button>
                </div>
            </div>
        `;
    });

    grid.innerHTML = html;
}

function addToCart(name, spec) {
    const user = orderService.getUser();
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

    cartService.addToCart(item);

    updateCartCount();
    alert(`Added ${name} to Quotation!`);
}
