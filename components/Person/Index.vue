<template>
  <v-card class="ma-2" style="overflow:auto; height:100%;">
    <v-toolbar class="headline grey lighten-2" flat>
      <v-toolbar-title>人物情報</v-toolbar-title>
    </v-toolbar>

    <v-list-item three-line v-if="obj.id">
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{obj.id}}</v-list-item-title>
        <v-list-item-subtitle>{{obj.occupation}}</v-list-item-subtitle>
      </v-list-item-content>

      <v-icon color="grey" size="80">mdi-account</v-icon>
    </v-list-item>

    <v-card-text>
      <p v-if="obj.persName"><b>名前: </b>{{obj.persName}}</p>
      <p v-if="obj.idno && obj.idno.length > 0">
        <b>ID: </b>
        <template v-for="(value, index) in obj.idno">
          <a :key="index" :href="value" target="_blank">{{value}}</a>
          <span :key="'s_'+index" v-if="index != obj.idno.length - 1">, </span>
        </template>
      </p>
      <p v-if="obj.ref">
        <b>Ref: </b>
        <a :href="obj.ref" target="_blank">{{obj.ref}}</a>
      </p>
      <p v-if="obj.note">
        <!-- <b>Note: </b> -->
        {{obj.note}}
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

      let listPerson = xml.querySelector("listPerson");
      if (!listPerson) {
        return;
      }

      let persons = listPerson.querySelectorAll("person");

      let map = {};

      for (let i = 0; i < persons.length; i++) {
        let person = persons[i];
        let obj = {};
        if(person.attributes["xml:id"]){
          obj.id = person.attributes["xml:id"].value
        }
        if (person.querySelectorAll("persName")) {
          let persNames = []
          let nodeList = person.querySelectorAll("persName")
          for(let j = 0; j < nodeList.length; j++){
            let node = nodeList[j]
            persNames.push(node.textContent)

            if(node.attributes.ref){
              obj.ref = node.attributes.ref.value.split(" ")[0]
            }
          }
          obj.persName = persNames.join(", ")
        }
        if (person.querySelector("occupation")) {
          obj.occupation = person.querySelector("occupation").textContent;
        }
        if (person.querySelectorAll("idno")) {
          let idnos = []
          let nodeList = person.querySelectorAll("idno")
          for(let j = 0; j < nodeList.length; j++){
            let node = nodeList[j]
            idnos.push(node.textContent)
          }
          obj.idno = idnos
        }
        if (person.querySelector("note")) {
          obj.note = person.querySelector("note").textContent;
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