/**
 * productsData.js
 * Contains product definitions and asset mappings.
 * Unified data structure for all products.
 */

export const products = [
    {
        id: 'wood-door-001',
        type: 'door',
        name: 'Premium Teak Door',
        category: 'Wood',
        thumbnail: '../assets/images/product/wood/door.jpg',
        formConfig: {
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
        }
    },
    {
        id: 'wood-door-frame-001',
        type: 'door-frame',
        name: 'Standard Door Frame',
        category: 'Wood',
        thumbnail: '../assets/images/product/wood/doorframe.jpg',
        formConfig: {
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
        }
    },
    {
        id: 'wood-window-001',
        type: 'window',
        name: 'Classic Glass Window',
        category: 'Wood',
        thumbnail: '../assets/images/product/wood/window.jpg',
        formConfig: {
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
        }
    },
    {
        id: 'wood-window-frame-001',
        type: 'window-frame',
        name: 'Window Frame',
        category: 'Wood',
        thumbnail: '../assets/images/product/wood/windowframe.jpg',
        formConfig: {
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
        }
    },
    {
        id: 'furniture-sofa-001',
        type: 'sofa',
        name: 'Modern Sofa Set',
        category: 'Furniture',
        thumbnail: '../assets/images/product/furniture/sofa.jpg',
        formConfig: null
    },
    {
        id: 'furniture-bed-001',
        type: 'bed',
        name: 'King Size Bed',
        category: 'Furniture',
        thumbnail: '../assets/images/product/furniture/bed.jpg',
        formConfig: null
    },
    {
        id: 'furniture-table-001',
        type: 'table',
        name: 'Dining Table',
        category: 'Furniture',
        thumbnail: '../assets/images/product/furniture/table.jpg',
        formConfig: null
    },
    {
        id: 'furniture-chair-001',
        type: 'chair',
        name: 'Custom Chair',
        category: 'Furniture',
        thumbnail: '../assets/images/product/furniture/customfurniture.jpg',
        formConfig: null
    },
    {
        id: 'furniture-cupboard-001',
        type: 'cupboard',
        name: 'Wardrobe Cupboard',
        category: 'Furniture',
        thumbnail: '../assets/images/product/furniture/cupboard.jpg',
        formConfig: null
    },
    {
        id: 'furniture-custom-001',
        type: 'custom',
        name: 'Custom Furniture',
        category: 'Furniture',
        thumbnail: '../assets/images/product/furniture/customfurniture.jpg',
        formConfig: null
    },
    {
        id: 'cnc-wood-001',
        type: 'wood-cnc',
        name: 'Wood CNC Design',
        category: 'CNC',
        thumbnail: '../assets/images/product/cnc/woodcnc.jpg',
        formConfig: {
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
        }
    },
    {
        id: 'cnc-metal-001',
        type: 'metal-cnc',
        name: 'Metal CNC Design',
        category: 'CNC',
        thumbnail: '../assets/images/product/cnc/metalcnc.jpg',
        formConfig: {
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
    },
    // Hardware Products (Mapped from hardware.html)
    {
        id: 'hw-001',
        type: 'hardware-item',
        name: 'Premium Door Handle',
        category: 'Hardware',
        size: '8 inch',
        color: 'Gold',
        subcategory: 'Door Handles',
        thumbnail: null // Hardware page doesn't have images in HTML currently
    },
    {
        id: 'hw-002',
        type: 'hardware-item',
        name: 'Mortise Lock Set',
        category: 'Hardware',
        size: 'Heavy Duty',
        color: 'SS',
        subcategory: 'Locks',
        thumbnail: null
    },
    {
        id: 'hw-003',
        type: 'hardware-item',
        name: 'Soft Close Hinge',
        category: 'Hardware',
        size: '110 Degree',
        color: 'Nickel',
        subcategory: 'Hinges',
        thumbnail: null
    },
    {
        id: 'hw-004',
        type: 'hardware-item',
        name: 'Wood Adhesive',
        category: 'Hardware',
        size: '5kg',
        color: 'White',
        subcategory: 'Adhesives',
        thumbnail: null
    }
];

// Reconstruct productAssetMap for backward compatibility in products.js
export const productAssetMap = products.reduce((map, product) => {
    if (product.type !== 'hardware-item') {
        map[product.type] = product.thumbnail;
    }
    return map;
}, {});

// Reconstruct getProductConfig for backward compatibility
export const getProductConfig = (type) => {
    const product = products.find(p => p.type === type);
    return product ? product.formConfig : null;
};
