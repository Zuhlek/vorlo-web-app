import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Templates from './views/Templates.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/templates',
    name: 'Templates',
    component: Templates,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
