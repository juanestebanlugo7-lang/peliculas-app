import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes = [
  { path: '/', redirect: '/movies' },
  { path: '/login', name: 'Login', component: () => import('../views/LoginView.vue'), meta: { guest: true } },
  { path: '/register', name: 'Register', component: () => import('../views/RegisterView.vue'), meta: { guest: true } },
  { path: '/movies', name: 'Movies', component: () => import('../views/MoviesView.vue'), meta: { requiresAuth: true } },
  { path: '/movie/:id', name: 'MovieDetail', component: () => import('../views/MovieDetailView.vue'), meta: { requiresAuth: true } },
  { path: '/profile', name: 'Profile', component: () => import('../views/ProfileView.vue'), meta: { requiresAuth: true } },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) next('/login');
  else if (to.meta.guest && authStore.isAuthenticated) next('/movies');
  else next();
});

export default router;