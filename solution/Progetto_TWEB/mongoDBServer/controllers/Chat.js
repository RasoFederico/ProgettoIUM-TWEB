const Chat = require('../models/Chat');

function saveChatMessage(chatMessage) {
    return new Promise((resolve, reject) => {
        const newMessage = new Chat(chatMessage);
        newMessage.save()
            .then(result=>{
                resolve(result);
            })
            .catch(error=>{
                reject(error);
            })
    })
}

module.exports.savechatMessage = saveChatMessage;

function getMessages(movieId){
    return new Promise((resolve, reject) => {
        Chat.find({movie_id:movieId})
            .then(result=>{
                resolve(result);
            })
            .catch(err => reject(err));
    })

}

module.exports.getMessages = getMessages;