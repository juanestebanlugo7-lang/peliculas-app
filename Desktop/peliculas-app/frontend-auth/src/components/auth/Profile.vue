<template>
  <div class="profile-container">
    <h2>Mi Perfil</h2>

    <div v-if="authStore.loading" class="loading">
      <div class="spinner"></div>
      Cargando...
    </div>

    <div v-else-if="authStore.user" class="profile-card">
      <div class="profile-avatar">
        <img 
          src="https://i.pinimg.com/474x/15/28/77/152877614590df059843d8c83fbff904.jpg" 
          alt="Avatar" 
          class="avatar-image"
        />
      </div>
      <div class="profile-info">
        <p><strong>ID:</strong> {{ authStore.user.id }}</p>
        <p><strong>Nombre:</strong> {{ authStore.user.nombre }}</p>
        <p><strong>Email:</strong> {{ authStore.user.email }}</p>
        <p><strong>Fecha de registro:</strong> {{ formatDate(authStore.user.fecha_registro) }}</p>
      </div>
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
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(255, 0, 0, 0.2);
  border: 1px solid #2a0000;
}

.profile-container h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #ff4444;
  font-size: 2rem;
}

.profile-card {
  background: #1a1a1a;
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #2a0000;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #8b0000 0%, #ff0000 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover; 
}

.profile-info p {
  margin: 0.75rem 0;
  color: #e0e0e0;
  padding: 0.5rem;
  border-bottom: 1px solid #2a0000;
}

.profile-info strong {
  color: #ff4444;
  display: inline-block;
  width: 140px;
}

.logout-btn {
  background: linear-gradient(135deg, #8b0000 0%, #ff0000 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  margin-top: 1rem;
  transition: all 0.3s;
}

.logout-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.5);
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #888;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #2a0000;
  border-top-color: #ff0000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>