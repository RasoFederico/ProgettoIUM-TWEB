let name = null;
let roomNo = null;
let socket = io();

/*INIZIALIZZAZIONE FILM*/
function init(){

    loadReviews(); //gestisce le recensioni

    document.getElementById('initial_form').style.display = 'block';
    document.getElementById('chat_interface').style.display = 'none';

    const movieDetailsElement = document.querySelector('.col-md-6');
    if (movieDetailsElement) {
        movieDetailsElement.classList.remove('col-md-6');
        movieDetailsElement.classList.add('col-md-10');
    }

    //Chat socket.io
    socket.on('connect', function() {
        console.log('Connessione a socket.io con ID:', socket.id);
    });

    socket.on('joined', function (room, userId) {
        console.log('Evento di:', room, userId, 'Utente attuale:', name);
        if (userId === name) {
            console.log('Stesso utente');
        } else {
            writeOnHistory('<b>'+userId+'</b>' + ' entra nella stanza ' + room, 'system');
        }
    });

    socket.on('chat', function (room, userId, chatText) {
        console.log('Chat riceve evento:', room, userId, chatText);
        let who = userId;
        if (userId === name) {
            writeOnHistory(chatText, 'sent', 'Tu'); //scrive l'utente registrato
        } else {
            writeOnHistory(chatText, 'received', who); //riceve il messaggio di
        }
    });
}


//URL: gestisco i poster e movie_name
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

//RECENSIONE: caricamento
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

//RECENSIONE: creo l'oggetto
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

/*CHAT: gestisco l'invio al server il messaggio*/
function sendChatText() {
    let chatText = document.getElementById('chat_input').value;
    if (chatText.trim() !== '') {

        socket.emit('chat', roomNo, name, chatText); //invio al server il messaggio
        console.log('Invia messaggio:', roomNo, name, chatText);

        document.getElementById('chat_input').value = ''; //pulisce il campo di testo
    }
}

//CHAT: gestisco l'evento dell'invio del nuovo messaggio
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

/*CHAT: connessione socket.io e ridimensionamento vista*/
function connectToRoom() {
    roomNo = document.getElementById('movie_name').textContent;
    name = document.getElementById('name').value;
    if (!name) name = 'Unknown-' + Math.random();

    const movieDetailsElement = document.querySelector('.col-md-10');
    if (movieDetailsElement) {
        movieDetailsElement.classList.remove('col-md-10');
        movieDetailsElement.classList.add('col-md-6');
    }

    socket.emit('create or join', roomNo, name); //creo la stanza

    setTimeout(() => { //timeout per dare il tempo alla conessione socket.io di connettersi ed elaborare i dati

        hideLoginInterface(roomNo, name);

        writeOnHistory('<b>Ti sei unito alla stanza: ' + roomNo + '</b>', 'system');
    }, 300);
}

/*CHAT: chiude la chat e disconnette lo user dal socket.io*/
function closeChat() {

    document.getElementById('chat_interface').style.display = 'none';
    document.getElementById('initial_form').style.display = 'block';

    const movieDetailsElement = document.querySelector('.col-md-6');
    if (movieDetailsElement) {
        movieDetailsElement.classList.remove('col-md-6');
        movieDetailsElement.classList.add('col-md-10');
    }

    socket.emit('leave', roomNo, name);
}

/*CHAT: scrivo i messaggi nella vista chat*/
function writeOnHistory(text, type = 'system', sender = null) {
    let history = document.getElementById('history');

    if (type === 'system') {
        let paragraph = document.createElement('p');
        paragraph.className = 'text-center text-muted small';
        paragraph.innerHTML = text;
        history.appendChild(paragraph);
    } else {
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
    history.scrollTop = history.scrollHeight;
}

/*CHAT: nascondo il login iniziale*/
function hideLoginInterface(room, userId) {
    document.getElementById('initial_form').style.display = 'none';
    document.getElementById('chat_interface').style.display = 'block';
    document.getElementById('movie_name_chat').innerHTML = 'CHAT: '+document.getElementById('movie_name').textContent;
    document.getElementById('who_you_are').innerHTML = userId;
}