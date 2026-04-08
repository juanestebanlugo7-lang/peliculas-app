<template>
  <div class="home">
    <h1>Bienvenido al Catálogo de Películas</h1>
    <p v-if="authStore.isAuthenticated">
      Hola, {{ authStore.userName }}. ¡Bienvenido!
    </p>
    <p v-else>
      Por favor, <router-link to="/login">inicia una sesión</router-link> para
      continuar.
    </p>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}
.home h1 {
  margin-bottom: 1rem;
  color: #ffffff;
}
.home a {
  color: #667eea;
  text-decoration: none;
}
</style>