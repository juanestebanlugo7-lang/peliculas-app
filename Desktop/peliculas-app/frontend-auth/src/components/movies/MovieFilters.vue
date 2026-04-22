<template>
  <div class="filters-container">
    <div class="category-buttons">
      <button 
        v-for="cat in categories" 
        :key="cat.value"
        @click="selectCategory(cat.value)"
        :class="{ active: moviesStore.currentCategory === cat.value }"
        class="category-btn"
      >
        {{ cat.label }}
      </button>
    </div>

    <div class="filter-row">
      <div class="filter-group">
        <label>Género:</label>
        <select v-model="localGenre" @change="applyFilters" class="filter-select">
          <option :value="null">Todos</option>
          <option v-for="genre in moviesStore.genres" :key="genre.id" :value="genre.id">
            {{ genre.name }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label>Año:</label>
        <select v-model="localYear" @change="applyFilters" class="filter-select">
          <option :value="null">Todos</option>
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>

      <button v-if="hasActiveFilters" @click="clearFilters" class="clear-btn">
        Limpiar filtros
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useMoviesStore } from '../../stores/movies';

const moviesStore = useMoviesStore();

const categories = [
  { label: ' Populares', value: 'popular' },
  { label: ' Mejor puntuadas', value: 'top_rated' },
  { label: ' Próximos estrenos', value: 'upcoming' },
  { label: ' En cines', value: 'now_playing' }
];

const localGenre = ref(moviesStore.selectedGenre);
const localYear = ref(moviesStore.selectedYear);

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

const hasActiveFilters = computed(() => {
  return moviesStore.selectedGenre !== null || moviesStore.selectedYear !== null;
});

const selectCategory = (category) => {
  moviesStore.changeCategory(category);
};

const applyFilters = () => {
  moviesStore.applyFilters({
    genre: localGenre.value,
    year: localYear.value
  });
};

const clearFilters = () => {
  localGenre.value = null;
  localYear.value = null;
  moviesStore.clearFilters();
};

onMounted(() => {
  moviesStore.fetchGenres();
});
</script>

<style scoped>
.filters-container {
  background: #1a1a1a;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: 1px solid #2a0000;
}

.category-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #2a0000;
}

.category-btn {
  background: #0a0a0a;
  color: #e0e0e0;
  border: 1px solid #2a0000;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;
}

.category-btn:hover {
  background: #2a0000;
  border-color: #ff0000;
}

.category-btn.active {
  background: linear-gradient(135deg, #8b0000 0%, #ff0000 100%);
  border-color: #ff0000;
  color: white;
}

.filter-row {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-group label {
  color: #ff4444;
  font-weight: bold;
}

.filter-select {
  background: #0a0a0a;
  color: #e0e0e0;
  border: 1px solid #2a0000;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
}

.filter-select:hover {
  border-color: #ff0000;
}

.clear-btn {
  background: #2a0000;
  color: #ff4444;
  border: 1px solid #ff0000;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;
}

.clear-btn:hover {
  background: #ff0000;
  color: white;
}
</style>