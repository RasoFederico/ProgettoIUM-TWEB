let name = null;
let roomNo = null;
let socket = io();
let movie_id;

/**
 * Inizializza l'applicazione:
 * - Configura l'interfaccia utente.
 * - Carica le recensioni del film.
 * - Gestisce la connessione e gli eventi della chat tramite Socket.IO.
 */
function init() {
    setNoneNavbarSearch();
    loadReviews();

    document.getElementById('initial_form').style.display = 'block';
    document.getElementById('chat_interface').style.display = 'none';

    const movieDetailsElement = document.querySelector('.col-md-6');
    if (movieDetailsElement) {
        movieDetailsElement.classList.replace('col-md-6', 'col-md-10');
    }

    socket.on('connect', function () {
        console.log('Connessione a socket.io con ID:', socket.id);
    });

    socket.on('joined', function (room, userId) {
        console.log('Evento di:', room, userId, 'Utente attuale:', name);
        if (userId !== name) {
            writeOnHistory('<b>' + userId + '</b> entra nella stanza ' + room, 'system');
        }
    });

    socket.on('chat', function (room, userId, chatText, top_critic = false) {
        console.log('Chat riceve evento:', room, userId, chatText);
        const sender = userId === name ? 'Tu' : userId;
        const type = userId === name ? 'sent' : 'received';
        writeOnHistory(chatText, type, sender, top_critic);
    });
}

/**
 * Nasconde il campo di ricerca nella navbar.
 */
function setNoneNavbarSearch() {
    document.getElementById('container_search').style.display = 'none';
}

/**
 * Verifica se il film ha vinto un Oscar e, in caso positivo, mostra l'immagine del premio.
 */
async function getOscar() {
    const params = new URLSearchParams(window.location.search);
    let movie_name = params.get('movie_name');
    try {
        const response = await axios.get('/won-oscar?movie_name=' + movie_name);
        if (response.data === true) {
            document.getElementById("oscar").src = "data/oscar.png";
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * All'avvio della pagina, imposta poster e nome del film, quindi verifica l'Oscar.
 */
window.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const posterPath = params.get("poster");
    const namePath = params.get("movie_name");
    movie_id = params.get("movie_id");

    if (posterPath) {
        document.getElementById("poster").src = decodeURIComponent(posterPath);
    }
    if (namePath) {
        document.getElementById("movie_name").innerHTML = decodeURIComponent(namePath);
    }

    getOscar();
});

/**
 * Carica le recensioni relative al film corrente da MongoDB.
 */
async function loadReviews() {
    const movieName = document.getElementById("movie_name").textContent;
    try {
        const response = await axios.get(`/load-reviews?name=${encodeURIComponent(movieName)}`);
        renderReviews(response.data);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Mostra le recensioni nella sezione dedicata.
 * @param {Array<Object>} reviews - Lista delle recensioni da visualizzare.
 */
function renderReviews(reviews) {
    const container = document.getElementById("reviews_container");
    container.innerHTML = "";

    reviews.forEach((review) => {
        const topCriticBadge = review.top_critic ? `<span class="top-critic-badge" title="Top Critic"></span>` : "";

        const reviewElement = document.createElement("a");
        reviewElement.className = "text-decoration-none";
        reviewElement.innerHTML = `
            <div class="review-box mt-3 text-light bg-dark p-4 rounded shadow">
                <div class="review bg-secondary rounded p-3" onclick="window.open('https://www.rottentomatoes.com/${review.rotten_tomatoes_link}', '_blank')">
                    <div class="reviewer-name fw-bold position-relative">
                        A cura di: ${review.critic_name}
                        ${topCriticBadge}
                    </div>
                    <div class="review-rating ${review.review_type === 'Fresh' ? 'text-fresh' : 'text-rotten'}">
                        ${review.review_type}
                    </div>
                    <p class="review-text mt-2">${review.review_content}</p>
                </div>
            </div>`;
        container.appendChild(reviewElement);
    });
}

/**
 * Invia un messaggio di chat tramite Socket.IO e lo salva nel database.
 */
function sendChatText() {
    let chatText = document.getElementById('chat_input').value;
    const checkbox = document.getElementById('topCritic');

    if (chatText.trim() !== '') {
        socket.emit('chat', roomNo, name, chatText, checkbox.checked);
        saveMessage(chatText);
        document.getElementById('chat_input').value = '';
    }
}

/**
 * Salva un messaggio di chat sul server.
 * @param {string} message - Il contenuto del messaggio da salvare.
 */
async function saveMessage(message) {
    const checkbox = document.getElementById('topCritic');
    const top_critic = checkbox.checked;

    try {
        await axios.post('/save-chat-message', {
            id: movie_id,
            name: name,
            message: message,
            top_critic: top_critic
        });
    } catch (error) {
        console.error(error.response?.data || error.message);
    }
}

/**
 * Permette l'invio del messaggio con il tasto Enter.
 */
document.addEventListener('DOMContentLoaded', function () {
    const chatInput = document.getElementById('chat_input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendChatText();
            }
        });
    }
});

/**
 * Connette l'utente a una stanza di chat, crea la stanza se non esiste.
 */
function connectToRoom() {
    roomNo = document.getElementById('movie_name').textContent;
    name = document.getElementById('name').value || 'Unknown-' + Math.random();

    const movieDetailsElement = document.querySelector('.col-md-10');
    if (movieDetailsElement) {
        movieDetailsElement.classList.replace('col-md-10', 'col-md-6');
    }

    socket.emit('create or join', roomNo, name);

    setTimeout(() => {
        viewChatInterface(roomNo, name);
        writeOnHistory('<b>Ti sei unito alla stanza: ' + roomNo + '</b>', 'system');
    }, 300);
}

/**
 * Chiude la chat e torna all'interfaccia iniziale.
 */
function closeChat() {
    document.getElementById('chat_interface').style.display = 'none';
    document.getElementById('initial_form').style.display = 'block';

    const movieDetailsElement = document.querySelector('.col-md-6');
    if (movieDetailsElement) {
        movieDetailsElement.classList.replace('col-md-6', 'col-md-10');
    }

    socket.emit('leave', roomNo, name);
}

/**
 * Aggiunge un messaggio alla cronologia della chat.
 * @param {string} text - Il testo del messaggio.
 * @param {'sent'|'received'|'system'} type - Il tipo di messaggio.
 * @param {string|null} sender - Nome del mittente.
 * @param {boolean} top_critic - Indica se il mittente è un top critic.
 */
function writeOnHistory(text, type = 'system', sender = null, top_critic = false) {
    const history = document.getElementById('history');

    if (type === 'system') {
        const paragraph = document.createElement('p');
        paragraph.className = 'text-center text-muted small';
        paragraph.innerHTML = text;
        history.appendChild(paragraph);
    } else {
        const messageContainer = document.createElement('div');
        messageContainer.className = 'clearfix';

        const messageDiv = topCriticMessage(type, top_critic);
        const contentDiv = document.createElement('div');
        contentDiv.textContent = text;

        const timeDiv = document.createElement('div');
        timeDiv.className = type === 'sent' ? 'chat-time sent-time' : 'chat-time';
        timeDiv.textContent = sender;

        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        messageContainer.appendChild(messageDiv);
        history.appendChild(messageContainer);
    }

    history.scrollTop = history.scrollHeight;
}

/**
 * Crea l'elemento HTML per il messaggio in base allo stile (top critic o meno).
 * @param {'sent'|'received'} type - Tipo di messaggio.
 * @param {boolean} top_critic - Se è stato inviato da un top critic.
 * @returns {HTMLDivElement} Elemento messaggio.
 */
function topCriticMessage(type, top_critic) {
    const messageDiv = document.createElement('div');
    if (top_critic) {
        messageDiv.className = type === 'sent' ? 'chat-message top-critic-message-sent' : 'chat-message top-critic-message-received';
    } else {
        messageDiv.className = type === 'sent' ? 'chat-message chat-message-sent' : 'chat-message chat-message-received';
    }
    return messageDiv;
}

/**
 * Recupera i messaggi salvati in precedenza dal server e li mostra nella chat.
 */
async function getMessages() {
    try {
        const response = await axios.get('/get-messages?movie_id=' + movie_id);
        const messages = response.data;

        messages.forEach(message => {
            writeOnHistory(message.text, "received", message.name, message.top_critic);
        });
    } catch (error) {
        console.error(error.response?.data || error.message);
    }
}

/**
 * Mostra l'interfaccia della chat e aggiorna le intestazioni con nome stanza e utente.
 * @param {string} room - Nome della stanza.
 * @param {string} userId - Nome dell'utente collegato.
 */
function viewChatInterface(room, userId) {
    document.getElementById('initial_form').style.display = 'none';
    document.getElementById('chat_interface').style.display = 'block';
    document.getElementById('movie_name_chat').innerHTML = 'CHAT: ' + document.getElementById('movie_name').textContent;
    document.getElementById('who_you_are').innerHTML = userId;
    getMessages();
}
