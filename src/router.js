import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import TemplateCreation from './views/TemplateCreation.vue'
import TemplateManagement from './views/TemplateManagement.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/template-creation',
    name: 'TemplateCreation',
    component: TemplateCreation,
  },
  {
    path: '/template-management',
    name: 'TemplateManagement',
    component: TemplateManagement,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
