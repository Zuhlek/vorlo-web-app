import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Templates from './views/Templates.vue'
import Projects from './views/Projects.vue'
import Details from './views/Details.vue'

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
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
  },
  {
    path: '/details',
    name: 'Details',
    component: Details,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
