import storageService from './services/storageService.js';

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
                date: new Date().toJSON()
            };

            const messages = storageService.get('woodhub_messages') || [];
            messages.push(newMessage);
            storageService.set('woodhub_messages', messages);

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

function prefillForm() {
    const user = storageService.get('woodhub_user');
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
