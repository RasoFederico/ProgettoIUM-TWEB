//INIZIALIZZAZIONE HOMEPAGE
function init(){
    try{
        axios.get("/load-movies")
            .then (response => {
                if(Array.isArray(response.data)){
                    renderMovies(response.data);
                }else{
                    console.error("response.data non è un array:", response.data);
                }
            })
    }catch(e){
        console.log(e);
    }
}


//SEARCH
document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("search_btn");
    button.addEventListener("click", askForFilm)
})

function askForFilm (event){
    event.preventDefault()
    const input = document.getElementById("search_input");
    const data = input.value;
    try{
        axios.get(`/get-movie-by-name?movie_name=${encodeURIComponent(data)}`)
            .then(response => {
                console.log("Risposta completa:", response);

                // Verifica che response.data sia un array prima di passarlo
                if (Array.isArray(response.data)) {
                    renderMovies(response.data);
                } else {
                    console.error("response.data non è un array:", response.data);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }catch(error){
        alert(error);
    }
}


function renderMovies(movies) {

    const container = document.getElementById("movie-container");

    container.innerHTML = ""; //svuota il contenitore

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



