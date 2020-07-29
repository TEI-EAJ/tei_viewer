<template>
  <v-card class="ma-2"> <!--  style="overflow:auto; height:100%;" -->
    <v-toolbar class="headline grey lighten-2" flat>
      <v-toolbar-title>Wikipedia</v-toolbar-title>
    </v-toolbar>

    <div v-if="obj && Object.keys(obj).length != 0">
      <v-img v-if="obj.image" :src="obj.image.value"></v-img>

      <v-card-title v-if="obj.label">{{obj.label.value}}</v-card-title>

      <v-card-text class="text--primary">
        <div>
          {{obj.description ? obj.description.value : ""}}
          <ul class="mt-5">
          <li v-if="obj.item"><a
            :href="obj.item.value"
            target="_blank"
          >ウィキデータ</a>
          </li>
           <li><a
            :href="obj.url"
            target="_blank"
          >ウィキペディア</a>
          </li>
          </ul>
        </div>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
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
      obj: {},
      url: ""
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
    main: async function() {
      let label = null;
      let obj = this.props.e
      let url = ""

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
              url = id
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

      const queryDispatcher = new SPARQLQueryDispatcher(endpointUrl);
      let result = await queryDispatcher.query(sparqlQuery).then(function(data) {
        let results = data.results.bindings;
        if (results.length > 0) {
          let result = results[0];
          ///self.obj = result;
          return result
        } else {
          //self.obj = {};
          return {}
        }
      });

      if(url != ""){
        result.url = url

        let query  = `
          select * where {
            ?s ?v ?o . 
            filter (?s = <`+url+`>)
          }

        `
        const jdb = "https://dbpedia.org/sparql/?query=" + encodeURIComponent(query)+"&format=json"

        const description = await axios.get(jdb).then(function(data){
          let results = data.data.results.bindings
          for(let i = 0; i < results.length; i++){
            let tmp = results[i]

            let v = tmp.v.value
            let o = tmp.o.value

            if(v == "http://www.w3.org/2000/01/rdf-schema#comment"){
              if(tmp.o["xml:lang"] == "ja"){
                return o
              }
            }
          }
        })

        result.description = {
          value : description
        }
      }
      
      this.obj = result
    }
  }
};
</script>