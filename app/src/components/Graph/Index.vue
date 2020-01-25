<template>
  <v-card style="overflow:auto; height:100%;">
    <v-toolbar class="headline grey lighten-2">
      <v-toolbar-title>人物の出現頻度</v-toolbar-title>
    </v-toolbar>

    <v-card>
          <v-card-text>
            <chart :height="300" class="mb-4" :xml="xml"></chart>
          </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import Chart from "../../components/Graph/Chart.vue";
export default {
  components: { Chart},
  props: ["xml", "props"],
  data() {
    return {
    };
  }
};
</script>