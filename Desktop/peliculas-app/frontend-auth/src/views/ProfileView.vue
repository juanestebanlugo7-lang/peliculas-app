<template>
  <div class="profile-container">
    <h2>Mi Perfil</h2>
    <div v-if="authStore.user" class="profile-card">
      <p><strong>Nombre:</strong> {{ authStore.user.nombre }}</p>
      <p><strong>Email:</strong> {{ authStore.user.email }}</p>
      <button @click="logout" class="logout-btn">Cerrar Sesión</button>
    </div>
    <div class="lists-section">
      <h3>Mis listas</h3>
      <div v-if="loading" class="loading">Cargando...</div>
      <div v-else class="lists-grid">
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
import { useAuthStore } from '../stores/auth';
import { useListaStore } from '../stores/lista';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const listaStore = useListaStore();
const router = useRouter();
const listas = ref([]);
const loading = ref(false);

const loadLists = async () => {
  loading.value = true;
  const tipos = ['favoritas', 'pendientes', 'vistas'];
  const iconos = { favoritas: '❤️', pendientes: '⏳', vistas: '👁️' };
  const cant = {};
  for (const t of tipos) {
    await listaStore.fetchPeliculasDeLista(t);
    cant[t] = listaStore.peliculasEnLista[t].length;
  }
  listas.value = tipos.map(n => ({ nombre: n, icono: iconos[n], cantidad: cant[n] }));
  loading.value = false;
};

const logout = () => { authStore.logout(); router.push('/login'); };
onMounted(loadLists);
</script>

<style scoped>
.profile-container { 
  max-width: 600px; 
  margin: 2rem auto; 
  padding: 2rem; 
  background: #1a1a1a; 
  border-radius: 15px; 
  color: white; }
.profile-card { 
  margin-bottom: 2rem; }
.lists-section { 
  background: rgba(0,0,0,0.3); 
  padding: 1rem; 
  border-radius: 12px; }
.lists-grid { 
  display: flex; 
  gap: 1rem; 
  flex-wrap: wrap; }
.lista-card { 
  background: #0a0a0a; 
  border: 1px solid #2a0000; 
  border-radius: 12px; 
  padding: 0.8rem 1.2rem; 
  display: flex; 
  align-items: center; 
  gap: 0.8rem; 
  min-width: 140px; }
.icon { 
  font-size: 1.8rem; }
.info strong { 
  text-transform: capitalize; 
  color: #ff4444; }
.logout-btn { 
  background: #8b0000; 
  border: none; 
  padding: 0.5rem 1rem; 
  border-radius: 25px; 
  color: white; 
  cursor: pointer; }
</style>