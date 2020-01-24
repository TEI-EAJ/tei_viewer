<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>

    <v-footer :dark="true" :inset="true" class="mt-5">
      <v-container>
        <p class="text-center my-5">TEI-C東アジア/日本語分科会</p>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({}),
  methods: {}
};
</script>
