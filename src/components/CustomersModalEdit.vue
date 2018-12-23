<script>
import CustomersModal from 'Components/CustomersModal';
import { mapActions } from 'vuex';
import rules from 'Utils/validate';

export default {
  mixins: [CustomersModal],
  data: () => ({
    modalTitle: 'Edit customer',
    submitTitle: 'Save',
  }),
  methods: {
    ...mapActions('customer', {
      edit: 'edit',
    }),
    async send(model) {
      await this.edit(model);
      this.$emit('edit', model);
    },
    setModel(model) {
      Object.assign(this.model, model);
    },
  },
  created() {
    this.rules.password = [];
  },
};
</script>
