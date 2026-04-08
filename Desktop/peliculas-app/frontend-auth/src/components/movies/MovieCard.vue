<template>
  <div class="movie-card" @click="goToDetail">
    <div class="movie-card__image">
      <img 
        v-if="movie.poster" 
        :src="movie.poster" 
        :alt="movie.title"
        class="movie-poster"
        @error="handleImageError"
      />
      <div v-else class="movie-placeholder">🎬</div>
    </div>
    <div class="movie-card__info">
      <h3 class="movie-card__title">{{ movie.title }}</h3>
      <p class="movie-card__year">{{ movie.year }}</p>
      <div class="movie-card__rating">⭐ {{ movie.rating }}</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  movie: { type: Object, required: true }
});

const router = useRouter();

const goToDetail = () => {
  router.push(`/movie/${props.movie.id}`);
};

const handleImageError = (e) => {
  e.target.style.display = 'none';
  e.target.parentElement.innerHTML = '<div class="movie-placeholder"></div>';
};
</script>

<style scoped>
.movie-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}
.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.2);
}
.movie-card__image {
  width: 100%;
  height: 350px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.movie-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.movie-card:hover .movie-poster {
  transform: scale(1.05);
}
.movie-placeholder {
  font-size: 4rem;
  color: rgba(255,255,255,0.8);
}
.movie-card__info {
  padding: 1rem;
}
.movie-card__title {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.movie-card__year {
  margin: 0.25rem 0;
  font-size: 0.85rem;
  color: #666;
}
.movie-card__rating {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #f5a623;
}
</style>