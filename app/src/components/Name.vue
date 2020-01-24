<template>
  <v-card class="ma-2" style="overflow:auto; height:100%;">
    <v-toolbar color="primary" dark>
      <v-toolbar-title>呼称</v-toolbar-title>
    </v-toolbar>

    <template v-if="arr.length > 0">
      <v-card-title>「{{id}}」の呼称（{{arr.length}}件）</v-card-title>

      <v-card-text>
        <ol>
          <li v-for="(value, key) in arr" :key="key">{{value}}</li>
        </ol>
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      arr: [],
      id: null
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

      let attrs = ["corresp", "ref"];

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
        let attrs = ["corresp", "ref"];
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

          let arr = [];

          for (let i = 0; i < persNames.length; i++) {
            let persName = persNames[i];
            let text = persName.textContent;
            arr.push(text);
          }

          this.arr = arr;
        }
      }
    }
  }
};
</script>