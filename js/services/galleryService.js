import storageService from './storageService.js';
import { galleryImages } from '../data/galleryData.js';

class GalleryService {
    constructor() {
        this.STORAGE_KEY = 'woodhub_admin_gallery';
    }

    /**
     * Get all gallery images (admin added first, then static)
     * @returns {Array} List of gallery objects
     */
    getGalleryImages() {
        const adminImages = storageService.get(this.STORAGE_KEY) || [];
        
        // Ensure format mapping if static data structure differs slightly from admin structure
        // Static: {id, src, category, title}
        // Admin: {id, name, image, dateAdded}
        
        // Map admin to static format for unified frontend rendering
        const formattedAdminImages = adminImages.map(img => ({
            id: img.id,
            src: img.image,
            category: 'Admin Upload', // Or derive if admin adds category
            title: img.name
        }));

        // Prioritize admin images + static images
        return [...formattedAdminImages, ...galleryImages];
    }

    /**
     * Get only admin gallery images (for admin panel)
     * @returns {Array}
     */
    getAdminGallery() {
        return storageService.get(this.STORAGE_KEY) || [];
    }

    /**
     * Save admin gallery images
     * @param {Array} images 
     */
    saveAdminGallery(images) {
        storageService.set(this.STORAGE_KEY, images);
    }

    /**
     * Add new gallery image via admin
     * @param {Object} imageData 
     */
    addGalleryImage(imageData) {
        const images = this.getAdminGallery();
        const newImage = {
            id: Date.now(),
            ...imageData,
            dateAdded: new Date().toISOString()
        };
        images.push(newImage);
        this.saveAdminGallery(images);
        return newImage;
    }

    /**
     * Delete gallery image via admin
     * @param {number|string} id 
     */
    deleteGalleryImage(id) {
        const images = this.getAdminGallery();
        const filtered = images.filter(img => img.id != id);
        this.saveAdminGallery(filtered);
    }
}

const galleryService = new GalleryService();
export default galleryService;
