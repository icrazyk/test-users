import api from '@/api';

const init = () => ({
  customers: [],
  total: 0,
  filters: {
    page: 1,
    rowsPerPage: 5,
    search: '',
  },
  loading: {
    get: false,
  },
});

let snapshotSearch = '';

const resolveFilters = ({ search, rowsPerPage, page }) => {
  let where;
  if (search !== '') {
    where = `name like '%${search}%' or email like '%${search}%'`
  }
  const offset = (page * rowsPerPage) - rowsPerPage;
  return {
    pageSize: rowsPerPage,
    offset,
    where,
  }
}

const difference = (source, patch) => {
  let diff = {};
  Object.entries(source).forEach(([key, value]) => {
    if (key in patch && patch[key] !== value) {
      diff[key] = value;
    }
  });
  return Object.entries(diff).length ? diff : false;
}

const actions = {
  get: async ({ commit, state }, payload) => {
    commit('setLoading', ['get', true]);
    commit('setFilters', payload);
    const { filters, total } = state;
    let newTotal = total;
    let customers = [];
    const params = resolveFilters(filters);

    // get total if need
    if (total === 0 || snapshotSearch !== filters.search) {
      snapshotSearch = filters.search;
      try {
        newTotal = await api.get('/data/Users/count', {
          params: {
            where: params.where,
          },
        })
      } catch(e) {
        // error handler
      }
    }
    
    // get customers
    try {
      customers = await api.get('/data/Users', {
        params,
      });
    } catch(e) {
      // error handler
    }

    commit('setTotal', newTotal);
    commit('set', customers);
    commit('setLoading', ['get', false]);
  },

  setFilters: async ({ state, dispatch }, filters) => {
    const diff = difference(state.filters, filters);
    if (!diff) return;
    if (diff.search) {
      filters.page = 1;
    }
    await dispatch('get', filters);
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
  setLoading: (state, [name, status]) => {
    state.loading[name] = status;
  },
};

export default {
  state: init(),
  actions,
  mutations,
  namespaced: true, 
};
