const express = require('express');
const router = express.Router();
const listaController = require('../controllers/lista.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

router.get('/', listaController.getListas);
router.get('/:nombreLista/peliculas', listaController.getPeliculasDeLista);
router.get('/:nombreLista/verificar/:pelicula_id', listaController.verificarEnLista);
router.post('/agregar', listaController.agregarPelicula);
router.post('/quitar', listaController.quitarPelicula);

module.exports = router;