<template>
  <div class="auth-container">
    <form @submit.prevent="handleSubmit" class="auth-card">
      <h2>Registro de Usuario</h2>

      <div v-if="error" class="error">{{ error }}</div>

      <div class="form-group">
        <label>Nombre:</label>
        <input type="text" v-model="form.nombre" required minlength="3" />
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input type="email" v-model="form.email" required />
      </div>

      <div class="form-group">
        <label>Contraseña:</label>
        <input type="password" v-model="form.password" required minlength="6" />
      </div>

      <div class="form-group">
        <label>Confirmar Contraseña:</label>
        <input type="password" v-model="form.confirmPassword" required />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Registrando...' : 'Registrarse' }}
      </button>

      <p class="link">
        ¿Ya tienes cuenta?
        <router-link to="/login">Inicia sesión</router-link>
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

const form = ref({
  nombre: '',
  email: '',
  password: '',
  confirmPassword: '',
});
const error = ref('');
const loading = ref(false);

const handleSubmit = async () => {
  error.value = '';

  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Las contraseñas no coinciden';
    return;
  }

  loading.value = true;

  const result = await authStore.register({
    nombre: form.value.nombre,
    email: form.value.email,
    password: form.value.password,
  });

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
  background: linear-gradient(135deg, #0a0a0a 0%, #1a0000 100%);
}

.auth-card {
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(255, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  border: 1px solid #2a0000;
}

.auth-card h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #ff4444;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #e0e0e0;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #2a0000;
  border-radius: 5px;
  font-size: 1rem;
  background: #1a1a1a;
  color: #e0e0e0;
}

.form-group input:focus {
  outline: none;
  border-color: #ff0000;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
}

button {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #8b0000 0%, #ff0000 100%);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s;
}

button:hover {
  transform: scale(1.02);
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.5);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  background: rgba(255, 0, 0, 0.2);
  color: #ff6666;
  padding: 0.75rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  text-align: center;
  border: 1px solid #ff0000;
}

.link {
  text-align: center;
  margin-top: 1rem;
  color: #888;
}

.link a {
  color: #ff4444;
  text-decoration: none;
}

.link a:hover {
  text-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
}
</style>