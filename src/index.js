import Vue from 'vue';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue';

Vue.use(Vuetify)

export default new Vue({
  el: '#app',
  render: h => h(App),
});
