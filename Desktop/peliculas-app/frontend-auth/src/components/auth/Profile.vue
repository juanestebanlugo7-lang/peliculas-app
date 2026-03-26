<template>
  <div class="profile-container">
    <h2>Mi Perfil</h2>

    <div v-if="authStore.loading" class="loading">Cargando...</div>

    <div v-else-if="authStore.user" class="profile-card">
      <p><strong>ID:</strong> {{ authStore.user.id }}</p>
      <p><strong>Nombre:</strong> {{ authStore.user.nombre }}</p>
      <p><strong>Email:</strong> {{ authStore.user.email }}</p>
      <p>
        <strong>Fecha de registro:</strong>
        {{ formatDate(authStore.user.fecha_registro) }}
      </p>
      <button @click="handleLogout" class="logout-btn">Cerrar Sesión</button>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};

const formatDate = (date) => {
  if (!date) return 'No disponible';
  return new Date(date).toLocaleDateString('es-ES');
};
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-container h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.profile-card {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.profile-card p {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.logout-btn {
  background: linear-gradient(135deg, #f56565 0%, #c53030 100%);
  margin-top: 1rem;
  width: 100%;
  padding: 0.75rem;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
}
</style>