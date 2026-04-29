<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="nav-brand"> VIPERDBOX</router-link>
        <div class="nav-links">
          <template v-if="authStore.isAuthenticated">
            <router-link to="/movies">Películas</router-link>
            <router-link to="/profile">Perfil</router-link>
            <button @click="handleLogout" class="nav-btn">Cerrar Sesión</button>
          </template>
          <template v-else>
            <router-link to="/login">Iniciar Sesión</router-link>
            <router-link to="/register">Registrarse</router-link>
          </template>
        </div>
      </div>
    </nav>
    <main><router-view /></main>
  </div>
</template>

<script setup>
import { useAuthStore } from './stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #0a0a0a; font-family: 'Segoe UI', sans-serif; }
.navbar {
  background: linear-gradient(135deg, #1a0000 0%, #8b0000 100%);
  padding: 1rem 2rem;
  border-bottom: 2px solid #ff0000;
}
.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-brand { color: white; text-decoration: none; font-size: 1.5rem; font-weight: bold; }
.nav-links { display: flex; gap: 1.5rem; align-items: center; }
.nav-links a, .nav-btn {
  color: white;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}
.nav-links a:hover, .nav-btn:hover { background: rgba(255,0,0,0.4); }
main { padding: 1rem; }
</style>