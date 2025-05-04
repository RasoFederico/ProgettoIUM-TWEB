function init(){
    document.getElementById("mynavbar").style.display = "none";
}

window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const posterPath = params.get("poster");

    if (posterPath) {
        document.getElementById("poster").src = decodeURIComponent(posterPath);
    }
});