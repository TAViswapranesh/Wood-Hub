document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect form data
            const name = document.getElementById('name').value;
            const mobile = document.getElementById('mobile').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Create message object
            const newMessage = {
                id: Date.now(), // Unique ID based on timestamp
                name: name,
                mobile: mobile,
                email: email,
                message: message,
                date: new Date().toLocaleString()
            };

            // Get existing messages from localStorage
            let messages = JSON.parse(localStorage.getItem('woodhub_messages')) || [];

            // Add new message
            messages.push(newMessage);

            // Save back to localStorage
            localStorage.setItem('woodhub_messages', JSON.stringify(messages));

            // Show success message
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = 'Message Sent!';
            submitBtn.style.backgroundColor = '#28a745';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
                contactForm.reset();
            }, 3000);
        });
    }

    // Pre-fill form if logged in
    // Assuming main.js or some auth logic sets 'woodhub_user' in localStorage
    const savedUser = localStorage.getItem('woodhub_user');
    if (savedUser) {
        try {
            const user = JSON.parse(savedUser);
            if (user.name) document.getElementById('name').value = user.name;
            if (user.mobile) document.getElementById('mobile').value = user.mobile;
            // if (user.email) document.getElementById('email').value = user.email; // If you have email in user object
        } catch (e) {
            console.error("Error parsing user data", e);
        }
    }
});
