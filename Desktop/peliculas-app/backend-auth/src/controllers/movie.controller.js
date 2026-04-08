const movieService = require('../services/movie.service');

const movieController = {
  getPopularMovies: async (req, res) => {
    try {
      const page = req.query.page || 1;
      const movies = await movieService.getPopularMovies(page);
      res.json({
        success: true,
        results: movies,
        total: movies.length
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener películas' });
    }
  },

  searchMovies: async (req, res) => {
    try {
      const { query, page } = req.query;
      if (!query) {
        return res.status(400).json({ error: 'Se requiere un término de búsqueda' });
      }
      const movies = await movieService.searchMovies(query, page || 1);
      res.json({
        success: true,
        results: movies,
        query: query
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al buscar películas' });
    }
  },

  getMovieDetails: async (req, res) => {
    try {
      const { id } = req.params;
      const movie = await movieService.getMovieDetails(id);
      if (!movie) {
        return res.status(404).json({ error: 'Película no encontrada' });
      }
      res.json({
        success: true,
        movie
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener detalles' });
    }
  }
};

module.exports = movieController;