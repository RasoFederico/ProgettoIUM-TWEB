var express = require('express');
var router = express.Router();
const axios = require('axios');
const {response} = require("express");


/**
 * GET homepage
 */
router.get('/', function(req, res, next) {
  res.render('pages/index', { projectname: 'Filmoteca' });
});

/**
 * GET vista dei dettagli dei film
 */
router.get('/film', async function(req, res, next) {
  const description = req.query.description;
  const movie_id = req.query.movie_id;
  const tagline = req.query.tagline;
  const date = req.query.date;
  const minute = req.query.minute;
  let actors;
  let crew;
  try{
    const response = await axios.get("http://localhost:8080/get-actors-crew?movieId="+movie_id);
     const data = response.data;
    const separatorIndex = data.indexOf("///");
     actors = data.slice(0, separatorIndex);
     crew = data.slice(separatorIndex + 1);
  }catch(error){
    console.error(error.response?.data || error.message);
  }
  res.render('pages/film', { projectname: 'Filmoteca', description: description, date:date, minute:minute, tagline:tagline, actors: actors, crew: crew });
});

/**
 * GET films attraverso l'utilizzo del nome del film
 */
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

/**
 * GET recensioni attraverso l'ulizzo del nome del film
 */
router.post('/load-reviews', async function(req, res, next) {
  const movieName = req.body.name;
  console.log("my movie revie "+movieName);
  try{
    const response = await axios.post('http://localhost:3002/load-reviews', {movie_title : movieName});
    console.log(response.data);
    res.json(response.data);
  }catch (error){
    res.json(error.response?.data || error.message);
  }
})

/**
 * GET film inizili homepage
 */
router.get('/load-movies', async function (req, res, next) {
  try{
    const response = await axios.get('http://localhost:8080/load-movies',{});
    res.json(response.data);
  }catch(error){
    console.error(error.response?.data || error.message);
  }
})

module.exports = router;
