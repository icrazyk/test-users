import api from '@/api';

const actions = {
  create: async (store, user) => {
    await api.post('/data/Users', user);
  },
}

export default {
  actions,
  namespaced: true,
};
