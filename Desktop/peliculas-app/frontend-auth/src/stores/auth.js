import { defineStore } from 'pinia';
import api from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userName: (state) => state.user?.nombre || '',
  },

  actions: {
    async register(userData) {
      this.loading = true;
      try {
        const response = await api.post('/auth/register', userData);
        this.token = response.data.token;
        this.user = response.data.usuario;
        localStorage.setItem('token', this.token);
        return { success: true, data: response.data };
      } catch (error) {
        return {
          success: false,
          error: error.response?.data?.error || 'Error al registrar',
        };
      } finally {
        this.loading = false;
      }
    },

    async login(credentials) {
      this.loading = true;
      try {
        const response = await api.post('/auth/login', credentials);
        this.token = response.data.token;
        this.user = response.data.usuario;
        localStorage.setItem('token', this.token);
        return { success: true, data: response.data };
      } catch (error) {
        return {
          success: false,
          error: error.response?.data?.error || 'Error al iniciar sesión',
        };
      } finally {
        this.loading = false;
      }
    },

    async getProfile() {
      if (!this.token) return;
      try {
        const response = await api.get('/auth/profile');
        this.user = response.data;
      } catch (error) {
        console.error('Error al obtener perfil:', error);
        this.logout();
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    },
  },
});