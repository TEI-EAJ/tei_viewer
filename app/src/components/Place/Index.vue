<template>
  <v-card class="ma-2">
    <v-toolbar class="headline grey lighten-2" flat>
      <v-toolbar-title>場所情報</v-toolbar-title>
    </v-toolbar>

    <v-card-title>{{obj.placeName}}</v-card-title>

    <v-card-subtitle>{{obj.desc}}</v-card-subtitle>

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
        let id = place.attributes["xml:id"].value;
        let obj = {
          id: id
        };
        if (place.querySelector("placeName")) {
          obj.placeName = place.querySelector("placeName").textContent;
        }
        if (place.querySelector("desc")) {
          obj.desc = place.querySelector("desc").textContent;
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