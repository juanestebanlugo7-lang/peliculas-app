import { defineStore } from 'pinia';
import api from '../services/api';

export const useListaStore = defineStore('lista', {
  state: () => ({
    peliculasEnLista: {
      favoritas: [],
      pendientes: [],
      vistas: []
    }
  }),
  actions: {
    async agregarPelicula(nombreLista, pelicula_id) {
      await api.post('/listas/agregar', { nombreLista, pelicula_id });
      await this.fetchPeliculasDeLista(nombreLista);
    },
    async quitarPelicula(nombreLista, pelicula_id) {
      await api.post('/listas/quitar', { nombreLista, pelicula_id });
      await this.fetchPeliculasDeLista(nombreLista);
    },
    async verificarEnLista(nombreLista, pelicula_id) {
      const res = await api.get(`/listas/${nombreLista}/verificar/${pelicula_id}`);
      return res.data.existe;
    },
    async fetchPeliculasDeLista(nombreLista) {
      const res = await api.get(`/listas/${nombreLista}/peliculas`);
      this.peliculasEnLista[nombreLista] = res.data.peliculas;
    }
  }
});