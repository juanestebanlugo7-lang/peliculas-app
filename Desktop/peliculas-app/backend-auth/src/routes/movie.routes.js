const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);
router.get('/search', movieController.searchMovies);
router.get('/:category', movieController.getMoviesByCategory);
router.get('/detail/:id', movieController.getMovieDetails);

module.exports = router;