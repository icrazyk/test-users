import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import store from '@/store/';
import router from '@/router';
import App from './App.vue';

Vue.use(Vuetify);

export default new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
