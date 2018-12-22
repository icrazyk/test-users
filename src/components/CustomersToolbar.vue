<template>
  <v-layout 
    wrap 
    class="mb-3"
    justify-space-between
  >
    <v-flex 
      xs12 
      sm6 
      md4
    >
      <slot name="one" />
    </v-flex>
    <v-flex 
      xs12 
      sm6 
      md4
      class="text-sm-right"
    >
      <slot name="two" />
    </v-flex>
  </v-layout>
</template>
