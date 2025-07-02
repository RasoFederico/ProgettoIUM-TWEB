var express = require('express');
var router = express.Router();
const reviewController = require('../controllers/Reviews');
const chatController = require('../controllers/Chat');

/**
 * @openapi
 * /load-reviews:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Ottiene le recensioni di un film
 *     description: Recupera le recensioni associate a un film specifico in base al nome passato come parametro di query.
 *     parameters:
 *       - in: query
 *         name: movie_name
 *         required: true
 *         schema:
 *           type: string
 *         description: Il nome del film di cui si vogliono ottenere le recensioni
 *     responses:
 *       200:
 *         description: Recensioni trovate con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   link:
 *                     type: string
 *                     example: "https://example.com/review/123"
 *                   movie_title:
 *                     type: string
 *                     example: "Inception"
 *                   critic_name:
 *                     type: string
 *                     example: "Mario Rossi"
 *                   top_critic:
 *                     type: boolean
 *                     example: true
 *                   publisher_name:
 *                     type: string
 *                     example: "La Repubblica"
 *                   review_type:
 *                     type: string
 *                     example: "Positive"
 *                   review_score:
 *                     type: number
 *                     format: float
 *                     example: 8.5
 *                   review_date:
 *                     type: string
 *                     format: date
 *                     example: "2024-03-15"
 *                   review_content:
 *                     type: string
 *                     example: "Un capolavoro visivo e narrativo. Da non perdere."
 *       400:
 *         description: Parametro `movie_name` mancante
 *       500:
 *         description: Errore interno del server
 */
router.get('/load-reviews', async function(req, res, next) {
  const movieName = req.query.movie_name;
  if (!movieName) {
   res.status(400).json({ error: 'nome del film mancante' });
  }

  try{
    const reviews = await reviewController.loadReviews(decodeURIComponent(movieName));
     res.status(200).json(reviews);
  }catch(error){
     res.status(500).json({error: error});
  }

})

/**
 * @openapi
 * /save-chat-message:
 *   post:
 *     tags:
 *       - Chat
 *     summary: Salva un nuovo messaggio nella chat
 *     description: Salva un messaggio di chat relativo a un film, includendo nome dell'utente, contenuto e se è un top critic.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - movie_id
 *               - name
 *               - text
 *               - top_critic
 *             properties:
 *               movie_id:
 *                 type: number
 *                 example: 1000001
 *               name:
 *                 type: string
 *                 example: "Lucia Verdi"
 *               text:
 *                 type: string
 *                 example: "Bellissimo film, mi ha emozionato!"
 *               top_critic:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Messaggio salvato con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60f7b2f8a2b3e03abc123456"
 *                 movie_id:
 *                   type: number
 *                   example: 1000001
 *                 name:
 *                   type: string
 *                   example: "Lucia Verdi"
 *                 text:
 *                   type: string
 *                   example: "Bellissimo film, mi ha emozionato!"
 *                 top_critic:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Errore durante il salvataggio del messaggio
 */

router.post('/save-chat-message', async function(req, res, next) {
    try{
        const savedMessage = await chatController.savechatMessage(req.body);
        res.status(200).json(savedMessage);
    }catch (error){
        res.status(500).json({error: error});
    }
})

/**
 * @openapi
 * /get-messages:
 *   get:
 *     tags:
 *       - Chat
 *     summary: Ottiene i messaggi della chat per un film specifico
 *     description: Recupera tutti i messaggi di chat associati a un determinato film tramite l'ID del film.
 *     parameters:
 *       - in: query
 *         name: movie_id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID numerico del film di cui recuperare i messaggi
 *     responses:
 *       200:
 *         description: Messaggi trovati con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   movie_id:
 *                     type: number
 *                     example: 1000001
 *                   name:
 *                     type: string
 *                     example: "Lucia Verdi"
 *                   text:
 *                     type: string
 *                     example: "Bellissimo film, mi ha emozionato!"
 *                   top_critic:
 *                     type: boolean
 *                     example: true
 *       400:
 *         description: Parametro `movie_id` mancante o non valido
 *       500:
 *         description: Errore interno del server
 */

router.get('/get-messages', async function(req, res, next) {
    const id=req.query.movie_id;
    try{
        const messages = await chatController.getMessages(id);
        res.status(200).json(messages);
    }catch(error){
        res.status(500).json({error: error});
    }
})

module.exports = router;
