import { galleryImages, getGalleryCategories } from './data/galleryData.js';

document.addEventListener('DOMContentLoaded', () => {
    initGallery();
});

function initGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    // If we want categories filter, we can generate it here too.

    if (!galleryGrid) return;

    // Clear existing mock content
    galleryGrid.innerHTML = '';

    galleryImages.forEach(img => {
        const item = document.createElement('div');
        item.className = 'gallery-item';

        // Using existing CSS classes if possible, or simple inline styles/classes
        // Assuming .gallery-item exists from "Coming Soon" page or needs to be added.
        // If not, we rely on basic CSS.

        item.innerHTML = `
            <img src="${img.src}" alt="${img.title}" loading="lazy">
            <div class="gallery-overlay">
                <h4>${img.title}</h4>
                <p>${img.category}</p>
            </div>
        `;
        galleryGrid.appendChild(item);
    });
}
