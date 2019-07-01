import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
    },
    {
      path: '/upload',
      name: 'Upload Audio',
      component: () => import('./views/UploadAudio.vue'),
    },
    {
      path: '/play',
      name: 'Play Audio',
      component: () => import('./views/ManageAudio.vue'),
    },
  ],
});

/**
 * Checking that user is logged in or going to login page
 */
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    console.log('Routing to login path');
    next();
  } else if (store.state.isLoggedIn) {
    console.log(`Routing to selected path ${to.path}`);
    next();
  } else {
    console.log('Forcing route to login path');
    next('/login');
  }
});

export default router;
