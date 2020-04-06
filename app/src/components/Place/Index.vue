<template>
  <v-card class="ma-2">
    <v-toolbar class="headline grey lighten-2" flat>
      <v-toolbar-title>場所情報</v-toolbar-title>
    </v-toolbar>

    <v-card-title>{{obj.id}}</v-card-title>

    <v-card-subtitle>{{obj.desc}}</v-card-subtitle>

    <v-card-text>
      <p v-if="obj.placeName"><b>名前: </b>{{obj.placeName}}</p>
      <p v-if="obj.idno"><b>ID: </b>
        <template v-for="(value, index) in obj.idno">
          <a :key="index" :href="value" target="_blank">{{value}}</a>
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

      let listPlace = xml.querySelector("listPlace");
      if (!listPlace) {
        return;
      }

      let places = listPlace.querySelectorAll("place");

      let map = {};

      for (let i = 0; i < places.length; i++) {
        let place = places[i];
        let obj = {};
        if(place.attributes["xml:id"]){
          obj.id = place.attributes["xml:id"].value
        }
        if (place.querySelectorAll("placeName")) {
          let placeNames = []
          let nodeList = place.querySelectorAll("placeName")
          for(let j = 0; j < nodeList.length; j++){
            let node = nodeList[j]
            placeNames.push(node.textContent)
          }
          obj.placeName = placeNames.join(", ")
        }
        if (place.querySelector("desc")) {
          obj.desc = place.querySelector("desc").textContent;
        }
        if (place.querySelectorAll("idno")) {
          let idnos = []
          let nodeList = place.querySelectorAll("idno")
          for(let j = 0; j < nodeList.length; j++){
            let node = nodeList[j]
            idnos.push(node.textContent)
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
        let attrs = ["corresp", "ref"];
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