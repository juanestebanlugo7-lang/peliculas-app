const express = require('express');
const router = express.Router();
const listaController = require('../controllers/lista.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

router.post('/agregar', listaController.agregarPelicula);
router.post('/quitar', listaController.quitarPelicula);
router.get('/:nombreLista/verificar/:pelicula_id', listaController.verificarEnLista);
router.get('/:nombreLista/peliculas', listaController.getPeliculasDeLista);

module.exports = router;