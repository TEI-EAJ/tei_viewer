<template>
  <v-card class="ma-2">
    <v-toolbar class="headline grey lighten-2" flat>
      <v-toolbar-title>書誌項目引用</v-toolbar-title>
    </v-toolbar>

    <v-card-title>{{obj.id}}</v-card-title>

    <v-card-subtitle>{{obj.occupation}}</v-card-subtitle>

    <v-card-text>
      <p v-if="obj.persName"><b>名前: </b>{{obj.persName}}</p>
      <p v-if="obj.idno && obj.idno.length > 0">
        {{obj}}
        <b>ID: </b>
        <template v-for="(value, index) in obj.idno">
          <template v-if="value.type == 'URI'">
            <a :key="index" :href="value.value" target="_blank">{{value.value}}</a>
          </template>
          <template v-else>
            <span :key="index">{{value.value}}</span>
          </template>
          <span :key="'s_'+index" v-if="index != obj.idno.length - 1">, </span>
        </template>
      </p>
    </v-card-text>

    <!-- <v-card-text style="background-color : yellow">{{e}}</v-card-text> -->
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      map: {},
      obj: {}
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
    init() {
      let xml = this.xml;

      if (xml == null) {
        return;
      }

      let listBibl = xml.querySelector("listBibl");
      if (!listBibl) {
        return;
      }

      let bibls = listBibl.querySelectorAll("bibl");

      let map = {};

      for (let i = 0; i < bibls.length; i++) {
        let bibl = bibls[i];
        let obj = {};
        if(bibl.attributes["xml:id"]){
          obj.id = bibl.attributes["xml:id"].value
        }
        if (bibl.querySelectorAll("title")) {
          let biblNames = []
          let nodeList = bibl.querySelectorAll("title")
          for(let j = 0; j < nodeList.length; j++){
            let node = nodeList[j]
            biblNames.push(node.textContent)
          }
          obj.biblName = biblNames.join(", ")
        }
        if (bibl.querySelectorAll("idno")) {
          let idnos = []
          let nodeList = bibl.querySelectorAll("idno")
          for(let j = 0; j < nodeList.length; j++){
            let node = nodeList[j]
            let value = {
              "value" : node.textContent
            }
            if(node.attributes["type"]){
              value.type = node.attributes["type"].value
            }
            idnos.push(value)
          }
          obj.idno = idnos
        }
        map[obj.id] = obj;
      }

      this.map = map;
    },
    main() {
      this.obj = {};

      let obj = this.props.e;
      if (obj && obj.attributes) {
        let id = null;
        let attrs = ["corresp", "ref", "sameAs"];
        for (let i = 0; i < attrs.length; i++) {
          let attr = attrs[i];
          if (obj.attributes[attr]) {
            id = this.props.e.attributes[attr].replace("#", "");
          }
        }
        if (this.map[id]) {
          this.obj = this.map[id];
        }
      }
    }
  }
};
</script>