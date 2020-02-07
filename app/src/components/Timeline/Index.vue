<template>
  <v-card style="overflow:auto; height:100%;">
    <v-toolbar class="headline grey lighten-2" flat>
      <v-toolbar-title>チャプター毎の呼称の可視化</v-toolbar-title>
    </v-toolbar>

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
    }
  },
  methods: {
    main() {

      let target = this.target

      let vectors = []

      let labels = []

      let result = this.result

      for(let head in result){
        labels.push(head)

        let ch = result[head]
        for(let sp in ch){
          let obj = ch[sp][target]
          for(let label in obj){
            if(vectors.indexOf(label) == -1){
              vectors.push(label)
            }
          }
        }
      }

      let dt = {}
      for(let i = 0; i < vectors.length; i++){
        let size = Object.keys(result).length
        dt[vectors[i]] = Array(size);
        for(let j = 0; j < size; j++){
          dt[vectors[i]][j] = 0
        }
      }

      let i = 0
      for(let head in result){
        let ch = result[head]
        for(let sp in ch){
          let obj = ch[sp][target]

          for(let label in obj){
            dt[label][i] = obj[label]
          }
        }

        i += 1
      }

      let datasets = []
      for(let label in dt){

        let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

        datasets.push(
          {
            label: label,
            data: dt[label],
            backgroundColor: randomColor
          }
        )
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

      this.data = data
      this.options = options
      
    },
    hslToRgb16(hue, saturation, lightness){
      var result = false;
 
      if (((hue || hue === 0) && hue <= 360) && ((saturation || saturation === 0) && saturation <= 100) && ((lightness || lightness === 0) && lightness <= 100)) {
          var red   = 0,
              green = 0,
              blue  = 0,
              q     = 0,
              p     = 0,
              hueToRgb;
  
          hue        = Number(hue)        / 360;
          saturation = Number(saturation) / 100;
          lightness  = Number(lightness)  / 100;
  
          if (saturation === 0) {
              red   = lightness;
              green = lightness;
              blue  = lightness;
          } else {
              hueToRgb = function(p, q, t) {
                  if (t < 0) {
                      t += 1;
                  }
  
                  if (t > 1) {
                      t -= 1;
                  }
  
                  if (t < 1 / 6) {
                      p += (q - p) * 6 * t;
                  } else if (t < 1 / 2) {
                      p = q;
                  } else if (t < 2 / 3) {
                      p += (q - p) * (2 / 3 - t) * 6;
                  }
  
                  return p;
              };
  
              if (lightness < 0.5) {
                  q = lightness * (1 + saturation);
              } else {
                  q = lightness + saturation - lightness * saturation;
              }
              p = 2 * lightness - q;
  
              red   = hueToRgb(p, q, hue + 1 / 3);
              green = hueToRgb(p, q, hue);
              blue  = hueToRgb(p, q, hue - 1 / 3);
          }
  
          result = {
              red   : Math.round(red   * 255).toString(16),
              green : Math.round(green * 255).toString(16),
              blue  : Math.round(blue  * 255).toString(16)
          };
      }
  
      return result;
    },
    init() {
      //this.arr = [];
      //this.id = null;

      let xml = this.xml;

      if (!xml) {
        return;
      }

      let result = {}

      let heads = xml.querySelector("body").querySelectorAll("head");

      for(let i = 0; i < heads.length; i++){
        let obj = heads[i]

        let div = obj.parentNode

        let map = {}
        result[obj.textContent] = map

        let sps = div.querySelectorAll("speaker");
        for (let i = 0; i < sps.length; i++) {
          let sp = sps[i];
          let sp_id = sp.parentElement.attributes.who.value.replace("#", "");

          if(this.items.indexOf(sp_id) == -1){
            this.items.push(sp_id)
          }
          
          if(!map[sp_id]){
            map[sp_id] = {}
          }

          let tmp = map[sp_id]

          let ps = sp.parentElement.querySelectorAll("p");

          for (let k = 0; k < ps.length; k++) {
            let p = ps[k]
            let persons = p.querySelectorAll("persName");
            for(let m = 0; m < persons.length; m++){
              let person = persons[m]

              let ref = ""
              let text = person.textContent

              if(!person.attributes){
                continue
              }

              if(person.attributes.ref){
                ref = person.attributes.ref.value
              } else if (person.attributes.corresp){
                ref = person.attributes.corresp.value
              } else {
                continue
              }
              let refs = ref.split(" ")
              for(let n = 0; n < refs.length; n++){
                let pid = refs[n].replace("#", "")

                if(!tmp[pid]){
                  tmp[pid] = {}
                }

                let tmp2 = tmp[pid]
                if(!tmp2[text]){
                  tmp2[text] = 0
                }

                tmp2[text] += 1
              }
            }
          }
        }
      }

      this.result = result
    }
  }
};
</script>