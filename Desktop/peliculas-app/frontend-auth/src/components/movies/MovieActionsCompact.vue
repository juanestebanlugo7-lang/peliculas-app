<template>
  <div class="movie-actions-compact">
    <button
      v-for="lista in listas"
      :key="lista.nombre"
      @click="toggleLista(lista.nombre)"
      :class="{ active: estaEnLista[lista.nombre] }"
      class="action-btn"
      :title="lista.nombre"
    >
      <span class="icon">{{ lista.icono }}</span>
      <span class="label">{{ lista.nombre }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useListaStore } from '../../stores/lista';

const props = defineProps({ peliculaId: Number });
const listaStore = useListaStore();
const listas = ref([
  { nombre: 'favoritas' },
  { nombre: 'pendientes' },
  { nombre: 'vistas' }
]);
const estaEnLista = ref({ favoritas: false, pendientes: false, vistas: false });

onMounted(async () => {
  for (const lista of listas.value) {
    estaEnLista.value[lista.nombre] = await listaStore.verificarEnLista(lista.nombre, props.peliculaId);
  }
});

const toggleLista = async (nombreLista) => {
  if (estaEnLista.value[nombreLista]) {
    await listaStore.quitarPelicula(nombreLista, props.peliculaId);
    estaEnLista.value[nombreLista] = false;
  } else {
    await listaStore.agregarPelicula(nombreLista, props.peliculaId);
    estaEnLista.value[nombreLista] = true;
  }
};
</script>

<style scoped>
.movie-actions-compact {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.75rem;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.action-btn {
  background: rgba(0,0,0,0.4);
  border: 1px solid #555;
  padding: 0.25rem 0.7rem;
  border-radius: 20px;
  font-size: 0.75rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.2s;
  color: #eee;
}
.action-btn.active {
  background: #8b0000;
  border-color: #ff4444;
  color: white;
}
.icon {
  font-size: 0.8rem;
}
.label {
  text-transform: capitalize;
}
</style>