var express = require('express');
var router = express.Router();
const axios = require('axios');
const {response} = require("express");


/**
 * @openapi
 * /:
 *   get:
 *     summary: Pagina iniziale del sito
 *     responses:
 *       200:
 *         description: Rende la homepage con il nome del progetto
 */
router.get('/', function(req, res, next) {
  res.render('pages/index', { projectname: 'Filmoteca' });
});

/**
 * @openapi
 * /film:
 *   get:
 *     summary: Vista dei dettagli dei film
 *     description: Restituisce una pagina HTML con i dettagli del film, inclusi attori, crew e generi.
 *     parameters:
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         required: false
 *         description: Descrizione del film
 *       - in: query
 *         name: movie_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del film
 *       - in: query
 *         name: movie_name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome del film (URL encoded)
 *       - in: query
 *         name: tagline
 *         schema:
 *           type: string
 *         required: false
 *         description: Tagline del film
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Data di uscita del film
 *       - in: query
 *         name: minute
 *         schema:
 *           type: integer
 *         required: false
 *         description: Durata del film in minuti
 *     responses:
 *       200:
 *         description: Pagina HTML con i dettagli del film
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       500:
 *         description: Errore nel recupero dei dati
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
 * @openapi
 * /get-movie-by-name:
 *   get:
 *     summary: Ottiene un film per nome
 *     description: Restituisce i dettagli di un film recuperandoli da un microservizio, dato il nome del film come parametro di query.
 *     parameters:
 *       - in: query
 *         name: movie_name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome del film da cercare
 *     responses:
 *       200:
 *         description: Dettagli del film trovati con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       500:
 *         description: Errore nel recupero dei dati dal microservizio
 */
router.get('/get-movie-by-name', async function (req, res, next) {
  const name = req.query.movie_name;
  try{
    const response = await axios.get(`http://localhost:8080/get-movie-by-name?movieName=${name}`);
    res.json(response.data);
  }catch(error){
    console.error(error.response?.data || error.message);  }
})

/**
 * @openapi
 * /won-oscar:
 *   get:
 *     summary: Verifica se un film ha vinto un Oscar
 *     description: Verifica se un film ha ricevuto un premio Oscar, passando il nome del film come parametro di query.
 *     parameters:
 *       - in: query
 *         name: movie_name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome del film (URL encoded)
 *     responses:
 *       200:
 *         description: Risposta con l'esito della verifica (es. true/false o dettagli)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 wonOscar: true
 *       500:
 *         description: Errore nel recupero dei dati o comunicazione col microservizio
 */
router.get('/won-oscar', async function(req, res, next) {
  let movie_name=req.query.movie_name;
  movie_name = decodeURIComponent(movie_name);
  try{
    const response =await axios.post('http://localhost:8080/won-oscar',{movie_name});
    res.json(response.data);
  }catch(error){}
})

/**
 * @openapi
 * /load-reviews:
 *   get:
 *     summary: Ottiene recensioni di un film
 *     description: Recupera tutte le recensioni associate a un film specifico, dato il suo nome come parametro di query.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome del film per cui caricare le recensioni
 *     responses:
 *       200:
 *         description: Lista dettagliata delle recensioni del film
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   link:
 *                     type: string
 *                     description: URL alla recensione originale
 *                     example: "https://example.com/review123"
 *                   movie_title:
 *                     type: string
 *                     description: Titolo del film
 *                     example: "Inception"
 *                   critic_name:
 *                     type: string
 *                     description: Nome del critico
 *                     example: "Mario Rossi"
 *                   top_critic:
 *                     type: boolean
 *                     description: Indica se è un critico di alto profilo
 *                     example: true
 *                   publisher_name:
 *                     type: string
 *                     description: Nome della testata o pubblicazione
 *                     example: "Il Cinematografo"
 *                   review_type:
 *                     type: string
 *                     description: Tipo di recensione (es. fresh, rotten)
 *                     example: "fresh"
 *                   review_score:
 *                     type: number
 *                     format: float
 *                     description: Punteggio assegnato alla recensione
 *                     example: 8.5
 *                   review_date:
 *                     type: string
 *                     format: date
 *                     description: Data della recensione
 *                     example: "2024-11-20"
 *                   review_content:
 *                     type: string
 *                     description: Testo completo della recensione
 *                     example: "Un film sorprendente, visivamente impeccabile e narrativamente solido."
 *       500:
 *         description: Errore nel recupero delle recensioni
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Errore durante la richiesta al microservizio
 */
router.get('/load-reviews', async function(req, res, next) {
  const movieName = req.query.name;
  try{
    const response = await axios.get(`http://localhost:3002/load-reviews?movie_name=${movieName}`);
    res.json(response.data);
  }catch (error){
    res.json(error.response?.data || error.message);
  }
})

/**
 * @openapi
 * /save-chat-message:
 *   post:
 *     summary: Salva un messaggio di chat associato a un film
 *     description: Riceve un messaggio di chat dal client e lo inoltra a un microservizio per essere salvato.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - message
 *               - top_critic
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID del film associato al messaggio
 *                 example: "1000001"
 *               name:
 *                 type: string
 *                 description: Nome della persona che invia il messaggio
 *                 example: "Mario Rossi"
 *               message:
 *                 type: string
 *                 description: Testo del messaggio di chat
 *                 example: "Questo film è fantastico!"
 *               top_critic:
 *                 type: boolean
 *                 description: Indica se l’utente è un critico esperto
 *                 example: true
 *     responses:
 *       200:
 *         description: Messaggio salvato correttamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movie_id:
 *                   type: string
 *                   example: "1000001"
 *                 name:
 *                   type: string
 *                   example: "Mario"
 *                 text:
 *                   type: string
 *                   example: "Film stupendo!"
 *                 top_critic:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Errore durante il salvataggio del messaggio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Connection refused: microservice at localhost:3002 is unavailable"
 */
router.post('/save-chat-message', async function(req, res, next) {
  const movie_id=req.body.id;
  const name = req.body.name;
  const message = req.body.message;
  const top_critic = req.body.top_critic;

  try{
    const response = axios.post('http://localhost:3002/save-chat-message',{movie_id:movie_id, name : name, text : message, top_critic : top_critic});
  }catch(error){
    console.error(error.response?.data || error.message);
  }
})

/**
 * @openapi
 * /get-messages:
 *   get:
 *     summary: Recupera tutti i messaggi di chat per un film
 *     description: Ottiene la lista dei messaggi associati a uno specifico film, utilizzando il suo ID come parametro di query.
 *     parameters:
 *       - in: query
 *         name: movie_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del film per cui recuperare i messaggi di chat
 *     responses:
 *       200:
 *         description: Lista dei messaggi trovati per il film
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   movie_id:
 *                     type: string
 *                     example: "1000001"
 *                   name:
 *                     type: string
 *                     example: "Lucia"
 *                   text:
 *                     type: string
 *                     example: "Un capolavoro assoluto!"
 *                   top_critic:
 *                     type: boolean
 *                     example: false
 *       500:
 *         description: Errore durante il recupero dei messaggi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Microservice error: Cannot connect to http://localhost:3002"
 */
router.get('/get-messages', async function(req, res, next){
  const movie_id=req.query.movie_id;
  try{
    const response =await axios.get("http://localhost:3002/get-messages?movie_id="+movie_id);
    res.json(response.data);
  }catch(error){
    console.error(error.response?.data || error.message);
  }
})

/**
 * @openapi
 * /load-movies:
 *   get:
 *     summary: Carica i film iniziali per la homepage
 *     description: Recupera un elenco di film da mostrare nella homepage, effettuando una richiesta a un microservizio backend.
 *     responses:
 *       200:
 *         description: Lista dei film iniziali caricata con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1000001"
 *                   title:
 *                     type: string
 *                     example: "The Matrix"
 *                   year:
 *                     type: integer
 *                     example: 1999
 *                   genres:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Action", "Sci-Fi"]
 *                   rating:
 *                     type: number
 *                     format: float
 *                     example: 8.7
 *       500:
 *         description: Errore durante il caricamento dei film iniziali
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Request failed with status code 500: Internal Server Error"
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
