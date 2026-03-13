/* ===================================
   ADMIN AUTHENTICATION MODULE
   =================================== */
import orderService from '../../js/services/orderService.js';

// Mock credentials (replace with backend authentication in production)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

/**
 * Validate login credentials
 * @param {string} username 
 * @param {string} password 
 * @returns {boolean}
 */
function validateLogin(username, password) {
    return username === ADMIN_CREDENTIALS.username &&
        password === ADMIN_CREDENTIALS.password;
}

/**
 * Create admin session
 * @param {string} username 
 */
function createSession(username) {
    const session = {
        username: username,
        loginTime: new Date().toISOString(),
        isAuthenticated: true
    };
    orderService.setAdminSession(session);
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
function isAuthenticated() {
    const session = orderService.getAdminSession();
    return session && session.isAuthenticated === true;
}

/**
 * Get current session data
 * @returns {object|null}
 */
function getSession() {
    return orderService.getAdminSession();
}

/**
 * Destroy admin session (logout)
 */
function destroySession() {
    orderService.clearAdminSession();
}

/**
 * Protect admin routes - redirect to login if not authenticated
 */
function protectRoute() {
    if (!isAuthenticated()) {
        window.location.href = 'index.html';
    }
}

/**
 * Handle login form submission
 * @param {Event} event 
 */
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('login-error');

    // Clear previous errors
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    // Validate credentials
    if (validateLogin(username, password)) {
        createSession(username);
        window.location.href = 'dashboard.html';
    } else {
        if (errorElement) {
            errorElement.textContent = 'Invalid username or password';
            errorElement.style.display = 'block';
        }
    }
}

/**
 * Handle logout
 */
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        destroySession();
        window.location.href = 'index.html';
    }
}

/**
 * Initialize login page
 */
function initLoginPage() {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated()) {
        window.location.href = 'dashboard.html';
        return;
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

/**
 * Set active navigation item
 * @param {string} page - Current page name
 */
function setActiveNav(page) {
    const navItems = document.querySelectorAll('.admin-nav-item');
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === page) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * Display current user info
 */
function displayUserInfo() {
    const session = getSession();
    if (session) {
        const userInfoElements = document.querySelectorAll('.admin-username');
        userInfoElements.forEach(el => {
            el.textContent = session.username;
        });
    }
}

// Export functions for use in other modules
window.protectRoute = protectRoute;
window.setActiveNav = setActiveNav;
window.displayUserInfo = displayUserInfo;
window.handleLogout = handleLogout;
window.initLoginPage = initLoginPage;

// Auto-initialize if on login page
if (document.getElementById('login-form')) {
    initLoginPage();
}
