document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("search_btn");
    button.addEventListener("click", askForFilm)
})

function init(){
    try{
        axios.post("/load-movies")
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


function askForFilm (event){
    event.preventDefault()
    const input = document.getElementById("search_input");
    const data = input.value;
    try{
        axios.post('/get-movie-by-name', { name: data }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

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

    movies.forEach(movie => {
        const movieElement = document.createElement("a");
        movieElement.href = `/film?movie_name=${movie.name}&description=${movie.description}&movie_id=${movie.id}`;
        movieElement.className = "text-decoration-none";

        movieElement.innerHTML = `
      <div class="content-box mt-3 text-dark">
        <img src="https://www.shutterstock.com/image-vector/no-photo-blank-image-icon-260nw-1955339317.jpg" alt="Poster Film">
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


function getImgMovie(idMovie) {

    try{
        axios.post('/get-img-by-idMovie', { id: idMovie }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

            .then(response => {
                console.log("Risposta completa:", response);

                // Verifica che response.data sia un array prima di passarlo
                if (Array.isArray(response.data)) {
                    //renderMovies(response.data);
                    return response.data;
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

    return null;
}