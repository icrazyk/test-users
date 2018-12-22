import Vue from 'vue';
import Router from 'vue-router';
import Home from 'Views/Home';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home,
    }
  ],
});

export default router;
