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
  get: async ({ commit, state }, { updateTotal = false, filters: payloadFilters = {} }) => {
    commit('setLoading', ['get', true]);
    commit('setFilters', payloadFilters);
    const { filters, total: currentTotal } = state;
    let total = currentTotal;
    let customers = [];
    const params = resolveFilters(filters);

    // get total
    if (updateTotal) {
      try {
        total = await api.get('/data/Users/count', {
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

    commit('setTotal', total);
    commit('set', customers);
    commit('setLoading', ['get', false]);
  },

  setFilters: async ({ state, dispatch }, filters) => {
    const diff = difference(state.filters, filters);
    if (!diff) return;
    let updateTotal = false;
    let patch = {};
    if ('search' in diff) {
      patch.page = 1;
      updateTotal = true;
    }
    await dispatch('get', { updateTotal, filters: Object.assign(filters, patch) });
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
