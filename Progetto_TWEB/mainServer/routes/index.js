var express = require('express');
var router = express.Router();
const axios = require('axios');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { projectname: 'Filmoteca' });
});

router.get('/film', function(req, res, next) {
  res.render('pages/film', { projectname: 'Filmoteca' });
});

router.post('/get-movie-by-name', async function (req, res, next) {
  const {name} = req.body;
  try{
    const response = await axios.post('http://localhost:8080/get-movie-by-name',{name},{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
    res.json(response.data);
  }catch(error){
    console.error(error.response?.data || error.message);  }
})

module.exports = router;
