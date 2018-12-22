<script>
import { mapActions, mapState } from 'vuex';
import LinearProgress from 'Components/LinearProgress';

export default {
  components: {
    LinearProgress,
  },
  data: () => ({
    headers: [
      {
        text: 'Name',
        sortable: false,
      },
      {
        text: 'E-mail',
        sortable: false,
      },
    ],
    rowsPerPageItems: [5, 10, 20],
  }),
  computed: {
    ...mapState('customers', {
      customers: 'customers',
      filters: 'filters',
      total: 'total',
      loading: 'loading',
    }),
    pagination: {
      get() {
        return {
          page: this.filters.page,
          rowsPerPage: this.filters.rowsPerPage,
        };
      },
      async set(value) {
        await this.setFilters({
          page: value.page,
          rowsPerPage: value.rowsPerPage,
        });
      },
    },
  },
  watch: {
    filters: {
      // Update query params
      handler(filters) {
        const query = Object.entries(filters)
          .filter(([, value]) => !!value)
          .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {});

        this.$router.push({ query: { ...query } });
      },
      deep: true,
    },
  },
  async mounted() {
    const { page = 1, rowsPerPage = 5, search = '' } = this.$route.query;
    await this.getCustomers({
      page: Number(page),
      rowsPerPage: Number(rowsPerPage),
      search,
    });
  },
  methods: {
    ...mapActions('customers', {
      setFilters: 'setFilters',
      getCustomers: 'get',
    }),
  },
}
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="customers"
    :totalItems="total"
    :loading="loading.get"
    :rowsPerPageItems="rowsPerPageItems"
    :pagination.sync="pagination"
    class="elevation-1"
  >
    <LinearProgress slot="progress" />
    <template 
      slot="items" 
      slot-scope="props"
    >
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.email }}</td>
    </template>
  </v-data-table>
</template>
