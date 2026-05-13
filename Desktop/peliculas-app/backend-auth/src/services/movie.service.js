const axios = require('axios');
require('dotenv').config();

const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
const BASE_URL = process.env.TMDB_BASE_URL;
const IMAGE_URL = process.env.TMDB_IMAGE_URL;

class MovieService {
  async getMoviesByCategory(category, page = 1) {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${category}`, {
        headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` },
        params: { language: 'es-ES', page }
      });
      return {
        results: response.data.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
          rating: movie.vote_average.toFixed(1),
          poster: movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : null,
          backdrop: movie.backdrop_path ? `${IMAGE_URL}${movie.backdrop_path}` : null,
          overview: movie.overview,
          genre_ids: movie.genre_ids
        })),
        total_pages: response.data.total_pages,
        current_page: response.data.page
      };
    } catch (error) {
      console.error('Error fetching movies:', error.message);
      return { results: [], total_pages: 0, current_page: 1 };
    }
  }

  async searchMovies(query, page = 1) {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` },
        params: { language: 'es-ES', query, page }
      });
      return {
        results: response.data.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
          rating: movie.vote_average.toFixed(1),
          poster: movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : null,
          overview: movie.overview
        })),
        total_pages: response.data.total_pages,
        current_page: response.data.page
      };
    } catch (error) {
      console.error('Error searching movies:', error.message);
      return { results: [], total_pages: 0, current_page: 1 };
    }
  }

 async getMovieDetails(id) {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` },
      params: {
        language: 'es-ES',
        append_to_response: 'credits,videos,recommendations,reviews,images'
      }
    });
    const movie = response.data;
    return {
      id: movie.id,
      title: movie.title,
      year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
      runtime: movie.runtime,
      genres: movie.genres.map(g => g.name),
      overview: movie.overview,
      poster: movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : null,
      backdrop: movie.backdrop_path ? `${IMAGE_URL}${movie.backdrop_path}` : null,
      tagline: movie.tagline,
      rating: movie.vote_average.toFixed(1),
      votes: movie.vote_count,
      credits: movie.credits,         // reparto
      videos: movie.videos,           // tráilers
      recommendations: movie.recommendations, //  recomendaciones
    };
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    return null;
  }
}
}

module.exports = new MovieService();