<template>
  <v-card class="ma-2" style="overflow:auto; height:100%;">
    <v-toolbar color="primary" dark>
      <v-toolbar-title>人物情報</v-toolbar-title>
    </v-toolbar>

    <v-card-title>{{obj.persName}}</v-card-title>

    <v-card-subtitle>{{obj.occupation}}</v-card-subtitle>

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
      let xml = this.xml

      let listPerson = xml.querySelector("listPerson");
      if(!listPerson){
        return
      }

      let persons = listPerson.querySelectorAll("person");

      let map = {};

      for (let i = 0; i < persons.length; i++) {
        let person = persons[i];
        let id = person.attributes["xml:id"].value;
        let obj = {
          id: id
        };
        if (person.querySelector("persName")) {
          obj.persName = person.querySelector("persName").textContent;
        }
        if (person.querySelector("occupation")) {
          obj.occupation = person.querySelector("occupation").textContent;
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