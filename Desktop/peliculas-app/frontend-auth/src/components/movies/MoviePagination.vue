<template>
  <div class="pagination">
    <button :disabled="!store.hasPrevPage" @click="store.prevPage()">◀ Anterior</button>
    <span>Página {{ store.currentPage }} de {{ store.totalPages }}</span>
    <button :disabled="!store.hasNextPage" @click="store.nextPage()">Siguiente ▶</button>
  </div>
</template>
<script setup>
import { useMoviesStore } from '../../stores/movies';
const store = useMoviesStore();
</script>
<style scoped>
.pagination { 
  display: flex; 
  justify-content: center; 
  gap: 2rem; 
  margin-top: 2rem; }
button { 
  background: #8b0000; 
  border: none; 
  padding: 0.5rem 1rem; 
  color: white; 
  border-radius: 20px; 
  cursor: pointer; }
button:disabled { 
  opacity: 0.5; 
  cursor: not-allowed; }
</style>