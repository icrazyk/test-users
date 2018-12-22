<script>
import CustomersModal from 'Components/CustomersModal';
import { mapActions } from 'vuex';

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
      this.$emit('edited', model);
    },
    setModel(model) {
      this.$refs.form.reset();
      Object.assign(this.model, model);
    },
  },
  created() {
    this.rules.password = [];
  },
};
</script>
