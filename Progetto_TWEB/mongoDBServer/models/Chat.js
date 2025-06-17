const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    movie_id : {type: Number, required: true},
    name : {type: String, required: true},
    text : {type: String, required: true},
    top_critic : {type: Boolean, required: true}
})

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;