<script>
import CustomersSearch from 'Components/CustomersSearch';
import CustomersTable from 'Components/CustomersTable';
import CustomersToolbar from 'Components/CustomersToolbar';
import CustomersModalCreate from 'Components/CustomersModalCreate';
import CustomersModalEdit from 'Components/CustomersModalEdit';

export default {
  components: {
    CustomersSearch,
    CustomersTable,
    CustomersToolbar,
    CustomersModalCreate,
    CustomersModalEdit,
  },
  data: () => ({
    createModal: false,
    editModal: false,
  }),
  methods: {
    reloadTable() {
      this.$refs.table.getCustomers({ updateTotal: true, page: 1, search: '' });
    },
    updateTableItem(user) {
      this.$refs.table.updateItem(user);
    },
    editItem(item) {
      this.editModal = true;
      // 'setModel' after form will be reseted. See CustomersModal`s 'watch'
      this.$nextTick(() => {
        this.$refs.editModal.setModel({
          name: item.name,
          email: item.email,
          objectId: item.objectId,
        });
      });
    },
  },
};
</script>

<template>
  <v-container fluid>
    <CustomersToolbar>
      <CustomersSearch slot="one" />
      <v-btn
        slot="two"
        color="success"
        dark
        @click="createModal = true"
        class="mx-0"
      >
        <v-icon left dark>add</v-icon>
        Create customer
      </v-btn>
    </CustomersToolbar>
    <CustomersTable 
      ref="table"
      @edit="editItem"
    />
    <CustomersModalCreate 
      v-model="createModal"
      @created="reloadTable"
    />
    <CustomersModalEdit
      ref="editModal"
      v-model="editModal"
      @edited="updateTableItem"
    />
  </v-container>
</template>

