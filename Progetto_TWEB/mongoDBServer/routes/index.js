var express = require('express');
var router = express.Router();
const Reviews =require('../models/Reviews');
const Chat = require('../models/Chat');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/**
 * GET reviews attraverso il nome del film
 */
router.get('/load-reviews', async function(req, res, next) {
  const movieName = req.query.movie_name;
  if (!movieName) {
   res.status(400).json({ error: 'nome del film mancante' });
  }

  try{
    const reviews = await Reviews.find({movie_title: decodeURIComponent(movieName) });
    console.log(reviews);
     res.status(200).json(reviews);
  }catch(error){
     res.status(500).json({error: error});
  }

})

router.post('/save-chat-message', async function(req, res, next) {
    try{
        const newMessage = new Chat(req.body);
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }catch (error){
        res.status(500).json({error: error});
    }
})

router.get('/get-messages', async function(req, res, next) {
    const id=req.query.movie_id;
    try{
        const messages = await Chat.find({movie_id: id});
        console.log(messages);
        res.status(200).json(messages);
    }catch(error){
        res.status(500).json({error: error});
    }
})

module.exports = router;
