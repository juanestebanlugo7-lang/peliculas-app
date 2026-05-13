import { defineStore } from 'pinia';
import api from '../services/api';

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [],
    loading: false,
    currentPage: 1,
    totalPages: 0,
    currentCategory: 'popular'
  }),
  actions: {
    async fetchMovies() {
      this.loading = true;
      try {
        const res = await api.get(`/movies/${this.currentCategory}?page=${this.currentPage}`);
        this.movies = res.data.results;
        this.totalPages = res.data.total_pages;
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        this.loading = false;
      }
    },
    
    changeCategory(category) {
      this.currentCategory = category;
      this.currentPage = 1;
      this.fetchMovies();
    },
    async searchMovies() {
  this.loading = true;
  try {
    const res = await api.get(`/movies/search?query=${encodeURIComponent(this.searchQuery)}&page=${this.currentPage}`);
    this.movies = res.data.results;
    this.totalPages = res.data.total_pages;
    this.currentPage = res.data.current_page;
  } catch (error) {
    console.error(error);
  } finally {
    this.loading = false;
  }
},
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchMovies();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchMovies();
      }
    },
    async fetchMovieDetails(id) {
      try {
        const res = await api.get(`/movies/detail/${id}`);
        return res.data.movie;
      } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
      }
    }
  }
});