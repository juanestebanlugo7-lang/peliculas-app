const axios = require('axios');
require('dotenv').config();

const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
const BASE_URL = process.env.TMDB_BASE_URL;
const IMAGE_URL = process.env.TMDB_IMAGE_URL;

class MovieService {
  async getPopularMovies(page = 1) {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`
        },
        params: {
          language: 'es-ES',
          page: page
        }
      });
      
      return response.data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        originalTitle: movie.original_title,
        year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
        rating: movie.vote_average.toFixed(1),
        votes: movie.vote_count,
        overview: movie.overview,
        poster: movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : null,
        backdrop: movie.backdrop_path ? `${IMAGE_URL}${movie.backdrop_path}` : null
      }));
    } catch (error) {
      console.error('Error fetching popular movies:', error.response?.data || error.message);
      return [];
    }
  }

  async searchMovies(query, page = 1) {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`
        },
        params: {
          language: 'es-ES',
          query: query,
          page: page
        }
      });
      
      return response.data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
        rating: movie.vote_average.toFixed(1),
        overview: movie.overview,
        poster: movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : null
      }));
    } catch (error) {
      console.error('Error searching movies:', error.response?.data || error.message);
      return [];
    }
  }

  async getMovieDetails(movieId) {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`
        },
        params: {
          language: 'es-ES'
        }
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
      console.error('Error fetching movie details:', error.response?.data || error.message);
      return null;
    }
  }
}

module.exports = new MovieService();