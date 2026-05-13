import { defineStore } from 'pinia';
import api from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    async login(credentials) {
      this.loading = true;
      try {
        const res = await api.post('/auth/login', credentials);
        this.token = res.data.token;
        this.user = res.data.usuario;
        localStorage.setItem('token', this.token);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.response?.data?.error || 'Error al iniciar sesión' };
      } finally {
        this.loading = false;
      }
    },
    async register(userData) {
      this.loading = true;
      try {
        const res = await api.post('/auth/register', userData);
        this.token = res.data.token;
        this.user = res.data.usuario;
        localStorage.setItem('token', this.token);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.response?.data?.error || 'Error al registrar' };
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    }
  }
});