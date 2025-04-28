document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("search_btn");
    button.addEventListener("click", askForFilm)
})


function askForFilm (event){
    event.preventDefault()
    const input = document.getElementById("search_input");
    const data = input.value;
    try{
        axios.post('/get-movie-by-name',data,{
            headers: {
                'Content-Type': 'text/plain'
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }catch(error){
        alert(error);
    }
}