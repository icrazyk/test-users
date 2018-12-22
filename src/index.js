import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import store from '@/store/';
import App from './App.vue';

Vue.use(Vuetify);

export default new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
