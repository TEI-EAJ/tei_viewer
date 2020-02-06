<template>
  <v-card style="overflow:auto; height:100%;">
    <v-toolbar class="headline grey lighten-2">
      <v-toolbar-title>固有表現の出現頻度</v-toolbar-title>
    </v-toolbar>

    <v-card>
      <v-card-text>
        <v-row>
          <v-col>
            <v-select v-model="eles" :items="items" label="固有表現"></v-select>
          </v-col>
          <v-col></v-col>
        </v-row>

        <br />
        <chart :height="300" :eles="eles" class="mb-4" :xml="xml"></chart>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import Chart from "../../components/Graph/Chart.vue";
export default {
  components: { Chart },
  props: ["xml", "props"],
  data() {
    return {
      eles: ["persName", "rs"],
      items: [
        {
          text: "人物",
          value: ["persName", "rs"]
        },
        {
          text: "場所",
          value: ["placeName"]
        }
      ]
    };
  }
};
</script>