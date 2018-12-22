import Vue from 'vue';
import Vuex from 'vuex';
import customers from '@/store/customers';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    customers,
  },
  strict: process.env.NODE_ENV !== 'production',
});

export default store;
