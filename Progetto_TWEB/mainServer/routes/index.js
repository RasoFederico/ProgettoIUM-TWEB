var express = require('express');
var router = express.Router();
const axios = require('axios');
const {response} = require("express");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { projectname: 'Filmoteca' });
});

router.get('/film', async function(req, res, next) {
  const name = req.query.movie_name;
  const description = req.query.description;
  const movie_id = req.query.movie_id;
  let actors;
  let crew;
  try{
    const response = await axios.post("http://localhost:8080/get-actors", {movie_id: movie_id});
    actors = response.data;
  }catch(error){
    console.error(error.response?.data || error.message);
  }
  try{
    const response = await axios.post("http://localhost:8080/get-crew", {movie_id: movie_id});
    crew=response.data;
  }catch(error){
    console.error(error.response?.data || error.message);
  }
  res.render('pages/film', { projectname: 'Filmoteca', movie_name: name, description: description, actors: actors, crew: crew });
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

router.post('/load-movies', async function (req, res, next) {
  try{
    const response = await axios.post('http://localhost:8080/load-movies',{});
    res.json(response.data);
  }catch(error){
    console.error(error.response?.data || error.message);
  }
})

module.exports = router;
