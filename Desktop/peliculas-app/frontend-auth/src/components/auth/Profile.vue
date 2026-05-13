<template>
 <div class="profile-container">
    <h2>Mi Perfil</h2>
    <div v-if="authStore.user" class="profile-info">
      <p><strong>Nombre:</strong> {{ authStore.user.nombre }}</p>
      <p><strong>Email:</strong> {{ authStore.user.email }}</p>
      <p><strong>Fecha de registro:</strong> {{ formatDate(authStore.user.fecha_registro) }}</p>
      <button @click="logout" class="logout-btn">Cerrar Sesión</button>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const logout = () => {
  if (typeof authStore.logout === 'function') {
    authStore.logout();
  }
};
</script>

<style scoped>
.list-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}
.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
.back-btn {
  background: #8b0000;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  color: white;
  cursor: pointer;
}
.movies-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
.loading, .error, .empty {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}
@media (max-width: 1024px) {
  .movies-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .movies-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>