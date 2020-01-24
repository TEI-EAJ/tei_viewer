<template>
  <v-card class="ma-2" style="overflow:auto; height:100%;">
    <v-toolbar color="primary" dark>
      <v-toolbar-title>発話内容</v-toolbar-title>
    </v-toolbar>

    <template v-if="arr.length > 0">
      <v-card-title>「{{id}}」の発話（{{arr.length}}件）</v-card-title>

      <v-card-text>
        <ol>
          <li v-for="(value, key) in arr" :key="key">{{value}}</li>
        </ol>
      </v-card-text>

      <Wordcloud :text="text"></Wordcloud>
    </template>
  </v-card>
</template>

<script>
import Wordcloud from "../../components/common/Wordcloud.vue";
export default {
  components: {
    Wordcloud
  },
  data() {
    return {
      arr: [],
      id: null,
      text: ""
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

      let attrs = ["corresp", "ref"];

      //選択語
      let obj = this.props.e;

      let id = null;

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
        for (let i = 0; i < attrs.length; i++) {
          let attr = attrs[i];
          if (obj.attributes[attr]) {
            id = obj.attributes[attr].replace("#", "");
          }
        }
      }

      if (id != null) {
        this.id = id;

        //---- ここまで ----
        let xml = this.xml;

        if (xml) {
          let body = xml.querySelector("body");
          //let persNames = [];
          let sps = body.querySelectorAll("sp");
          let arr = [];
          for (let j = 0; j < sps.length; j++) {
            let sp = sps[j];
            if (!sp.attributes || !sp.attributes["who"]) {
              continue;
            }
            if (sp.attributes["who"].value.replace("#", "") == id) {
              let ps = sp.querySelectorAll("p");
              let text = "";
              for (let k = 0; k < ps.length; k++) {
                text += ps[k].textContent;
              }
              arr.push(text);
            }
          }

          sps = body.querySelectorAll("said");
          //let arr = []
          for (let j = 0; j < sps.length; j++) {
            let sp = sps[j];
            if (
              sp.attributes["who"] &&
              sp.attributes["who"].value.replace("#", "") == id
            ) {
              arr.push(sp.textContent);
            }
          }

          this.arr = arr;

          let text = "";
          for (let i = 0; i < arr.length; i++) {
            text += arr[i] + "\n";
          }

          this.text = text;
        }
      }
    }
  }
};
</script>