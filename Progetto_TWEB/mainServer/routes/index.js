var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Filmoteca' });
});

router.post('/get-movie-by-name', function(req, res, next) {
  const normalized = {...req.body};
  console.log(normalized);
  res.send("mandato tutto correttamente");
})

module.exports = router;
