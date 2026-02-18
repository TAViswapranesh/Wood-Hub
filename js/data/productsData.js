/**
 * productsData.js
 * Contains product definitions and asset mappings.
 * Separates data from UI logic.
 */

// Map product types to image assets
export const productAssetMap = {
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

// Configuration for dynamic form fields based on product type
export const productFormConfig = {
    'door': {
        fields: [
            {
                id: 'thickness',
                label: 'Thickness (mm)',
                type: 'select',
                options: [
                    { value: '1.5 inch', label: '1.5 inches' },
                    { value: '2 inch', label: '2 inches' },
                    { value: '3 inch', label: '3 inches' }
                ],
                required: true
            }
        ]
    },
    'door-frame': {
        fields: [
            {
                id: 'thickness', // Reusing ID for consistency in data capture
                label: 'Section Size',
                type: 'select',
                options: [
                    { value: '4x3', label: '4 x 3 inches' },
                    { value: '5x3', label: '5 x 3 inches' }
                ],
                required: true
            }
        ]
    },
    'window-frame': {
        fields: [
            {
                id: 'thickness',
                label: 'Section Size',
                type: 'select',
                options: [
                    { value: '4x3', label: '4 x 3 inches' },
                    { value: '5x3', label: '5 x 3 inches' }
                ],
                required: true
            }
        ]
    },
    'window': {
        fields: [
            {
                id: 'thickness',
                label: 'Section Size',
                type: 'select',
                options: [
                    { value: '4x3', label: '4 x 3 inches' },
                    { value: '5x3', label: '5 x 3 inches' }
                ],
                required: true
            }
        ]
    },
    'wood-cnc': {
        fields: [
            {
                id: 'material',
                label: 'Material',
                type: 'select',
                options: [
                    { value: 'Teak', label: 'Teak' },
                    { value: 'Sal', label: 'Sal' },
                    { value: 'Ply', label: 'Ply' },
                    { value: 'MDF', label: 'MDF' }
                ],
                required: true
            }
        ]
    },
    'metal-cnc': {
        fields: [
            {
                id: 'material',
                label: 'Material',
                type: 'select',
                options: [
                    { value: 'MS', label: 'Mild Steel (MS)' },
                    { value: 'SS', label: 'Stainless Steel (SS)' },
                    { value: 'Aluminum', label: 'Aluminum' }
                ],
                required: true
            }
        ]
    }
};

export const getProductConfig = (type) => {
    return productFormConfig[type] || null;
};
