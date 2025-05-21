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
  let movie_id = req.query.movie_id;
  let movie_name = req.query.movie_name;
  movie_name=decodeURIComponent(movie_name);
  const tagline = req.query.tagline;
  const date = req.query.date;
  const minute = req.query.minute;
  let actors;
  let crew;
  let genres;
  try{
    const response = await axios.get("http://localhost:8080/get-actors-crew-genres?movieId="+movie_id);
    const data = response.data;
    actors = data.actors;
    crew = data.crew;
    genres = data.genres;
  }catch(error){
    console.error(error.response?.data || error.message);
  }
  res.render(`pages/film`, { projectname: 'Filmoteca', description: description, date:date, minute:minute, tagline:tagline, actors: actors, crew: crew, genres : genres});
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
    res.json(response.data);
  }catch(error){
    console.error(error.response?.data || error.message);  }
})

router.get('/won-oscar', async function(req, res, next) {
  let movie_name=req.query.movie_name;
  movie_name = decodeURIComponent(movie_name);
  try{
    const response =await axios.post('http://localhost:8080/won-oscar',{movie_name});
    res.json(response.data);
  }catch(error){}
})

/**
 * GET recensioni attraverso l'ulizzo del nome del film
 */
router.post('/load-reviews', async function(req, res, next) {
  const movieName = req.body.name;
  //console.log("my movie revie "+movieName);
  try{
    const response = await axios.post('http://localhost:3002/load-reviews', {movie_title : movieName});
    //console.log(response.data);
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
