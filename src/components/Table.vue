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
      set(value) {
        this.setFilters({
          page: value.page,
          rowsPerPage: value.rowsPerPage,
        });
      },
    },
  },
  async mounted() {
    await this.getCustomers({ updateTotal: true });
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
