<template>
  <div class="movie-card" @click="goToDetail">
    <div class="movie-card__image">
      <img v-if="movie.poster" :src="movie.poster" :alt="movie.title" />
      <div v-else class="placeholder"></div>
    </div>
    <div class="movie-card__info">
      <h3>{{ movie.title }}</h3>
      <p>{{ movie.year }}</p>
      <div class="rating">⭐ {{ movie.rating }}</div>
      <div class="list-actions">
        <button @click.stop="toggleLista('favoritas')" :class="{ active: estaEnFavoritas }">❤️</button>
        <button @click.stop="toggleLista('pendientes')" :class="{ active: estaEnPendientes }">⏳</button>
        <button @click.stop="toggleLista('vistas')" :class="{ active: estaEnVistas }">👁️</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useListaStore } from '../../stores/lista';

const props = defineProps({ movie: Object });
const router = useRouter();
const listaStore = useListaStore();

const estaEnFavoritas = ref(false);
const estaEnPendientes = ref(false);
const estaEnVistas = ref(false);

onMounted(async () => {
  estaEnFavoritas.value = await listaStore.verificarEnLista('favoritas', props.movie.id);
  estaEnPendientes.value = await listaStore.verificarEnLista('pendientes', props.movie.id);
  estaEnVistas.value = await listaStore.verificarEnLista('vistas', props.movie.id);
});

const toggleLista = async (nombre) => {
  if (nombre === 'favoritas') {
    if (estaEnFavoritas.value) await listaStore.quitarPelicula(nombre, props.movie.id);
    else await listaStore.agregarPelicula(nombre, props.movie.id);
    estaEnFavoritas.value = !estaEnFavoritas.value;
  } else if (nombre === 'pendientes') {
    if (estaEnPendientes.value) await listaStore.quitarPelicula(nombre, props.movie.id);
    else await listaStore.agregarPelicula(nombre, props.movie.id);
    estaEnPendientes.value = !estaEnPendientes.value;
  } else if (nombre === 'vistas') {
    if (estaEnVistas.value) await listaStore.quitarPelicula(nombre, props.movie.id);
    else await listaStore.agregarPelicula(nombre, props.movie.id);
    estaEnVistas.value = !estaEnVistas.value;
  }
};

const goToDetail = () => router.push(`/movie/${props.movie.id}`);
</script>

<style scoped>
.movie-card {
  background: #1a1a1a; border-radius: 12px; overflow: hidden; cursor: pointer; transition: transform 0.2s;
}
.movie-card:hover { transform: scale(1.02); }
.movie-card__image {
  height: 350px; background: #2a2a2a; display: flex; align-items: center; justify-content: center;
}
.movie-card__image img { width: 100%; height: 100%; object-fit: cover; }
.placeholder { font-size: 3rem; color: #888; }
.movie-card__info { padding: 0.75rem; color: white; }
.rating { color: #ffc107; margin-top: 0.25rem; }
.list-actions { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
.list-actions button {
  background: rgba(0,0,0,0.4); border: 1px solid #555; border-radius: 20px;
  padding: 0.2rem 0.5rem; cursor: pointer; font-size: 0.8rem;
}
.list-actions button.active { background: #8b0000; border-color: #ff0000; }
</style>