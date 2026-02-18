/* ===================================
   ADMIN HARDWARE MANAGEMENT MODULE
   =================================== */
import storageService from '../../js/services/storageService.js';

const HARDWARE_STORAGE_KEY = 'woodhub_admin_hardware';

// Hardware categories
const HARDWARE_CATEGORIES = [
    'Door',
    'Window',
    'Kitchen',
    'Cupboard',
    'Furniture',
    'Others'
];

/**
 * Get all hardware items from storage
 * @returns {Array}
 */
function getAllHardware() {
    return storageService.get(HARDWARE_STORAGE_KEY) || [];
}

/**
 * Save hardware items to storage
 * @param {Array} items 
 */
function saveHardware(items) {
    storageService.set(HARDWARE_STORAGE_KEY, items);
}

/**
 * Add new hardware item
 * @param {Object} item 
 */
function addHardwareItem(item) {
    const items = getAllHardware();
    const newItem = {
        id: Date.now(),
        ...item,
        dateAdded: new Date().toISOString()
    };
    items.push(newItem);
    saveHardware(items);
    return newItem;
}

/**
 * Update existing hardware item
 * @param {number} id 
 * @param {Object} updatedData 
 */
function updateHardwareItem(id, updatedData) {
    const items = getAllHardware();
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        items[index] = { ...items[index], ...updatedData };
        saveHardware(items);
        return items[index];
    }
    return null;
}

/**
 * Delete hardware item
 * @param {number} id 
 */
function deleteHardwareItem(id) {
    const items = getAllHardware();
    const filtered = items.filter(item => item.id !== id);
    saveHardware(filtered);
}

/**
 * Get single hardware item by ID
 * @param {number} id 
 * @returns {Object|null}
 */
function getHardwareById(id) {
    const items = getAllHardware();
    return items.find(item => item.id === id) || null;
}

/**
 * Handle image file selection
 * @param {Event} event 
 */
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
    }

    // Read and preview image
    const reader = new FileReader();
    reader.onload = function (e) {
        const preview = document.getElementById('image-preview');
        if (preview) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            preview.style.display = 'block';
        }
        // Store base64 in hidden field or form data
        const imageDataField = document.getElementById('image-data');
        if (imageDataField) {
            imageDataField.value = e.target.result;
        }
    };
    reader.readAsDataURL(file);
}

/**
 * Render hardware list
 */
function renderHardwareList() {
    const items = getAllHardware();
    const container = document.getElementById('hardware-list');

    if (!container) return;

    if (items.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-tools"></i>
                <p>No hardware items yet. Add your first item!</p>
            </div>
        `;
        return;
    }

    const tableHTML = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Subcategory</th>
                    <th>Size</th>
                    <th>Color</th>
                    <th>Date Added</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${items.map(item => `
                    <tr>
                        <td>
                            ${item.image ? `<img src="${item.image}" alt="${item.name}">` : '<i class="fas fa-image"></i>'}
                        </td>
                        <td><strong>${item.name}</strong></td>
                        <td><span class="badge badge-primary">${item.category}</span></td>
                        <td>${item.subcategory || '-'}</td>
                        <td>${item.size || '-'}</td>
                        <td>${item.color || '-'}</td>
                        <td>${new Date(item.dateAdded).toLocaleDateString()}</td>
                        <td>
                            <button class="btn btn-sm btn-secondary" onclick="window.editHardware(${item.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="window.confirmDeleteHardware(${item.id})">
                                <i class="fas fa-trash"></i>
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
 * Handle form submission
 * @param {Event} event 
 */
function handleHardwareFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const imageData = document.getElementById('image-data').value;

    const hardwareData = {
        name: formData.get('name'),
        category: formData.get('category'),
        subcategory: formData.get('subcategory'),
        size: formData.get('size'),
        color: formData.get('color'),
        image: imageData || null
    };

    const editId = document.getElementById('edit-id').value;

    if (editId) {
        // Update existing item
        updateHardwareItem(parseInt(editId), hardwareData);
        alert('Hardware item updated successfully!');
    } else {
        // Add new item
        addHardwareItem(hardwareData);
        alert('Hardware item added successfully!');
    }

    // Reset form and refresh list
    event.target.reset();
    document.getElementById('image-preview').style.display = 'none';
    document.getElementById('image-data').value = '';
    document.getElementById('edit-id').value = '';
    document.getElementById('form-title').textContent = 'Add New Hardware';
    document.getElementById('submit-btn').innerHTML = '<i class="fas fa-plus"></i> Add Hardware';

    renderHardwareList();
}

/**
 * Edit hardware item
 * @param {number} id 
 */
function editHardware(id) {
    const item = getHardwareById(id);
    if (!item) return;

    // Populate form
    document.getElementById('name').value = item.name;
    document.getElementById('category').value = item.category;
    document.getElementById('subcategory').value = item.subcategory || '';
    document.getElementById('size').value = item.size || '';
    document.getElementById('color').value = item.color || '';
    document.getElementById('edit-id').value = item.id;
    document.getElementById('image-data').value = item.image || '';

    // Show image preview if exists
    if (item.image) {
        const preview = document.getElementById('image-preview');
        preview.innerHTML = `<img src="${item.image}" alt="Preview">`;
        preview.style.display = 'block';
    }

    // Update form title and button
    document.getElementById('form-title').textContent = 'Edit Hardware';
    document.getElementById('submit-btn').innerHTML = '<i class="fas fa-save"></i> Update Hardware';

    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Confirm and delete hardware item
 * @param {number} id 
 */
function confirmDeleteHardware(id) {
    if (confirm('Are you sure you want to delete this hardware item?')) {
        deleteHardwareItem(id);
        renderHardwareList();
        alert('Hardware item deleted successfully!');
    }
}

/**
 * Initialize hardware page
 */
function initHardwarePage() {
    if (window.protectRoute) window.protectRoute();
    if (window.setActiveNav) window.setActiveNav('hardware.html');
    if (window.displayUserInfo) window.displayUserInfo();

    // Populate category dropdown
    const categorySelect = document.getElementById('category');
    if (categorySelect) {
        HARDWARE_CATEGORIES.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categorySelect.appendChild(option);
        });
    }

    // Setup form submission
    const form = document.getElementById('hardware-form');
    if (form) {
        form.addEventListener('submit', handleHardwareFormSubmit);
    }

    // Setup image upload
    const imageInput = document.getElementById('image');
    if (imageInput) {
        imageInput.addEventListener('change', handleImageUpload);
    }

    // Setup logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn && window.handleLogout) {
        logoutBtn.addEventListener('click', window.handleLogout);
    }

    // Render hardware list
    renderHardwareList();
}

// Expose to window
window.editHardware = editHardware;
window.confirmDeleteHardware = confirmDeleteHardware;

// Initialize on page load
document.addEventListener('DOMContentLoaded', initHardwarePage);
