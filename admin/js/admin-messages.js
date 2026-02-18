import storageService from '../../js/services/storageService.js';

document.addEventListener('DOMContentLoaded', () => {
    // Window helpers need to be defined before loading if they are used inline
    // But this module runs on load.
    // However, if the HTML has onclick="viewMessage(...)" we need to expose these.
    loadMessages();
});

function loadMessages() {
    const messages = storageService.get('woodhub_messages') || [];
    const messagesTableBody = document.getElementById('messages-table-body');
    const messageCount = document.getElementById('message-count');

    if (messageCount) {
        messageCount.textContent = messages.length;
    }

    if (messagesTableBody) {
        messagesTableBody.innerHTML = '';

        if (messages.length === 0) {
            messagesTableBody.innerHTML = '<tr><td colspan="5" class="text-center">No messages found.</td></tr>';
            return;
        }

        // Sort by date (newest first)
        messages.sort((a, b) => b.id - a.id);

        messages.forEach(msg => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${msg.date}</td>
                <td>${msg.name}</td>
                <td>${msg.mobile}</td>
                <td>${msg.email}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="window.viewMessage(${msg.id})">View</button>
                    <button class="btn btn-sm btn-danger" onclick="window.deleteMessage(${msg.id})">Delete</button>
                </td>
            `;
            messagesTableBody.appendChild(row);
        });
    }
}

function viewMessage(id) {
    const messages = storageService.get('woodhub_messages') || [];
    const msg = messages.find(m => m.id === id);

    if (msg) {
        alert(`From: ${msg.name}\nMobile: ${msg.mobile}\nEmail: ${msg.email}\nDate: ${msg.date}\n\nMessage:\n${msg.message}`);
    }
}

function deleteMessage(id) {
    if (confirm('Are you sure you want to delete this message?')) {
        let messages = storageService.get('woodhub_messages') || [];
        messages = messages.filter(m => m.id !== id);
        storageService.set('woodhub_messages', messages);
        loadMessages();
    }
}

// Ensure the common admin layout init helpers are called if available
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdminPage);
} else {
    initAdminPage();
}

function initAdminPage() {
    if (window.protectRoute) window.protectRoute();
    if (window.setActiveNav) window.setActiveNav('messages.html');
    if (window.displayUserInfo) window.displayUserInfo();

    // Setup logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn && window.handleLogout) {
        logoutBtn.addEventListener('click', window.handleLogout);
    }
}

// Expose to window for onclick handlers
window.viewMessage = viewMessage;
window.deleteMessage = deleteMessage;
