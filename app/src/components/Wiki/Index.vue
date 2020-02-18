<template>
  <v-card class="ma-2 pa-2" style="overflow:auto; height:100%;" v-if="Object.keys(obj).length != 0">
    <v-img v-if="obj.image" :src="obj.image.value"></v-img>

    <v-card-title v-if="obj.label">{{obj.label.value}}</v-card-title>

    <!-- <v-card-subtitle>たさき しんや</v-card-subtitle> -->

    <v-divider></v-divider>

    <v-card-text class="text--primary">
      <div>
        {{obj.description ? obj.description.value : ""}}
        <a
          :href="obj.item.value"
          target="_blank"
        >ウィキペディア</a>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
class SPARQLQueryDispatcher {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  query(sparqlQuery) {
    const fullUrl = this.endpoint + "?query=" + encodeURIComponent(sparqlQuery);
    const headers = { Accept: "application/sparql-results+json" };

    return fetch(fullUrl, { headers }).then(body => body.json());
  }
}

export default {
  data() {
    return {
      results: [],
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
    init() {},
    main: function() {
      let label = null;
      let obj = this.props.e;

      let attrs = ["corresp", "ref"];
      if (obj && obj.attributes) {
        for (let i = 0; i < attrs.length; i++) {
          let attr = attrs[i];
          if (obj.attributes[attr]) {
            let id = obj.attributes[attr];
            if (id.indexOf("#") != -1) {
              id = id.replace("#", "");
            } else {
              //ローカル値
              let tmp = id.split("/");
              id = tmp[tmp.length - 1];
            }
            label = id;
          }
        }
      } else if (obj && obj.elements) {
        label = obj.elements[0].text;
      }

      const endpointUrl = "https://query.wikidata.org/sparql";
      const sparqlQuery =
        `#ネコ
      SELECT *
      WHERE 
      {
        ?item rdfs:label "` +
        label +
        `"@ja; rdfs:label ?label . filter(lang(?label) = "ja") .  
        optional { ?item schema:description ?description. filter(lang(?description) = "ja") }
        optional { ?item wdt:P18 ?image }
      }`;
      const self = this;

      const queryDispatcher = new SPARQLQueryDispatcher(endpointUrl);
      queryDispatcher.query(sparqlQuery).then(function(data) {
        let results = data.results.bindings;
        if (results.length > 0) {
          let result = results[0];
          self.obj = result;
        } else {
          self.obj = {};
        }
      });
    }
  }
};
</script>