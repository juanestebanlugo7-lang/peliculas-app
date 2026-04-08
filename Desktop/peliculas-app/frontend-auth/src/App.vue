<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="nav-brand">Catálogo Películas</router-link>
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #0a0a0a;
  color: #e0e0e0;
}

.navbar {
  background: linear-gradient(135deg, #1a0000 0%, #8b0000 100%);
  padding: 1rem 2rem;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  border-bottom: 2px solid #ff0000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: all 0.3s;
}

.nav-links a:hover {
  background: rgba(255, 0, 0, 0.4);
  text-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
}

.nav-btn {
  background: rgba(255, 0, 0, 0.3);
  color: white;
  border: 1px solid #ff0000;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.nav-btn:hover {
  background: #ff0000;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
}

main {
  min-height: calc(100vh - 70px);
}
</style>