<template>
  <div class="pagination-container">
    <div class="pagination-info">
      Mostrando {{ moviesStore.startCount }} - {{ moviesStore.endCount }} de {{ moviesStore.totalResults }} películas
    </div>
    
    <div class="pagination-controls">
      <button 
        @click="moviesStore.prevPage()" 
        :disabled="!moviesStore.hasPrevPage"
        class="page-btn"
      >
        ◀ Anterior
      </button>

      <div class="page-numbers">
        <button 
          v-for="page in visiblePages" 
          :key="page"
          @click="moviesStore.goToPage(page)"
          :class="{ active: moviesStore.currentPage === page }"
          class="page-number"
        >
          {{ page }}
        </button>
      </div>

      <button 
        @click="moviesStore.nextPage()" 
        :disabled="!moviesStore.hasNextPage"
        class="page-btn"
      >
        Siguiente ▶
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMoviesStore } from '../../stores/movies';

const moviesStore = useMoviesStore();

const visiblePages = computed(() => {
  const current = moviesStore.currentPage;
  const total = moviesStore.totalPages;
  const maxVisible = 5;
  
  let start = Math.max(1, current - Math.floor(maxVisible / 2));
  let end = Math.min(total, start + maxVisible - 1);
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }
  
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});
</script>

<style scoped>
.pagination-container {
  margin-top: 2rem;
  padding: 1rem;
  text-align: center;
}

.pagination-info {
  color: #888;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.pagination-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.page-btn {
  background: #1a1a1a;
  color: #e0e0e0;
  border: 1px solid #2a0000;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;
}

.page-btn:hover:not(:disabled) {
  background: #2a0000;
  border-color: #ff0000;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-number {
  background: #0a0a0a;
  color: #e0e0e0;
  border: 1px solid #2a0000;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}

.page-number:hover {
  background: #2a0000;
  border-color: #ff0000;
}

.page-number.active {
  background: linear-gradient(135deg, #8b0000 0%, #ff0000 100%);
  border-color: #ff0000;
  color: white;
}
</style>