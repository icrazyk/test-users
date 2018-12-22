<script>
import { mapActions } from 'vuex';
import Modal from 'Components/Modal';

export default {
  mixins: [Modal],
  data: () => ({
    loading: false,
    model: {
      email: '',
      objectId: '',
    },
    error: '',
  }),
  methods: {
    ...mapActions('customer', {
      delete: 'delete',
    }),
    setModel(model) {
      Object.assign(this.model, model);
    },
    async submit() {
      this.loading = true;
      try {
        await this.delete(this.model);
        this.$emit('deleted');
        this.dialog = false;
      } catch ({ message }) {
        if (message) {
          this.error = message;
        }
      }
      this.loading = false;
    },
  },
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    width="400"
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        Delete customer
      </v-card-title>
      <v-form
        ref="form" 
        @submit.prevent="submit"
      >
        <v-card-text>
          <p>Do you want to remove user <b>{{ model.email }}</b>?</p>
          <v-alert
            :value="error"
            type="error"
          >
            {{ error }}
          </v-alert>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat
            color="primary"
            @click="dialog = false"
            :disabled="loading"
          >
            Cancel
          </v-btn>
          <v-btn
            flat
            color="error"
            type="submit"
            :disabled="loading"
            :loading="loading"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
