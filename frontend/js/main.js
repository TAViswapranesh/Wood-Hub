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

    // Login Form Submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('login-name').value;
            const mobile = document.getElementById('login-mobile').value;

            if (name && mobile) {
                const user = { name, mobile };
                localStorage.setItem('woodhub_user', JSON.stringify(user));

                // Update UI (optional, closes modal for now)
                const modal = document.getElementById('login-modal');
                if (modal) modal.classList.remove('active');

                alert('Logged in successfully!');

                // If on contact page, reload to trigger pre-fill or just call it if we exposed function
                if (window.location.pathname.includes('contact.html')) {
                    window.location.reload();
                }
            }
        });
    }
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('woodhub_cart')) || [];
    const countElement = document.querySelector('.cart-count');
    if (countElement) {
        countElement.textContent = cart.length;
    }
}
