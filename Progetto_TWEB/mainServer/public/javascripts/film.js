function init(){
    document.getElementById("mynavbar").style.display = "none";
    loadReviews();
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

function renderReviews(reviews){
    const container = document.getElementById("reviews_container");

    container.innerHTML = "";

    reviews.forEach((review)=> {
        const reviewElement = document.createElement("a");
        reviewElement.className = "text-decoration-none";
        reviewElement.innerHTML =`
            <div class="review-box mt-3 text-light bg-dark p-4 rounded shadow">
            <div class="review bg-secondary rounded p-3" onclick="window.open('https://www.rottentomatoes.com/${review.rotten_tomatoes_link}', '_blank')">
                <div class="reviewer-name fw-bold">A cura di: ${review.critic_name}</div>
                <div class="review-rating text-warning">Voto: ${review.review_score}/5</div>
                <p class="review-text mt-2">${review.review_content}</p>
            </div>
        </div> 
        `;
        container.appendChild(reviewElement);
    });
}