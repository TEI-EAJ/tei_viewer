<template>
  <v-card style="overflow:auto; height:100%;">
    <v-toolbar class="headline grey lighten-2" flat>
      <v-toolbar-title>発話者別の呼称の可視化</v-toolbar-title>
    </v-toolbar>

    <v-card>
      <v-card-text>
        <template v-if="Object.keys(result).length == 0">
          <div class="text-center pa-5">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
        </template>

        <template v-else>
          <v-row>
            <v-col>
              <v-select :items="items" v-model="target" label="発話者"></v-select>
            </v-col>
            <v-col>
              <v-select :items="items" v-model="target2" label="対象者"></v-select>
            </v-col>
          </v-row>

          <br />
          <pie :height="300" :data="data4pie" :options="options4pie" class="mb-4"></pie>

          <br />
          <br />
          <chart :height="300" :data="data" :options="options" class="mb-4"></chart>
        </template>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import Chart from "../../components/Called/Chart.vue";
import Pie from "../../components/Called/Pie.vue";
export default {
  components: { Chart, Pie },
  props: ["xml", "props"],
  data() {
    return {
      data: {},
      options: {},

      data4pie: {},
      options4pie: {},

      items: [],
      target: null,
      target2: null,

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
    target2: function() {
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
      let target2 = this.target2;

      if (target == null || target2 == null) {
        return;
      }

      let labels4pie = [];

      let result = this.result;

      let objBySp = {};

      for (let head in result) {
        let ch = result[head];

        for (let org in ch) {
          if (org !== target) {
            continue;
          }

          if (!objBySp[org]) {
            objBySp[org] = {};
          }

          let org_obj = ch[org];

          for (let dest in org_obj) {
            if (dest !== target2) {
              continue;
            }

            if (!objBySp[org][dest]) {
              objBySp[org][dest] = {};
            }

            let dest_obj = org_obj[dest];
            for (let e in dest_obj) {
              let count = dest_obj[e];

              if (!objBySp[org][dest][e]) {
                objBySp[org][dest][e] = 0;
              }

              objBySp[org][dest][e] += count;
            }
          }
        }
      }

      let colors = {};

      let datasets4pie = [];
      for (let org in objBySp) {
        for (let dest in objBySp[org]) {
          let data = [];
          let backgroundColor = [];

          let objByOrgByDest = objBySp[org][dest];

          let arr = Object.keys(objByOrgByDest).map(e => ({
            key: e,
            value: objByOrgByDest[e]
          }));

          arr.sort(function(a, b) {
            if (a.value < b.value) return 1;
            if (a.value > b.value) return -1;
            return 0;
          });

          for (let i = 0; i < arr.length; i++) {
            let obj = arr[i];
            let label = obj.key;
            let value = obj.value;

            labels4pie.push(label);
            let randomColor =
              "#" + Math.floor(Math.random() * 16777215).toString(16);
            data.push(value);
            backgroundColor.push(randomColor);

            colors[label] = randomColor;
          }

          datasets4pie.push({
            data: data,
            backgroundColor: backgroundColor
          });
        }
      }

      let data4pie = {
        labels: labels4pie,
        datasets: datasets4pie
      };

      let options4pie = {
        responsive: true,
        maintainAspectRatio: false
      };

      this.data4pie = data4pie;
      this.options4pie = options4pie;

      //--------------------

      let labels = [];

      // legendの取得
      let vectors = labels4pie;
      for (let head in result) {
        labels.push(head);
      }

      // ベクトルの初期化
      let dt = {};
      for (let i = 0; i < vectors.length; i++) {
        let size = Object.keys(result).length;
        dt[vectors[i]] = Array(size);
        for (let j = 0; j < size; j++) {
          dt[vectors[i]][j] = 0;
        }
      }

      // 値の登録
      let i = 0;
      for (let head in result) {
        let ch = result[head];

        if (!ch[target]) {
          i += 1;
          continue;
        }
        let obj = ch[target][target2];

        for (let label in obj) {
          dt[label][i] = obj[label];
        }

        i += 1;
      }

      let datasets = [];
      for (let label in dt) {
        datasets.push({
          label: label,
          data: dt[label],
          backgroundColor: colors[label]
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
      //this.arr = [];
      //this.id = null;

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