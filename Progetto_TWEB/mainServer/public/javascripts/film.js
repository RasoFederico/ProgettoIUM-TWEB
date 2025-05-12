let name = null;
let roomNo = null;
let socket = io();

function init(){
    document.getElementById("mynavbar").style.display = "none";
    loadReviews();

    document.getElementById('initial_form').style.display = 'block';
    document.getElementById('chat_interface').style.display = 'none';

    // Imposta la vista iniziale dei dettagli del film espansa
    // Verifica se l'elemento esiste prima di manipolarlo
    const movieDetailsElement = document.querySelector('.col-md-6');
    if (movieDetailsElement) {
        movieDetailsElement.classList.remove('col-md-6');
        movieDetailsElement.classList.add('col-md-10');
    }

    // Debug per verificare che la connessione Socket.io sia stabilita
    console.log('Socket.io initialization');

    // Gestione dell'evento di connessione Socket.io
    socket.on('connect', function() {
        console.log('Connected to Socket.io server with ID:', socket.id);
    });

    socket.on('joined', function (room, userId) {
        console.log('Joined event received:', room, userId, 'Current user:', name);
        if (userId === name) {
            // Questa parte ora è gestita direttamente in connectToRoom
            // ma lasciamo qui per retrocompatibilità
            console.log('Same user joined confirmation');
        } else {
            writeOnHistory('<b>'+userId+'</b>' + ' joined room ' + room, 'system'); //nuovo utente entra nella chat
        }
    });

    socket.on('chat', function (room, userId, chatText) {
        console.log('Chat event received:', room, userId, chatText);
        let who = userId;
        if (userId === name) {
            writeOnHistory(chatText, 'sent', 'Tu'); //sta scrivendo l'utente che ha effettuato l'accesso
        } else {
            writeOnHistory(chatText, 'received', who);
        }
    });

    // Gestione degli errori Socket.io
    socket.on('error', function(error) {
        console.error('Socket.io error:', error);
    });

    socket.on('disconnect', function(reason) {
        console.log('Disconnected from Socket.io server:', reason);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const posterPath = params.get("poster");
    const namePath = params.get("movie_name");
    console.log(namePath);

    if (posterPath) {
        document.getElementById("poster").src = decodeURIComponent(posterPath);
    }
    if(namePath) {
        document.getElementById("movie_name").innerHTML = decodeURIComponent(namePath);
    }
});

async function loadReviews(){
    console.log("sono in load reviews");
    const movieName = document.getElementById("movie_name").textContent;
    console.log(movieName);
    let reviews;
    try{
        const response = await axios.post('/load-reviews',{name: movieName} );
        reviews = response.data;
        console.log(reviews);
    }catch(error){
        console.error(error);
    }
    renderReviews(reviews);
}

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
            </div> 
        `;
        container.appendChild(reviewElement);
    });
}

/*CHAT*/
//scrive un nuovo messaggio
function sendChatText() {
    let chatText = document.getElementById('chat_input').value;
    if (chatText.trim() !== '') {
        // Aggiungi l'emissione verso il server
        socket.emit('chat', roomNo, name, chatText);

        // Debug per verificare che il messaggio venga inviato
        console.log('Sending message:', roomNo, name, chatText);

        // Pulisci il campo input
        document.getElementById('chat_input').value = '';

        // Opzionale: mostra immediatamente il messaggio in locale
        // nel caso in cui il server non rifletta il messaggio
        //writeOnHistory(chatText, 'sent', 'Tu');
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

// Funzione modificata per risolvere il problema della visualizzazione della chat
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

    // Prima emettiamo l'evento per unirsi alla room
    socket.emit('create or join', roomNo, name);

    // Poi impostiamo un breve timeout per assicurare che il server abbia tempo di elaborare
    // la richiesta di connessione prima di mostrare l'interfaccia e permettere l'invio
    setTimeout(() => {
        // Mostra l'interfaccia chat dopo un breve ritardo
        hideLoginInterface(roomNo, name);

        // Aggiungi un messaggio di sistema per confermare la connessione
        writeOnHistory('<b>Ti sei unito alla stanza: ' + roomNo + '</b>', 'system');
    }, 300);
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