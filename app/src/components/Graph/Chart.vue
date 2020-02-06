<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  name: "chart",
  props: ["xml", "eles"],
  watch: {
    xml: function() {
      this.init();
    },
    eles: function() {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.arr = [];
      this.id = null;

      let xml = this.xml;

      let eles = this.eles;
      let attrs = ["corresp", "ref"];

      if (!xml) {
        return;
      }

      let map = {};

      let body = xml.querySelector("body");

      for (let l = 0; l < eles.length; l++) {
        let e = eles[l];

        for (let i = 0; i < attrs.length; i++) {
          let attr = attrs[i];
          let arr = body.querySelectorAll(e + "[" + attr + "]");
          for (let j = 0; j < arr.length; j++) {
            let obj = arr[j];
            let ids = obj.attributes[attr].value.split(" ");
            for (let k = 0; k < ids.length; k++) {
              let id = ids[k].replace("#", "");
              if (!map[id]) {
                map[id] = 0;
              }
              map[id] += 1;
            }
          }
        }
      }

      let arr = Object.keys(map).map(e => ({ key: e, value: map[e] }));

      arr.sort(function(a, b) {
        if (a.value < b.value) return 1;
        if (a.value > b.value) return -1;
        return 0;
      });

      let labels = [];
      let values = [];
      for (let i = 0; i < arr.length; i++) {
        let obj = arr[i];
        labels.push(obj.key);
        values.push(obj.value);
      }

      let data = {
        labels: labels,
        datasets: [
          {
            label: "Frequency",
            data: values,
            borderWidth: 1
          }
        ]
      };

      let options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      };

      this.renderChart(data, options);
    }
  }
};
</script>