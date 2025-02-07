const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

const apiBase = 'http://194.238.16.49:8989'; // Ganti dengan API base Anda
const model = ':deepseek-r1'; // Ganti dengan model Ollama Anda

sendButton.addEventListener('click', sendMessage);

userInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    displayMessage(message, 'user');
    userInput.value = '';

    try {
        const botResponse = await getBotResponse(message);
        displayMessage(botResponse, 'bot');
    } catch (error) {
        console.error('Error fetching bot response:', error);
        displayMessage('Maaf, ada kesalahan dalam memproses pesan Anda.', 'bot');
    }
}

function displayMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = message;
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}

async function getBotResponse(message) {
    const response = await fetch(`${apiBase}/api/generate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: model,
            prompt: message
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.response; // Sesuaikan dengan struktur respons API Ollama Anda
}
