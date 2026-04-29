const Lista = require('../models/lista.model');

const listaController = {
  // Obtener listas del usuario autenticado
  async getListas(req, res) {
    try {
      const listas = await Lista.getListasByUsuario(req.userId);
      res.json({ success: true, listas });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener listas' });
    }
  },

  // Obtener películas de una lista específica
  async getPeliculasDeLista(req, res) {
    try {
      const { nombreLista } = req.params;
      const peliculasIds = await Lista.getPeliculasByLista(req.userId, nombreLista);
      res.json({ success: true, peliculas: peliculasIds });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener películas de la lista' });
    }
  },

  // Agregar película a una lista
  async agregarPelicula(req, res) {
    try {
      const { nombreLista, pelicula_id } = req.body;
      if (!nombreLista || !pelicula_id) {
        return res.status(400).json({ error: 'Datos inválidos' });
      }
      await Lista.agregarPelicula(req.userId, nombreLista, pelicula_id);
      res.json({ success: true, message: `Película agregada a ${nombreLista}` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar a la lista' });
    }
  },

  // Quitar película de una lista
  async quitarPelicula(req, res) {
    try {
      const { nombreLista, pelicula_id } = req.body;
      if (!nombreLista || !pelicula_id) {
        return res.status(400).json({ error: 'Datos inválidos' });
      }
      await Lista.quitarPelicula(req.userId, nombreLista, pelicula_id);
      res.json({ success: true, message: `Película eliminada de ${nombreLista}` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al quitar de la lista' });
    }
  },

  // Verificar si una película está en una lista
  async verificarEnLista(req, res) {
    try {
      const { nombreLista, pelicula_id } = req.params;
      const existe = await Lista.verificarEnLista(req.userId, nombreLista, pelicula_id);
      res.json({ success: true, existe });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al verificar' });
    }
  }
};

module.exports = listaController;