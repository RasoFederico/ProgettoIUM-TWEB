/**
 * Inizializza la homepage:
 * - Mostra il campo di ricerca nella navbar.
 * - Carica e visualizza l'elenco dei film dal server.
 */
function init() {
    setBlockNavbarSearch();

    try {
        axios.get("/load-movies")
            .then(response => {
                if (Array.isArray(response.data)) {
                    renderMovies(response.data);
                } else {
                    console.error("response.data non è un array:", response.data);
                }
            });
    } catch (e) {
        console.log(e);
    }
}

/**
 * Rende visibile il campo di ricerca nella barra di navigazione.
 */
function setBlockNavbarSearch() {
    document.getElementById('container_search').style.display = 'block';
}

/**
 * Aggiunge un listener per il click sul pulsante di ricerca al caricamento della pagina.
 */
document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("search_btn");
    button.addEventListener("click", askForFilm);
});

/**
 * Gestisce l'evento di ricerca dell'utente:
 * - Impedisce il comportamento di default del form.
 * - Invia una richiesta al server per cercare un film per nome.
 * - Visualizza i risultati se disponibili.
 *
 * @param {Event} event - Evento DOM generato dal click.
 */
function askForFilm(event) {
    event.preventDefault();
    const input = document.getElementById("search_input");
    const data = input.value;

    try {
        axios.get(`/get-movie-by-name?movie_name=${encodeURIComponent(data)}`)
            .then(response => {
                console.log("Risposta completa:", response);

                if (Array.isArray(response.data)) {
                    renderMovies(response.data);
                } else {
                    console.error("response.data non è un array:", response.data);
                }
            })
            .catch(error => {
                console.log(error);
            });
    } catch (error) {
        alert(error);
    }
}

/**
 * Genera e visualizza gli elementi HTML relativi ai film ricevuti.
 *
 * @param {Array<Object>} movies - Elenco di oggetti film con dati e poster.
 */
function renderMovies(movies) {
    const container = document.getElementById("movie-container");
    container.innerHTML = ""; // Pulisce il contenitore prima di renderizzare

    movies.forEach(film => {
        const movie = film.movie;
        const poster = film.posters;

        const movieElement = document.createElement("a");
        movieElement.href = `/film?movie_name=${encodeURIComponent(movie.name)}&description=${movie.description}&minute=${movie["minute"]}&date=${movie["date"]}&tagline=${movie["tagline"]}&movie_id=${movie.id}&poster=${encodeURIComponent(poster["link"])}`;
        movieElement.className = "text-decoration-none";

        movieElement.innerHTML = `
            <div class="content-box mt-3 text-dark">
                <img src="${poster["link"]}" alt="Poster Film">
                <div class="content-info">
                    <h2>${movie.name}</h2>
                    <div class="date">Data di uscita: ${movie.date}</div>
                    <p>${movie.description}</p>
                </div>
            </div>
        `;
        container.appendChild(movieElement);
    });
}
