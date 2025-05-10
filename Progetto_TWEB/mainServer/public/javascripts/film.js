let name = null;
let roomNo = null;
let socket = io();


function init() {

    document.getElementById('initial_form').style.display = 'block';
    document.getElementById('chat_interface').style.display = 'none';

    // Imposta la vista iniziale dei dettagli del film espansa
    // Verifica se l'elemento esiste prima di manipolarlo
    const movieDetailsElement = document.querySelector('.col-md-6');
    if (movieDetailsElement) {
        movieDetailsElement.classList.remove('col-md-6');
        movieDetailsElement.classList.add('col-md-10');
    }

    socket.on('joined', function (room, userId) {
        if (userId === name) {
            hideLoginInterface(room, userId);
        } else {
            writeOnHistory('<b>'+userId+'</b>' + ' joined room ' + room, 'system'); //nuovo utente entra nella chat
        }
    });

    socket.on('chat', function (room, userId, chatText) {
        let who = userId;
        if (userId === name) {
            writeOnHistory(chatText, 'sent', 'Tu'); //sta scrivendo l'utente che ha effettuato l'accesso
        } else {
            writeOnHistory(chatText, 'received', who);
        }
    });

}

//scrive un nuovo messaggio
function sendChatText() {
    let chatText = document.getElementById('chat_input').value;
    if (chatText.trim() !== '') {
        socket.emit('chat', roomNo, name, chatText);
        document.getElementById('chat_input').value = '';
    }
}

// Gestisci l'invio con Enter
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chat_input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendChatText();
            }
        });
    }
});


function connectToRoom() {
    roomNo = document.getElementById('roomNo').value;
    name = document.getElementById('name').value;
    if (!name) name = 'Unknown-' + Math.random();

    // Ridimensiona la sezione dei dettagli per fare spazio alla chat
    const movieDetailsElement = document.querySelector('.col-md-10');
    if (movieDetailsElement) {
        movieDetailsElement.classList.remove('col-md-10');
        movieDetailsElement.classList.add('col-md-6');
    }

    // Emette l'evento per unirsi alla room
    socket.emit('create or join', roomNo, name);
}


function closeChat() {
    // Nascondi l'interfaccia chat
    document.getElementById('chat_interface').style.display = 'none';
    document.getElementById('initial_form').style.display = 'block';

    // Ripristina la vista espansa dei dettagli del film
    const movieDetailsElement = document.querySelector('.col-md-6');
    if (movieDetailsElement) {
        movieDetailsElement.classList.remove('col-md-6');
        movieDetailsElement.classList.add('col-md-10');
    }

    // Opzionale: pulisci la chat history
    document.getElementById('history').innerHTML = '';

    // Lasciamo l'utente connesso alla socket, ma nascondiamo solo l'interfaccia
    // Se volessimo disconnettere: socket.emit('leave', roomNo, name);
}


function writeOnHistory(text, type = 'system', sender = null) {
    let history = document.getElementById('history');

    if (type === 'system') {
        // System message (joining notification)
        let paragraph = document.createElement('p');
        paragraph.className = 'text-center text-muted small';
        paragraph.innerHTML = text;
        history.appendChild(paragraph);
    } else {
        // Chat message
        let messageContainer = document.createElement('div');
        messageContainer.className = 'clearfix';

        let messageDiv = document.createElement('div');
        messageDiv.className = type === 'sent' ? 'chat-message chat-message-sent' : 'chat-message chat-message-received';

        let contentDiv = document.createElement('div');
        contentDiv.textContent = text;

        let timeDiv = document.createElement('div');
        timeDiv.className = type === 'sent' ? 'chat-time sent-time' : 'chat-time';
        timeDiv.textContent = sender;

        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        messageContainer.appendChild(messageDiv);
        history.appendChild(messageContainer);
    }

    // Scroll to bottom
    history.scrollTop = history.scrollHeight;
}

/**
 * it hides the initial form and shows the chat
 * @param room the selected room
 * @param userId the user name
 */
function hideLoginInterface(room, userId) {
    document.getElementById('initial_form').style.display = 'none';
    document.getElementById('chat_interface').style.display = 'block';
    document.getElementById('who_you_are').innerHTML = userId;
}


window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const posterPath = params.get("poster");

    if (posterPath) {
        document.getElementById("poster").src = decodeURIComponent(posterPath);
    }

    // Aggiungiamo event listener per l'invio con Enter
    const chatInput = document.getElementById('chat_input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendChatText();
            }
        });
    }
});