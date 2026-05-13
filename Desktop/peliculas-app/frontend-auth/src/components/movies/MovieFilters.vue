<template>
  <div class="filters-container">
    <div class="category-buttons">
      <button v-for="cat in categories" :key="cat.value" @click="store.changeCategory(cat.value)" :class="{ active: store.currentCategory === cat.value }" class="category-btn">{{ cat.label }}</button>
    </div>
    <div class="filter-row">
      <div class="filter-group"><label>Género:</label><select v-model="localGenre" @change="applyFilters" class="filter-select"><option :value="null">Todos</option><option v-for="g in store.genres" :key="g.id" :value="g.id">{{ g.name }}</option></select></div>
      <div class="filter-group"><label>Año:</label><select v-model="localYear" @change="applyFilters" class="filter-select"><option :value="null">Todos</option><option v-for="y in years" :key="y" :value="y">{{ y }}</option></select></div>
      <button v-if="hasActiveFilters" @click="clearFilters" class="clear-btn">Limpiar filtros</button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useMoviesStore } from '../../stores/movies';
const store = useMoviesStore();
const categories = [
  { label: 'Populares', value: 'popular' }, { label: 'Mejor puntuadas', value: 'top_rated' },
  { label: 'Próximos estrenos', value: 'upcoming' }, { label: 'En cines', value: 'now_playing' }
];
const localGenre = ref(store.selectedGenre);
const localYear = ref(store.selectedYear);
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
const hasActiveFilters = computed(() => store.selectedGenre || store.selectedYear);
const applyFilters = () => store.applyFilters({ genre: localGenre.value, year: localYear.value });
const clearFilters = () => { localGenre.value = null; localYear.value = null; store.clearFilters(); };
onMounted(() => store.fetchGenres());
</script>
<style scoped>
.filters-container {
  background: #1a1a1a;
  padding: 1.2rem;
  border-radius: 20px;
  margin-bottom: 2rem;
}

.category-buttons {
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #2a0000;
  justify-content: center;  /* Centrar los botones */
}

.category-btn {
  background: #0a0a0a;
  color: white;
  border: 1px solid #2a0000;
  padding: 0.7rem 1.5rem;
  border-radius: 40px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.category-btn.active {
  background: #8b0000;
  border-color: #ff0000;
  box-shadow: 0 0 6px rgba(255,0,0,0.5);
}

.filter-row {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.filter-group label {
  font-size: 1rem;
  font-weight: bold;
  color: #ff4444;
  margin-right: 0.8rem;
}

.filter-select {
  background: #0a0a0a;
  color: white;
  border: 1px solid #2a0000;
  padding: 0.6rem 1rem;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;
}

.filter-select:hover {
  border-color: #ff0000;
}

.clear-btn {
  background: #2a0000;
  color: #ff4444;
  border: 1px solid #ff0000;
  padding: 0.6rem 1.2rem;
  border-radius: 40px;
  font-size: 1rem;
  cursor: pointer;
}</style>