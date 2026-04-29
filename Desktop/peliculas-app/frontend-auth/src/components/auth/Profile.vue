<template>
  <div class="profile-container">
    <h2>Mi Perfil</h2>
    <div v-if="authStore.user" class="user-info">
      <p><strong>Nombre:</strong> {{ authStore.user.nombre }}</p>
      <p><strong>Email:</strong> {{ authStore.user.email }}</p>
    </div>
    <div class="lists-section">
      <h3>Mis listas</h3>
      <div class="lists-grid">
        <div v-for="lista in listas" :key="lista.nombre" class="lista-card">
          <div class="icon">{{ lista.icono }}</div>
          <div class="info">
            <strong>{{ lista.nombre }}</strong>
            <span>{{ lista.cantidad }} películas</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useListaStore } from '../../stores/lista';

const authStore = useAuthStore();
const listaStore = useListaStore();
const listas = ref([]);

onMounted(async () => {
  const tipos = ['favoritas', 'pendientes', 'vistas'];
  const iconos = { favoritas: '❤️', pendientes: '⏳', vistas: '👁️' };
  const cantidades = {};
  for (const tipo of tipos) {
    await listaStore.fetchPeliculasDeLista(tipo);
    cantidades[tipo] = listaStore.peliculasEnLista[tipo].length;
  }
  listas.value = tipos.map(nombre => ({
    nombre,
    icono: iconos[nombre],
    cantidad: cantidades[nombre]
  }));
});
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #1a1a1a;
  border-radius: 15px;
  border: 1px solid #2a0000;
  color: white;
}
.user-info p {
  margin: 0.5rem 0;
}
.lists-section {
  margin-top: 2rem;
}
.lists-grid {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}
.lista-card {
  background: #0a0a0a;
  border: 1px solid #2a0000;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 180px;
}
.icon {
  font-size: 2rem;
}
.info {
  display: flex;
  flex-direction: column;
}
.info strong {
  text-transform: capitalize;
}
.info span {
  font-size: 0.8rem;
  color: #aaa;
}
</style>