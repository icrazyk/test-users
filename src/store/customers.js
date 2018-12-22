import api from '@/api';

const init = () => ({
  customers: [],
  filtres: {
    page: 1,
    total: 0,
    offset: 0,
    count: 10,
    name: '',
    email: '',
  }
});

const actions = {
  get: async ({ commit }) => {
    const customers = await api('/data/users');
    commit('set', customers);
  },
};

const mutations = {
  set: (state, customers) => {
    state.customers = customers;
  },
};

export default {
  state: init(),
  actions,
  mutations,
  namespaced: true, 
};
