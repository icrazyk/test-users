import api from '@/api';

const actions = {
  create: async (store, user) => {
    await api.post('/data/Users', user);
  },
  edit: async (store, user) => {
    await api.put(`/data/Users/${user.objectId}`, {
      email: user.email,
      name: user.name === '' ? undefined : user.name,
      password: user.password === '' ? undefined : user.password,
    });
  },
};

export default {
  actions,
  namespaced: true,
};
