const axios = require('axios');
require('dotenv').config();

const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
const BASE_URL = process.env.TMDB_BASE_URL;
const IMAGE_URL = process.env.TMDB_IMAGE_URL;

class MovieService {
  // Obtener películas por categoría (popular, top_rated, upcoming, now_playing)
  async getMoviesByCategory(category, page = 1, genre = null, year = null) {
    try {
      let params = {
        language: 'es-ES',
        page: page
      };

      if (genre) params.with_genres = genre;
      if (year) params.primary_release_year = year;

      const response = await axios.get(`${BASE_URL}/movie/${category}`, {
        headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` },
        params: params
      });
      
      return {
        results: response.data.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
          rating: movie.vote_average.toFixed(1),
          votes: movie.vote_count,
          overview: movie.overview,
          poster: movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : null,
          backdrop: movie.backdrop_path ? `${IMAGE_URL}${movie.backdrop_path}` : null,
          genre_ids: movie.genre_ids
        })),
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
        current_page: response.data.page
      };
    } catch (error) {
      console.error(`Error fetching ${category} movies:`, error.message);
      return { results: [], total_pages: 0, total_results: 0, current_page: 1 };
    }
  }

  // Buscar películas con filtros
  async searchMovies(query, page = 1, genre = null, year = null) {
    try {
      let params = {
        language: 'es-ES',
        query: query,
        page: page
      };

      if (genre) params.with_genres = genre;
      if (year) params.year = year;

      const response = await axios.get(`${BASE_URL}/search/movie`, {
        headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` },
        params: params
      });
      
      return {
        results: response.data.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
          rating: movie.vote_average.toFixed(1),
          overview: movie.overview,
          poster: movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : null
        })),
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
        current_page: response.data.page
      };
    } catch (error) {
      console.error('Error searching movies:', error.message);
      return { results: [], total_pages: 0, total_results: 0, current_page: 1 };
    }
  }

  // Obtener géneros
  async getGenres() {
    try {
      const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
        headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` },
        params: { language: 'es-ES' }
      });
      return response.data.genres;
    } catch (error) {
      console.error('Error fetching genres:', error.message);
      return [];
    }
  }

  // Obtener detalles de una película por ID
  async getMovieDetails(movieId) {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` },
        params: { language: 'es-ES' }
      });
      const movie = response.data;
      return {
        id: movie.id,
        title: movie.title,
        originalTitle: movie.original_title,
        year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
        rating: movie.vote_average.toFixed(1),
        votes: movie.vote_count,
        overview: movie.overview,
        poster: movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : null,
        backdrop: movie.backdrop_path ? `${IMAGE_URL}${movie.backdrop_path}` : null,
        genres: movie.genres.map(g => g.name),
        runtime: movie.runtime,
        tagline: movie.tagline
      };
    } catch (error) {
      console.error('Error fetching movie details:', error.message);
      return null;
    }
  }
}

module.exports = new MovieService();