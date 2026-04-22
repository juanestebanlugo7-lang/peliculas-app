const movieService = require('../services/movie.service');

const movieController = {
  // Obtener películas por categoría
  getMoviesByCategory: async (req, res) => {
    try {
      const category = req.params.category || 'popular';
      const page = parseInt(req.query.page) || 1;
      const genre = req.query.genre || null;
      const year = req.query.year || null;

      const movies = await movieService.getMoviesByCategory(category, page, genre, year);
      res.json({
        success: true,
        results: movies.results,
        total_pages: movies.total_pages,
        total_results: movies.total_results,
        current_page: movies.current_page,
        category: category
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener películas' });
    }
  },

  // Buscar películas
  searchMovies: async (req, res) => {
    try {
      const { query, page, genre, year } = req.query;
      if (!query) {
        return res.status(400).json({ error: 'Se requiere un término de búsqueda' });
      }
      const movies = await movieService.searchMovies(query, parseInt(page) || 1, genre, year);
      res.json({
        success: true,
        results: movies.results,
        total_pages: movies.total_pages,
        total_results: movies.total_results,
        current_page: movies.current_page,
        query: query
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al buscar películas' });
    }
  },

  // Obtener géneros
  getGenres: async (req, res) => {
    try {
      const genres = await movieService.getGenres();
      res.json({ success: true, genres });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener géneros' });
    }
  },

  // Obtener detalles de una película por ID
  getMovieDetails: async (req, res) => {
    try {
      const { id } = req.params;
      const movie = await movieService.getMovieDetails(id);
      if (!movie) {
        return res.status(404).json({ error: 'Película no encontrada' });
      }
      res.json({ success: true, movie });
    } catch (error) {
      console.error('Error al obtener detalles:', error);
      res.status(500).json({ error: 'Error al obtener detalles de la película' });
    }
  }
};

module.exports = movieController;