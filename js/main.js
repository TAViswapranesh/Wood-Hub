import storageService from './services/storageService.js';

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initLoginModal();
    updateCartCount();

    // Check if on login page or if we need to auto-logout/check session
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');

    if (navbar && navLinks) {
        // Check if toggle already exists (in case of re-run)
        if (navbar.querySelector('.menu-toggle')) return;

        const toggleBtn = document.createElement('div');
        toggleBtn.className = 'menu-toggle';
        toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        navbar.appendChild(toggleBtn);

        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = toggleBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }
}

/**
 * Login Modal Logic
 */
function initLoginModal() {
    const loginBtn = document.querySelector('.nav-icon.user-icon');
    const modal = document.getElementById('login-modal');
    const closeModal = document.querySelector('.close-modal');
    const loginForm = document.getElementById('login-form');

    if (loginBtn && modal) {
        loginBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });
    }

    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, strict validation would go here
            const nameInput = loginForm.querySelector('input[type="text"]'); // Assuming name input added or phone only
            const phoneInput = loginForm.querySelector('input[type="tel"]');

            // Existing HTML only had phone input in some versions, but main.js referenced name & mobile.
            // Let's adapt to simple phone login or what's in the HTML.
            // HTML in previous view had: <input type="tel">

            const mobile = phoneInput ? phoneInput.value : '';

            if (mobile) {
                const user = { mobile, name: "User" }; // Default name if not provided
                storageService.set('woodhub_user', user);

                if (modal) modal.classList.remove('active');
                alert('Logged in successfully!');

                if (window.location.pathname.includes('contact.html')) {
                    window.location.reload();
                }
            }
        });
    }
}

/**
 * Update Cart Badge Count
 */
export function updateCartCount() {
    const cart = storageService.get('woodhub_cart') || [];
    const countElement = document.querySelector('.cart-count');
    if (countElement) {
        countElement.textContent = cart.length;
    }
}

// Expose to window for legacy inline calls if strictly necessary, 
// but we aim to remove them.
window.updateCartCount = updateCartCount; 
