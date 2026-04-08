import { defineStore } from 'pinia';
import api from '../services/api';

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchPopularMovies() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get('/movies/popular');
        this.movies = response.data.results;
      } catch (error) {
        this.error = 'Error al cargar películas';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async searchMovies(query) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get(`/movies/search?query=${query}`);
        this.movies = response.data.results;
      } catch (error) {
        this.error = 'Error al buscar películas';
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }
});