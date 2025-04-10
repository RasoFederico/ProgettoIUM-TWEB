const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    link: {type: String, required: true},
    movie_title: {type: String, required: true},
    critic_name: {type: String, required: true},
    top_critic: {type: Boolean, required: true},
    publisher_name: {type: String, required: true},
    review_type: {type: String, required: true},
    review_score: {type: Number, required: true},
    review_date: {type: Date, required: true},
    review_content: {type: String, required: true},
})

const Reviews = mongoose.model('Reviews', reviewsSchema);
module.exports = Reviews;