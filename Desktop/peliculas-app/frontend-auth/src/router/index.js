import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes = [
  { path: '/', redirect: '/movies' },
  { path: '/login', name: 'Login', component: () => import('../views/LoginView.vue'), meta: { guest: true } },
  { path: '/register', name: 'Register', component: () => import('../views/RegisterView.vue'), meta: { guest: true } },
  { path: '/movies', name: 'Movies', component: () => import('../views/MoviesView.vue'), meta: { requiresAuth: true } },
  { path: '/movie/:id', name: 'MovieDetail', component: () => import('../views/MovieDetailView.vue'), meta: { requiresAuth: true } },
  { path: '/profile', name: 'Profile', component: () => import('../views/ProfileView.vue'), meta: { requiresAuth: true } },
{
  path: '/profile/list/:listName',name: 'ListDetail',component: () => import('../views/ListDetailView.vue'),meta: { requiresAuth: true }
}
];

const router = createRouter({ history: createWebHistory(), routes });
router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated) return '/login';
  if (to.meta.guest && auth.isAuthenticated) return '/movies';
  return true;
});
export default router;