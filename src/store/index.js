import Vue from 'vue';
import Vuex from 'vuex';
import customers from '@/store/customers';
import customer from '@/store/customer';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    customers,
    customer,
  },
  strict: process.env.NODE_ENV !== 'production',
});

export default store;
