import orderService from './services/orderService.js';

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    prefillForm();
});

function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const mobile = document.getElementById('mobile').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const newMessage = {
                id: Date.now(),
                name,
                mobile,
                email,
                message,
                date: new Date().toISOString()
            };

            orderService.addMessage(newMessage);
            showSuccess(contactForm);
        });
    }
}

function showSuccess(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'Message Sent!';
    submitBtn.style.backgroundColor = '#28a745';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerText = originalText;
        submitBtn.style.backgroundColor = '';
        submitBtn.disabled = false;
        form.reset();
    }, 3000);
}

// New function to show error messages
function showError(form, message) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'Error!';
    submitBtn.style.backgroundColor = '#dc3545'; // Red color for error
    submitBtn.disabled = true;

    const errorMessageDiv = document.createElement('div');
    errorMessageDiv.className = 'error-message';
    errorMessageDiv.style.color = '#dc3545';
    errorMessageDiv.style.marginTop = '10px';
    errorMessageDiv.innerText = message;
    form.insertBefore(errorMessageDiv, submitBtn.parentNode); // Insert before the submit button's parent

    setTimeout(() => {
        submitBtn.innerText = originalText;
        submitBtn.style.backgroundColor = '';
        submitBtn.disabled = false;
        errorMessageDiv.remove();
    }, 5000); // Show error for 5 seconds
}

function prefillForm() {
    const user = orderService.getUser();
    if (user) {
        if (user.name) {
            const nameEl = document.getElementById('name');
            if (nameEl) nameEl.value = user.name;
        }
        if (user.mobile) {
            const mobileEl = document.getElementById('mobile');
            if (mobileEl) mobileEl.value = user.mobile;
        }
    }
}
