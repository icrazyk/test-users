import api from '@/api';
let cancelGet;
let cancelTotal;

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

const resolveFilters = ({ search, rowsPerPage: pageSize, page }) => {
  let where;
  if (search !== '') {
    where = `name like '%${search}%' or email like '%${search}%'`
  }
  const offset = (page * pageSize) - pageSize;
  return {
    pageSize,
    offset,
    where,
    // BUG: props filter not work if 'props' is array and has few params
    // props: ['name', 'email', 'objectId'],
    // BUG: not sort if 'sortBy' is array, but work if its string 
    // sortBy: ['created desc'],
    sortBy: 'created desc',
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
        if (cancelTotal) cancelTotal.cancel();
        cancelTotal = api.CancelToken.source();
        total = await api.get('/data/Users/count', {
          params: {
            where: params.where,
          },
          cancelToken: cancelTotal.token,
        })
      } catch(e) {
        // error handler
      }
    }
    
    // get customers
    try {
      if (cancelGet) cancelGet.cancel();
      cancelGet = api.CancelToken.source();
      customers = await api.get('/data/Users', {
        params,
        cancelToken: cancelGet.token,
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
