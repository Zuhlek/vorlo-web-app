import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue'
import Templates from './views/Templates.vue'
import Projects from './views/Projects.vue'
import Details from './views/Details.vue'
import Auth from './views/Auth.vue'
import store from './store'

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    meta: { layout: 'empty' },
    component: Auth,
  },  
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: 'default' },
  },  
  {
    path: '/templates',
    name: 'Templates',
    component: Templates,
    meta: { layout: 'default' },
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
    meta: { layout: 'default' },
  },
  {
    path: '/details',
    name: 'Details',
    component: Details,
    meta: { layout: 'default' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  try {
    const isAuthenticated = store.getters.accessToken !== null;

    if (to.name === 'Auth') {
      next();
    } else if (isAuthenticated) {
      next();
    } else {
      next({ name: 'Auth' });
    }
  } catch (error) {
    console.error('Error in beforeEach:', error);
    next({ name: 'Auth' });
  }
});

export default router;
