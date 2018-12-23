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
    modalTitle: 'Title',
    submitTitle: 'Send',
    loading: false,
    model: {
      name: '',
      email: '',
      password: '',
    },
    rules: {
      name: [],
      email: [rules.required, rules.email],
      password: [rules.required],
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
  watch: {
    dialog(value) {
      if (value) {
        this.$refs.form.reset();
      }
    },
  },
  methods: {
    async submit() {
      if (!this.$refs.form.validate()) return;
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
    width="500"
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
        <v-container>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                label="Name"
                v-model="model.name"
                :rules="rules.name"
                :disabled="loading"
              />
            </v-flex>
            <v-flex xs12>
              <v-text-field
                type="email"
                label="E-mail"
                v-model="model.email"
                :disabled="loading"
                :rules="rules.email"
              />
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Password"
                type="password"
                v-model="model.password"
                :disabled="loading"
                :rules="rules.password"
              />
            </v-flex>
          </v-layout>
        </v-container>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat
            color="error"
            @click="dialog = false"
            :disabled="loading"
          >
            Cancel
          </v-btn>
          <v-btn
            flat
            color="primary"
            type="submit"
            :disabled="loading"
            :loading="loading"
          >
            {{ submitTitle }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
