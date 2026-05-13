<template>
  <div>
    <LoginForm v-if="!show2FA" @login-requires-2fa="onRequires2FA" @login-success="onLoginSuccess" />
    <TwoFactorPrompt v-else @success="on2FASuccess" @cancel="show2FA = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoginForm from '../components/auth/LoginForm.vue';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const show2FA = ref(false);

const onRequires2FA = () => {
  show2FA.value = true;
};

const onLoginSuccess = () => {
  router.push('/movies');
};

const on2FASuccess = () => {
  router.push('/movies');
};
</script>