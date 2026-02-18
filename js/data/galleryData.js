/**
 * galleryData.js
 * Mock data for the gallery page.
 */

export const galleryImages = [
    {
        id: 1,
        src: '../assets/images/product/wood/door.jpg',
        category: 'Doors',
        title: 'Premium Teak Door'
    },
    {
        id: 2,
        src: '../assets/images/product/furniture/sofa.jpg',
        category: 'Furniture',
        title: 'Modern Sofa Set'
    },
    {
        id: 3,
        src: '../assets/images/product/cnc/woodcnc.jpg',
        category: 'CNC',
        title: 'Intricate Wood Carving'
    },
    {
        id: 4,
        src: '../assets/images/product/furniture/bed.jpg',
        category: 'Furniture',
        title: 'King Size Bed'
    },
    {
        id: 5,
        src: '../assets/images/product/wood/window.jpg',
        category: 'Windows',
        title: 'Classic Window Design'
    },
    {
        id: 6,
        src: '../assets/images/product/cnc/metalcnc.jpg',
        category: 'CNC',
        title: 'Laser Cut Metal Panel'
    },
    {
        id: 7,
        src: '../assets/images/product/furniture/table.jpg',
        category: 'Furniture',
        title: 'Dining Table 6-Seater'
    },
    {
        id: 8,
        src: '../assets/images/product/furniture/cupboard.jpg',
        category: 'Furniture',
        title: 'Wardrobe with Mirror'
    }
];

export const getGalleryCategories = () => {
    const categories = new Set(galleryImages.map(img => img.category));
    return ['All', ...Array.from(categories)];
};
