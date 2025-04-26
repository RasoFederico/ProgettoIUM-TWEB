var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { projectname: 'Filmoteca' });
});

router.get('/film', function(req, res, next) {
  res.render('pages/film', { projectname: 'Filmoteca' });
});

module.exports = router;
