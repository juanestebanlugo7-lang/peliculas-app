const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Rutas específicas (sin parámetros variables) PRIMERO
router.get('/genres', movieController.getGenres);
router.get('/search', movieController.searchMovies);
router.get('/category/:category', movieController.getMoviesByCategory);

// Ruta con parámetro variable (id) al final
router.get('/:id', movieController.getMovieDetails);

module.exports = router;