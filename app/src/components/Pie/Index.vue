<template>
  <v-card style="overflow:auto; height:100%;">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>呼称割合の可視化</v-toolbar-title>
    </v-toolbar>

    <v-card>
      <v-card-text>
        <sunburst :data="data" colorScheme="schemePastel1" style="height : 600px" class="mt-5">
          <!-- Add behaviors -->
          <breadcrumbTrail
            slot="legend"
            slot-scope="{ nodes, colorGetter, width }"
            :current="nodes.mouseOver"
            :root="nodes.root"
            :colorGetter="colorGetter"
            :from="nodes.zoomed"
            :width="width"
          />

          <nodeInfoDisplayer
            slot="top"
            slot-scope="{ nodes }"
            :current="nodes.mouseOver"
            :root="nodes.root"
            :clicked="nodes.clicked"
            description="of selected"
          />

          <template slot-scope="{ on, actions}">
            <highlightOnHover v-bind="{ on, actions }" />
            <zoomOnClick v-bind="{ on, actions }" />
          </template>
        </sunburst>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import {
  breadcrumbTrail,
  highlightOnHover,
  sunburst,
  nodeInfoDisplayer,
  zoomOnClick
} from "vue-d3-sunburst";
import "vue-d3-sunburst/dist/vue-d3-sunburst.css";

export default {
  components: {
    breadcrumbTrail,
    highlightOnHover,
    sunburst,
    zoomOnClick,
    nodeInfoDisplayer
  },
  props: ["xml", "props"],
  data() {
    return {
      data: {}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.arr = [];
      this.id = null;

      let xml = this.xml;

      let eles = ["persName", "rs"];
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
            let text = obj.textContent;
            let ids = obj.attributes[attr].value.split(" ");
            for (let k = 0; k < ids.length; k++) {
              let id = ids[k].replace("#", "");
              if (!map[id]) {
                map[id] = {};
              }
              let tmp = map[id];
              if (!tmp[text]) {
                tmp[text] = 0;
              }
              tmp[text] += 1;
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

      let children = [];
      for (let id in map) {
        let obj = map[id];
        let children2 = [];
        for (let text in obj) {
          children2.push({
            name: text,
            size: obj[text]
          });
        }
        children.push({
          name: id,
          children: children2
        });
      }

      this.data = {
        children: children
      };
    }
  }
};
</script>