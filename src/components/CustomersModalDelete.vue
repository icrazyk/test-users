<script>
import { mapActions } from 'vuex';
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    loading: false,
    model: {
      email: '',
      objectId: '',
    },
  }),
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
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
      } catch (e) {
        // error handler
      }
      this.$emit('deleted');
      this.loading = false;
      this.dialog = false;
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
          Do you want to remove user <b>{{ model.email }}</b>?
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
