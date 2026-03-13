import storageService from './storageService.js';
import { products } from '../data/productsData.js';

class HardwareService {
    constructor() {
        this.STORAGE_KEY = 'woodhub_admin_hardware';
    }

    /**
     * Get all hardware products (static + admin added)
     * @returns {Array} List of hardware products
     */
    getHardwareProducts() {
        // Filter static products to only include hardware items
        const staticHardware = products.filter(p => p.type === 'hardware-item');
        
        // Fetch admin-added hardware
        const adminHardware = storageService.get(this.STORAGE_KEY) || [];
        
        // Ensure admin items are formatted similarly if needed, or simply return combined list
        // Assuming admin payload structure: {id, name, category, subcategory, size, color, image, dateAdded}
        
        return [...staticHardware, ...adminHardware];
    }

    /**
     * Get all hardware items from storage (for Admin)
     * Admin view might only want to show/edit items they added, 
     * but based on typical CMS, it usually shows all editable items.
     * The existing admin panel only saved to localStorage, meaning 
     * it didn't manage static items. We will return only admin items here 
     * to keep existing admin behavior identical.
     * @returns {Array} List of admin hardware items
     */
    getAdminHardware() {
        return storageService.get(this.STORAGE_KEY) || [];
    }

    /**
     * Save admin hardware items to storage
     * @param {Array} items 
     */
    saveAdminHardware(items) {
        storageService.set(this.STORAGE_KEY, items);
    }

    /**
     * Add new hardware item via admin
     * @param {Object} item 
     */
    addHardwareItem(item) {
        const items = this.getAdminHardware();
        const newItem = {
            id: Date.now(),
            ...item,
            dateAdded: new Date().toISOString()
        };
        items.push(newItem);
        this.saveAdminHardware(items);
        return newItem;
    }

    /**
     * Update existing admin hardware item
     * @param {number|string} id 
     * @param {Object} updatedData 
     */
    updateHardwareItem(id, updatedData) {
        const items = this.getAdminHardware();
        const index = items.findIndex(item => item.id == id);
        if (index !== -1) {
            items[index] = { ...items[index], ...updatedData };
            this.saveAdminHardware(items);
            return items[index];
        }
        return null;
    }

    /**
     * Delete admin hardware item
     * @param {number|string} id 
     */
    deleteHardwareItem(id) {
        const items = this.getAdminHardware();
        const filtered = items.filter(item => item.id != id);
        this.saveAdminHardware(filtered);
    }

    /**
     * Get single hardware item by ID (from admin pool)
     * @param {number|string} id 
     * @returns {Object|null}
     */
    getHardwareById(id) {
        const items = this.getAdminHardware();
        return items.find(item => item.id == id) || null;
    }
}

const hardwareService = new HardwareService();
export default hardwareService;
