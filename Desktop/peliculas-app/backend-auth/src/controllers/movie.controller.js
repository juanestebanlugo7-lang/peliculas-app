const movieService = require('../services/movie.service');

const movieController = {
  // Obtener películas por categoría (popular, top_rated, upcoming, now_playing)
  async getMoviesByCategory(req, res) {
    try {
      const category = req.params.category || 'popular';
      const page = parseInt(req.query.page) || 1;
      const movies = await movieService.getMoviesByCategory(category, page);
      res.json({
        success: true,
        results: movies.results,
        total_pages: movies.total_pages,
        current_page: movies.current_page
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener películas' });
    }
  },

  // Buscar películas por título
  async searchMovies(req, res) {
    try {
      const { query, page } = req.query;
      if (!query) {
        return res.status(400).json({ error: 'Se requiere un término de búsqueda' });
      }
      const results = await movieService.searchMovies(query, parseInt(page) || 1);
      res.json({
        success: true,
        results: results.results,
        total_pages: results.total_pages,
        current_page: results.current_page,
        query
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al buscar películas' });
    }
  },

  // Obtener detalles de una película
  async getMovieDetails(req, res) {
    try {
      const id = req.params.id;
      const movie = await movieService.getMovieDetails(id);
      if (!movie) {
        return res.status(404).json({ error: 'Película no encontrada' });
      }
      res.json({ success: true, movie });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener detalles' });
    }
  }
};

module.exports = movieController;