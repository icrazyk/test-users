<script>
import CustomersSearch from 'Components/CustomersSearch';
import CustomersTable from 'Components/CustomersTable';
import CustomersToolbar from 'Components/CustomersToolbar';
import CustomersModalCreate from 'Components/CustomersModalCreate';
import CustomersModalEdit from 'Components/CustomersModalEdit';
import CustomersModalDelete from 'Components/CustomersModalDelete';

export default {
  components: {
    CustomersSearch,
    CustomersTable,
    CustomersToolbar,
    CustomersModalCreate,
    CustomersModalEdit,
    CustomersModalDelete,
  },
  data: () => ({
    createModal: false,
    editModal: false,
    deleteModal: false,
  }),
  methods: {
    reloadTable() {
      this.$refs.table.getCustomers({ updateTotal: true });
    },
    updateItem(item) {
      this.$refs.table.updateItem(item);
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
    deleteItem(item) {
      this.deleteModal = true;
      this.$refs.deleteModal.setModel({
        email: item.email,
        objectId: item.objectId,
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
      @delete="deleteItem"
    />
    <CustomersModalCreate 
      v-model="createModal"
      @created="reloadTable"
    />
    <CustomersModalEdit
      ref="editModal"
      v-model="editModal"
      @edited="updateItem"
    />
    <CustomersModalDelete
      ref="deleteModal"
      v-model="deleteModal"
      @deleted="reloadTable"
    />
  </v-container>
</template>

