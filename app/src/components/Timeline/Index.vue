<template>
  <v-card style="overflow:auto; height:100%;">
    <v-toolbar class="headline grey lighten-2" flat>
      <v-toolbar-title>チャプター毎の呼称の可視化</v-toolbar-title>
    </v-toolbar>
    <template v-if="Object.keys(result).length == 0">
      <div class="text-center pa-5">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
    </template>
    <template v-else>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col>
              <v-select :items="items" v-model="target" label="対象人物"></v-select>
            </v-col>
            <v-col></v-col>
          </v-row>

          <br />
          <chart :height="600" :data="data" :options="options" class="mb-4"></chart>
        </v-card-text>
      </v-card>
    </template>
  </v-card>
</template>

<script>
import Chart from "../../components/Timeline/Chart.vue";
export default {
  components: { Chart },
  props: ["xml", "props"],
  data() {
    return {
      data: {},
      options: {},
      items: [],
      target: null,
      result: {}
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    target: function() {
      this.main();
    },
    xml: function() {
      this.init();
    },
    props: function() {
      this.init();
    }
  },
  methods: {
    main() {
      let target = this.target;

      if (target == null) {
        return;
      }

      let vectors = [];

      let labels = [];

      let result = this.result;

      for (let head in result) {
        labels.push(head);

        let ch = result[head];
        for (let sp in ch) {
          let obj = ch[sp][target];
          for (let label in obj) {
            if (vectors.indexOf(label) == -1) {
              vectors.push(label);
            }
          }
        }
      }

      let dt = {};
      for (let i = 0; i < vectors.length; i++) {
        let size = Object.keys(result).length;
        dt[vectors[i]] = Array(size);
        for (let j = 0; j < size; j++) {
          dt[vectors[i]][j] = 0;
        }
      }

      let i = 0;
      for (let head in result) {
        let ch = result[head];
        for (let sp in ch) {
          let obj = ch[sp][target];

          for (let label in obj) {
            dt[label][i] = obj[label];
          }
        }

        i += 1;
      }

      let datasets = [];
      for (let label in dt) {
        let randomColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16);

        datasets.push({
          label: label,
          data: dt[label],
          backgroundColor: randomColor
        });
      }

      let data = {
        labels: labels,
        datasets: datasets
      };

      let options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      };

      this.data = data;
      this.options = options;
    },
    init() {
      let xml = this.xml;

      if (!xml) {
        return;
      }

      let result = {};

      let heads = xml.querySelector("body").querySelectorAll("head");

      for (let i = 0; i < heads.length; i++) {
        let obj = heads[i];

        let div = obj.parentNode;

        let map = {};
        result[obj.textContent] = map;

        let sps = div.querySelectorAll("speaker");
        for (let i = 0; i < sps.length; i++) {
          let sp = sps[i];
          let sp_id = sp.parentElement.attributes.who.value.replace("#", "");

          if (this.items.indexOf(sp_id) == -1) {
            this.items.push(sp_id);
          }

          if (!map[sp_id]) {
            map[sp_id] = {};
          }

          let tmp = map[sp_id];

          let ps = sp.parentElement.querySelectorAll("p");

          for (let k = 0; k < ps.length; k++) {
            let p = ps[k];
            let persons = p.querySelectorAll("persName");
            for (let m = 0; m < persons.length; m++) {
              let person = persons[m];

              let ref = "";
              let text = person.textContent;

              if (!person.attributes) {
                continue;
              }

              if (person.attributes.ref) {
                ref = person.attributes.ref.value;
              } else if (person.attributes.corresp) {
                ref = person.attributes.corresp.value;
              } else {
                continue;
              }
              let refs = ref.split(" ");
              for (let n = 0; n < refs.length; n++) {
                let pid = refs[n].replace("#", "");

                if (!tmp[pid]) {
                  tmp[pid] = {};
                }

                let tmp2 = tmp[pid];
                if (!tmp2[text]) {
                  tmp2[text] = 0;
                }

                tmp2[text] += 1;
              }
            }
          }
        }
      }

      this.result = result;
    }
  }
};
</script>