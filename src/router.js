import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue'
import Templates from './views/Templates.vue'
import Projects from './views/Projects.vue'
import Documents from './views/Documents.vue'
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
    name: 'Root',
    component: Home,
    meta: { requiresAuth: true, layout: 'default' },
  },  
  {
    path: '/templates',
    name: 'Templates',
    component: Templates,
    meta: { requiresAuth: true, layout: 'default' },
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
    meta: { requiresAuth: true, layout: 'default' },
  },
  {
    path: '/documents',
    name: 'Documents',
    component: Documents,
    meta: { requiresAuth: true, layout: 'default' },
  },
  {
    path: '/details',
    name: 'Details',
    component: Details,
    meta: { requiresAuth: true, layout: 'default' },
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
