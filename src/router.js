import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Templates from './views/Templates.vue'
import Projects from './views/Projects.vue'
import Details from './views/Details.vue'
import Auth from './views/Auth.vue'
import store from './store'

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },  
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/templates',
    name: 'Templates',
    component: Templates,
    meta: { requiresAuth: true },
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
    meta: { requiresAuth: true },
  },
  {
    path: '/details',
    name: 'Details',
    component: Details,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.accessToken !== null;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Auth' });
    } else {
      next(); 
    }
  } else {
    next();
  }
});


export default router;
