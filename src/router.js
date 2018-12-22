import Vue from 'vue';
import Router from 'vue-router';
import Customers from 'Views/Customers';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: Customers,
    }
  ],
});

export default router;
