<template>
  <v-card class="ma-2" style="overflow:auto; height:100%;">
    <v-toolbar class="headline grey lighten-2" flat>
      <v-toolbar-title>呼称</v-toolbar-title>
    </v-toolbar>

    <template v-if="arr.length > 0">
      <v-card-title>「{{id}}」の呼称（{{arr.length}}件）</v-card-title>

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
      data: {}
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

      let id = null;

      let attrs = ["corresp", "ref", "sameAs"];

      //戯曲の場合
      if (obj && obj.name == "speaker") {
        //---- ここまで ----
        let xml = this.xml;
        let sps = xml.querySelectorAll("speaker");
        for (let i = 0; i < sps.length; i++) {
          let sp = sps[i];
          if (sp.textContent == obj.elements[0].text) {
            id = sp.parentElement.attributes.who.value.replace("#", "");
            break;
          }
        }
      } else if (obj && obj.attributes) {
        let attrs = ["corresp", "ref", "sameAs"];
        for (let i = 0; i < attrs.length; i++) {
          let attr = attrs[i];
          if (obj.attributes[attr]) {
            id = obj.attributes[attr].replace("#", "");
          }
        }
      }

      if (id != null) {
        this.id = id;

        let xml = this.xml;

        if (xml) {
          let body = xml.querySelector("body");
          let persNames = [];
          for (let i = 0; i < attrs.length; i++) {
            let arr = body.querySelectorAll("[" + attrs[i] + '="#' + id + '"]');
            for (let j = 0; j < arr.length; j++) {
              persNames.push(arr[j]);
            }
          }

          let map = {};
          let size = 0;
          for (let i = 0; i < persNames.length; i++) {
            let persName = persNames[i];
            let text = persName.textContent;
            if (!map[text]) {
              map[text] = 0;
            }
            map[text] += 1;
            size += 1;
          }

          let arr = [];

          for (let i = 0; i < persNames.length; i++) {
            let persName = persNames[i];
            let text = persName.textContent;
            arr.push({
              label: text,
              size: map[text],
              all: size
            });
          }

          this.arr = arr;

          // chart

          let children = [];

          for (let key in map) {
            children.push({
              name: key,
              size: map[key]
            });
          }

          this.data = {
            children: children
          };
        }
      }
    }
  }
};
</script>