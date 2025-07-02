const Reviews =require('../models/Reviews');

function loadReviews(movieName) {
    return new Promise((resolve, reject) => {
        Reviews.find({movie_title: movieName})
            .then(result => {
                resolve(result);
            })
            .catch(error=>{
                reject(error);
            })
    })

}

module.exports.loadReviews = loadReviews;