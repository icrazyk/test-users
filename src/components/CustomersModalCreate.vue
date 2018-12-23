<script>
import CustomersModal from 'Components/CustomersModal';
import { mapActions } from 'vuex';

export default {
  mixins: [CustomersModal],
  data: () => ({
    modalTitle: 'Create customer',
    submitTitle: 'Create',
  }),
  methods: {
    ...mapActions('customer', {
      create: 'create',
    }),
    async send(model) {
      await this.create(model);
      this.$emit('created');
    },
  },
};
</script>
