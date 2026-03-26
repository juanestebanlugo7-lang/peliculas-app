<template>
  <div class="auth-container">
    <form @submit.prevent="handleSubmit" class="auth-card">
      <h2>Iniciar Sesión</h2>

      <div v-if="error" class="error">{{ error }}</div>

      <div class="form-group">
        <label>Email:</label>
        <input type="email" v-model="form.email" required />
      </div>

      <div class="form-group">
        <label>Contraseña:</label>
        <input type="password" v-model="form.password" required />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Cargando...' : 'Ingresar' }}
      </button>

      <p class="link">
        ¿No tienes cuenta?
        <router-link to="/register">Regístrate</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const form = ref({ email: '', password: '' });
const error = ref('');
const loading = ref(false);

const handleSubmit = async () => {
  error.value = '';
  loading.value = true;

  const result = await authStore.login(form.value);

  if (result.success) {
    router.push('/profile');
  } else {
    error.value = result.error;
  }

  loading.value = false;
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.auth-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.auth-card h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  background: #fee;
  color: #c33;
  padding: 0.75rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  text-align: center;
}

.link {
  text-align: center;
  margin-top: 1rem;
  color: #666;
}

.link a {
  color: #667eea;
  text-decoration: none;
}
</style>