import { defineStore } from 'pinia';
import api from '../services/api';

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
    currentCategory: 'popular',
    searchQuery: '',
    selectedGenre: null,
    selectedYear: null,
    genres: []
  }),

  getters: {
    hasNextPage: (state) => state.currentPage < state.totalPages,
    hasPrevPage: (state) => state.currentPage > 1,
    startCount: (state) => (state.currentPage - 1) * 20 + 1,
    endCount: (state) => Math.min(state.currentPage * 20, state.totalResults)
  },

  actions: {
    async fetchGenres() {
      try {
        const response = await api.get('/movies/genres');
        this.genres = response.data.genres;
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    },

    async fetchMovies() {
      this.loading = true;
      this.error = null;
      try {
        let url = `/movies/category/${this.currentCategory}?page=${this.currentPage}`;
        if (this.selectedGenre) url += `&genre=${this.selectedGenre}`;
        if (this.selectedYear) url += `&year=${this.selectedYear}`;
        
        const response = await api.get(url);
        this.movies = response.data.results;
        this.totalPages = response.data.total_pages;
        this.totalResults = response.data.total_results;
        this.currentPage = response.data.current_page;
      } catch (error) {
        this.error = 'Error al cargar películas';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async searchMovies() {
      if (!this.searchQuery.trim()) {
        this.currentCategory = 'popular';
        this.selectedGenre = null;
        this.selectedYear = null;
        await this.fetchMovies();
        return;
      }

      this.loading = true;
      this.error = null;
      try {
        let url = `/movies/search?query=${encodeURIComponent(this.searchQuery)}&page=${this.currentPage}`;
        if (this.selectedGenre) url += `&genre=${this.selectedGenre}`;
        if (this.selectedYear) url += `&year=${this.selectedYear}`;
        
        const response = await api.get(url);
        this.movies = response.data.results;
        this.totalPages = response.data.total_pages;
        this.totalResults = response.data.total_results;
        this.currentPage = response.data.current_page;
      } catch (error) {
        this.error = 'Error al buscar películas';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    changeCategory(category) {
      this.currentCategory = category;
      this.searchQuery = '';
      this.currentPage = 1;
      this.fetchMovies();
    },

    nextPage() {
      if (this.hasNextPage) {
        this.currentPage++;
        this.executeCurrentAction();
      }
    },

    prevPage() {
      if (this.hasPrevPage) {
        this.currentPage--;
        this.executeCurrentAction();
      }
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.executeCurrentAction();
      }
    },

    executeCurrentAction() {
      if (this.searchQuery) {
        this.searchMovies();
      } else {
        this.fetchMovies();
      }
    },

    applyFilters({ genre, year }) {
      if (genre !== undefined) this.selectedGenre = genre;
      if (year !== undefined) this.selectedYear = year;
      this.currentPage = 1;
      this.executeCurrentAction();
    },

    clearFilters() {
      this.selectedGenre = null;
      this.selectedYear = null;
      this.currentPage = 1;
      this.executeCurrentAction();
    }
  }
});