var express = require('express');
var router = express.Router();
const Reviews =require('../models/Reviews');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/load-reviews', async function(req, res, next) {
  const movieName = req.body.movie_title;
  if (!movieName) {
   res.status(400).json({ error: 'nome del film mancante' });
  }

  try{
    const reviews = await Reviews.find({movie_title: movieName });
    console.log(reviews);
     res.status(200).json(reviews);
  }catch(error){
     res.status(500).json({error: error});
  }

})

module.exports = router;
