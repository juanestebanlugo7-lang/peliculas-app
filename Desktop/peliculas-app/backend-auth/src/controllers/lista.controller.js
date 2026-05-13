const Lista = require('../models/lista.model');

const listaController = {
  async agregarPelicula(req, res) {
    try {
      const { nombreLista, pelicula_id } = req.body;
      if (!nombreLista || !pelicula_id) {
        return res.status(400).json({ error: 'Datos inválidos' });
      }
      await Lista.agregarPelicula(req.userId, nombreLista, pelicula_id);
      res.json({ success: true, message: `Agregada a ${nombreLista}` });
    } catch (error) {
      console.error('Error en agregarPelicula:', error.message);
      res.status(500).json({ error: error.message || 'Error al agregar a la lista' });
    }
  },
  async quitarPelicula(req, res) {
    try {
      const { nombreLista, pelicula_id } = req.body;
      if (!nombreLista || !pelicula_id) {
        return res.status(400).json({ error: 'Datos inválidos' });
      }
      await Lista.quitarPelicula(req.userId, nombreLista, pelicula_id);
      res.json({ success: true, message: `Eliminada de ${nombreLista}` });
    } catch (error) {
      console.error('Error en quitarPelicula:', error.message);
      res.status(500).json({ error: error.message || 'Error al quitar de la lista' });
    }
  },
  async verificarEnLista(req, res) {
    try {
      const { nombreLista, pelicula_id } = req.params;
      const existe = await Lista.verificarEnLista(req.userId, nombreLista, pelicula_id);
      res.json({ success: true, existe });
    } catch (error) {
      console.error('Error en verificarEnLista:', error.message);
      res.status(500).json({ error: 'Error al verificar' });
    }
  },
  async getPeliculasDeLista(req, res) {
    try {
      const { nombreLista } = req.params;
      const peliculas = await Lista.getPeliculasByLista(req.userId, nombreLista);
      res.json({ success: true, peliculas });
    } catch (error) {
      console.error('Error en getPeliculasDeLista:', error.message);
      res.status(500).json({ error: 'Error al obtener películas' });
    }
  }
};

module.exports = listaController;