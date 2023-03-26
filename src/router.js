import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Templates from './views/Templates.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/templates',
    name: 'templates',
    component: Templates,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
