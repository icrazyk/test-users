<script>
import { mapState, mapActions } from 'vuex';
import debounce from 'lodash/debounce';

let debounceEdit;

export default {
  computed: {
    ...mapState('customers', {
      filters: 'filters',
    }),
    search: {
      get() {
        return this.filters.search;
      },
      set(value) {
        debounceEdit(value);
      },
    }
  },
  methods: {
    ...mapActions('customers', {
      setFilters: 'setFilters',
    }),
  },
  created() {
    debounceEdit = debounce((search) => {
      this.setFilters({ search });
    }, 700);
  },
}
</script>


<template>
  <v-text-field
    label="Search by name or e-mail"
    v-model="search"
  />
</template>
