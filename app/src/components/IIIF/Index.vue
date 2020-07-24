<template>
  <v-card class="ma-2" style="overflow:auto; height:100%;">
    <iframe
      width="100%"
      height="100%"
      v-if="url != ''"
      :src="url"
      seamless="seamless"
      style="border: none;"
      allow="fullscreen"
    />

    <template v-if="arr.length > 0">
      <v-card-text>
        <v-btn @click="flg = !flg">
          <template v-if="flg">グラフを隠す</template>
          <template v-else>グラフを表示</template>
        </v-btn>

        <Sunburst height="300" :data="data" v-show="flg"></Sunburst>

        <ol class="mt-5">
          <li v-for="(obj, key) in arr" :key="key">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{obj.label}}</span>
              </template>
              <span>{{obj.size}} / {{obj.all}} ({{(obj.size / obj.all * 100).toFixed(2)}}%)</span>
            </v-tooltip>
          </li>
        </ol>
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
import Sunburst from "../../components/common/Sunburst.vue";
export default {
  components: {
    Sunburst
  },
  data() {
    return {
      flg: false,
      arr: [],
      id: null,
      data: {},
      url: ""
    };
  },
  props: ["xml", "props"],
  mounted() {
    this.init();
    this.main();
  },
  watch: {
    props: function() {
      this.main();
    },
    xml: function() {
      this.init();
    }
  },
  methods: {
    init() {},
    main() {
      this.arr = [];
      this.id = null;

      //選択語
      let obj = this.props.e;

      if (obj != null && obj.attributes != null) {
        let zone_id = obj.attributes.facs.replace("#", "");
        let xml = this.xml;
        let zone = xml.querySelector('[*|id="' + zone_id + '"]');

        let surface = zone.parentElement;
        let graphic = surface.querySelector("graphic");
        let canvas = graphic.attributes.n.value;

        let surfaceGrp = surface.parentElement;
        let manifest = surfaceGrp.attributes.facs.value;

        zone = zone.attributes;
        let x = Number(zone.ulx.value);
        let y = Number(zone.uly.value);
        let x2 = Number(zone.lrx.value);
        let y2 = Number(zone.lry.value);
        let w = x2 - x;
        let h = y2 - y;
        let xywh = x + "," + y + "," + w + "," + h;

        let params = [
          {
            manifest: manifest,
            canvas: canvas + "#xywh=" + xywh
          }
        ];

        let param_str = encodeURIComponent(JSON.stringify(params));

        this.url = "mirador/?params=" + param_str;
      } else if(obj === null){
        let xml = this.xml;
        let surfaceGrp = xml.querySelector('surfaceGrp');
        let manifest = surfaceGrp.attributes.facs.value;

        let params = [
          {
            manifest: manifest
          }
        ];

        let param_str = encodeURIComponent(JSON.stringify(params));

        this.url = "mirador/?params=" + param_str;
      }
    }
  }
};
</script>