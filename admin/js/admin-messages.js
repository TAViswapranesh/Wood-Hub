document.addEventListener('DOMContentLoaded', () => {
    loadMessages();
});

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('woodhub_messages')) || [];
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

        // Sort by date (newest first) - assuming date string is comparable or use ID which is timestamp
        messages.sort((a, b) => b.id - a.id);

        messages.forEach(msg => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${msg.date}</td>
                <td>${msg.name}</td>
                <td>${msg.mobile}</td>
                <td>${msg.email}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewMessage(${msg.id})">View</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteMessage(${msg.id})">Delete</button>
                </td>
            `;
            messagesTableBody.appendChild(row);
        });
    }
}

function viewMessage(id) {
    const messages = JSON.parse(localStorage.getItem('woodhub_messages')) || [];
    const msg = messages.find(m => m.id === id);

    if (msg) {
        alert(`From: ${msg.name}\nMobile: ${msg.mobile}\nEmail: ${msg.email}\nDate: ${msg.date}\n\nMessage:\n${msg.message}`);
    }
}

function deleteMessage(id) {
    if (confirm('Are you sure you want to delete this message?')) {
        let messages = JSON.parse(localStorage.getItem('woodhub_messages')) || [];
        messages = messages.filter(m => m.id !== id);
        localStorage.setItem('woodhub_messages', JSON.stringify(messages));
        loadMessages();
    }
}
