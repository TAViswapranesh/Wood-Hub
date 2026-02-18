/* ===================================
   ADMIN GALLERY MANAGEMENT MODULE
   =================================== */
import storageService from '../../js/services/storageService.js';

const GALLERY_STORAGE_KEY = 'woodhub_admin_gallery';

/**
 * Get all gallery images from storage
 * @returns {Array}
 */
function getAllGalleryImages() {
    return storageService.get(GALLERY_STORAGE_KEY) || [];
}

/**
 * Save gallery images to storage
 * @param {Array} images 
 */
function saveGalleryImages(images) {
    storageService.set(GALLERY_STORAGE_KEY, images);
}

/**
 * Add new gallery image
 * @param {Object} imageData 
 */
function addGalleryImage(imageData) {
    const images = getAllGalleryImages();
    const newImage = {
        id: Date.now(),
        ...imageData,
        dateAdded: new Date().toISOString()
    };
    images.push(newImage);
    saveGalleryImages(images);
    return newImage;
}

/**
 * Delete gallery image
 * @param {number} id 
 */
function deleteGalleryImage(id) {
    const images = getAllGalleryImages();
    const filtered = images.filter(img => img.id !== id);
    saveGalleryImages(filtered);
}

/**
 * Handle gallery image upload
 * @param {Event} event 
 */
function handleGalleryImageUpload(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Process each file
    Array.from(files).forEach(file => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert(`${file.name} is not a valid image file`);
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert(`${file.name} is too large. Max size is 2MB`);
            return;
        }

        // Read and save image
        const reader = new FileReader();
        reader.onload = function (e) {
            addGalleryImage({
                name: file.name,
                image: e.target.result
            });
            renderGalleryGrid();
        };
        reader.readAsDataURL(file);
    });

    // Reset file input
    event.target.value = '';
}

/**
 * Render gallery grid
 */
function renderGalleryGrid() {
    const images = getAllGalleryImages();
    const container = document.getElementById('gallery-grid');

    if (!container) return;

    if (images.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-images"></i>
                <p>No images in gallery yet. Upload your first image!</p>
            </div>
        `;
        return;
    }

    const gridHTML = images.map(img => `
        <div class="gallery-item">
            <img src="${img.image}" alt="${img.name}">
            <div class="gallery-item-actions">
                <button class="btn btn-sm btn-danger" onclick="window.confirmDeleteGalleryImage(${img.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div style="padding: var(--admin-space-sm); background: var(--admin-bg-tertiary);">
                <small style="color: var(--admin-text-secondary);">${img.name}</small><br>
                <small style="color: var(--admin-text-tertiary);">${new Date(img.dateAdded).toLocaleDateString()}</small>
            </div>
        </div>
    `).join('');

    container.innerHTML = gridHTML;
}

/**
 * Confirm and delete gallery image
 * @param {number} id 
 */
function confirmDeleteGalleryImage(id) {
    if (confirm('Are you sure you want to delete this image?')) {
        deleteGalleryImage(id);
        renderGalleryGrid();
        alert('Image deleted successfully!');
    }
}

/**
 * Initialize gallery page
 */
function initGalleryPage() {
    if (window.protectRoute) window.protectRoute();
    if (window.setActiveNav) window.setActiveNav('gallery.html');
    if (window.displayUserInfo) window.displayUserInfo();

    // Setup image upload
    const imageInput = document.getElementById('gallery-upload');
    if (imageInput) {
        imageInput.addEventListener('change', handleGalleryImageUpload);
    }

    // Setup logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn && window.handleLogout) {
        logoutBtn.addEventListener('click', window.handleLogout);
    }

    // Render gallery grid
    renderGalleryGrid();
}

// Expose to window
window.confirmDeleteGalleryImage = confirmDeleteGalleryImage;

// Initialize on page load
document.addEventListener('DOMContentLoaded', initGalleryPage);
