import api from '@/api';

const init = () => ({
  customers: [],
  filters: {
    page: 1,
    rowsPerPage: 5,
    search: '',
  },
  total: 0
});

let snapshotSearch = '';

const actions = {
  get: async ({ commit, state }, filters) => {
    if (filters) {
      commit('setFilters', filters);
    }
    const { filters: { search, rowsPerPage, page }, total } = state;
    let where;
    if (search !== '') {
      where = `name like '%${search}%' or email like '%${search}%'`
    }
    const offset = (page * rowsPerPage) - rowsPerPage;
    const customers = await api.get('/data/Users', {
      params: {
        pageSize: rowsPerPage,
        offset,
        where,
      },
    });
    commit('set', customers);
    // Обновляем total при первой загрузке или если изменился запрос
    if (customers.length && total === 0 || snapshotSearch !== search) {
      console.log('search', search, 'snapshotSearch', snapshotSearch);
      snapshotSearch = search;
      const total = await api.get('/data/Users/count', {
        params: {
          where,
        },
      });
      commit('setTotal', total);
    }
  },

  setFilters: async ({ commit, state, dispatch }, filters) => {
    let diff = false;
    Object.entries(state.filters).forEach(([key, value]) => {
      if (filters[key] && filters[key] !== value) {
        diff = true;
      }
    });
    if (!diff) return;
    if ('search' in filters && state.filters.search !== filters.search) {
      debugger;
      filters.page = 1;
    }
    commit('setFilters', filters);
    await dispatch('get');
  },
};

const mutations = {
  set: (state, customers) => {
    state.customers = customers;
  },
  setFilters: (state, filters) => {
    Object.assign(state.filters, filters);
  },
  setTotal: (state, total) => {
    state.total = total;
  },
};

export default {
  state: init(),
  actions,
  mutations,
  namespaced: true, 
};
