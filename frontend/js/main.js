document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');

    if (navbar && navLinks) {
        // Create Toggle Button dynamically
        const toggleBtn = document.createElement('div');
        toggleBtn.className = 'menu-toggle';
        toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';

        // Append to navbar
        navbar.appendChild(toggleBtn);

        // Toggle Event
        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle Icon
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

    // Login Modal Logic
    const loginBtn = document.querySelector('.nav-icon.user-icon');
    const modal = document.getElementById('login-modal');
    const closeModal = document.querySelector('.close-modal');

    // Make sure elements exist before adding listeners to avoid errors on pages without them (though they should be everywhere)
    if (loginBtn && modal && closeModal) {
        loginBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });

        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Cart Count Update (Mock)
    updateCartCount();
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('woodhub_cart')) || [];
    const countElement = document.querySelector('.cart-count');
    if (countElement) {
        countElement.textContent = cart.length;
    }
}
