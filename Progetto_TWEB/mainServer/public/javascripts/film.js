function init(){
    document.getElementById("mynavbar").style.display = "none";
}

window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const posterPath = params.get("poster");

    if (posterPath) {
        document.getElementById("poster").src = decodeURIComponent(posterPath);
    }

    const tab = document.getElementById("reviews_tab");
    if(tab){
        tab.addEventListener("click",loadReviews);
    }

});

function loadReviews(event){
    event.preventDefault();
    const reviews_text = document.getElementById("reviews");



}