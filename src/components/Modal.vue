<script>
import rules from 'Utils/validate';

export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    width: 400,
    modalTitle: 'Title',
    loading: false,
    model: {},
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
    setModel(model) {
      this.resetModel();
      Object.assign(this.model, model);
    },
    resetModel() {
      // reset model
    },
    validate() {
      return true;
    },
    send() {
      // send model
      // emit event
    },
    async submit() {
      if (!this.validate()) return;
      this.loading = true;
      try {
        await this.send(this.model);
      } catch (e) {
        // error handler
      }
      this.loading = false;
      this.dialog = false;
    },
  },
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    :width="width"
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        {{ modalTitle }}
      </v-card-title>

      <v-form
        ref="form" 
        @submit.prevent="submit"
      >
        <slot />
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="actions" />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
