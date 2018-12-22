<script>
import { mapActions, mapState } from 'vuex';

export default {
  data: () => ({
    // customers: [
    //   {
    //     name: 'petr',
    //     email: 'petr@mail.ru'
    //   },
    //   {
    //     name: 'ivan',
    //     email: 'ivan@mail.ru'
    //   },
    //   {
    //     name: 'sergey',
    //     email: 'sergey@mail.ru'
    //   }
    // ],
    headers: [
      {
        text: 'name',
        sortable: false,
      },
      {
        text: 'email',
        sortable: false,
      },
    ],
    loading: true,
  }),
  computed: {
    ...mapState('customers', {
      customers: 'customers',
    })
  },
  async mounted() {
    await this.getCutomers();
  },
  methods: {
    ...mapActions('customers', {
      getCutomers: 'get',
    })
  },
}
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="customers"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.email }}</td>
    </template>
  </v-data-table>
</template>
