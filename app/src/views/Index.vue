<template>
  <div>
    <v-navigation-drawer v-model="drawer" app :temporary="true">
      <v-list>
        <v-list-item
          @click="dialog = !dialog; drawer = !drawer; components.c = value"
          v-for="(value, key) in map"
          :key="key"
        >
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{key}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon v-if="start" @click.stop="drawer = !drawer" />
      <v-toolbar-title>TEI Viewer</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon href="./">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container class="my-5" v-show="!start">
      <h2 class="mb-5">TEI Viewer</h2>
      <p>TEI/XMLファイルを選択してください。</p>
      <input type="file" id="files" @change="handleFileSelect" multiple />

      <output id="list" class="mt-5"></output>

      <br />
      <br />
      <br />

      <p class="mt-5">例１：走れメロス</p>

      <v-btn
        color="primary"
        to="/?u=https://www.dhii.jp/nagasaki/dazai_all_20191012.xml"
        class="mx-2 my-1"
      >可視化例を見る</v-btn>
      <v-btn
        href="https://www.dhii.jp/nagasaki/dazai_all_20191012.xml"
        target="_blank"
        class="mx-2 my-1"
      >サンプルデータを見る</v-btn>

      <br />
      <br />

      <p class="mt-5">例２：芥川龍之介 三つの宝</p>

      <v-btn
        color="primary"
        to="/?u=https://raw.githubusercontent.com/TEI-EAJ/aozora_tei/master/data/complete/tei_lib_lv3/1126_tei.xml"
        class="mx-2 my-1"
      >可視化例を見る</v-btn>
      <v-btn
        href="https://raw.githubusercontent.com/TEI-EAJ/aozora_tei/master/data/complete/tei_lib_lv3/1126_tei.xml"
        target="_blank"
        class="mx-2 my-1"
      >サンプルデータを見る</v-btn>

      <br />
      <br />

      <p class="mt-5">例３：芥川龍之介 二人小町</p>

      <v-btn
        color="primary"
        to="/?u=https://raw.githubusercontent.com/TEI-EAJ/aozora_tei/master/data/complete/tei_lib_lv3/86_tei.xml"
        class="mx-2 my-1"
      >可視化例を見る</v-btn>
      <v-btn
        href="https://raw.githubusercontent.com/TEI-EAJ/aozora_tei/master/data/complete/tei_lib_lv3/86_tei.xml"
        target="_blank"
        class="mx-2 my-1"
      >サンプルデータを見る</v-btn>

      <br />
      <br />

      <p class="mt-5">
        例４：Emily Dickinson ‘Faith is a fine invention’ from
        <a
          href="http://v-machine.org/samples/"
        >Versioning Machine</a>
      </p>

      <v-btn
        color="primary"
        to="/?u=https://tei-eaj.github.io/koui/data/faith.xml"
        class="mx-2 my-1"
      >可視化例を見る</v-btn>
      <v-btn
        href="http://v-machine.org/samples/faith.xml"
        target="_blank"
        class="mx-2 my-1"
      >サンプルデータを見る</v-btn>
    </v-container>

    <div style="height : 800px" v-if="start">
      <splitpanes class="default-theme" size="50">
        <pane size="20">
          <splitpanes class="default-theme" horizontal="horizontal" size="50">
            <pane size="50">
              <component :is="components.c1" :xml="xml" :props="props"></component>
            </pane>
            <pane size="50">
              <component :is="components.c2" :xml="xml" :props="props"></component>
            </pane>
          </splitpanes>
        </pane>
        <pane size="60">
          <v-card class="ma-2 pa-2" style="overflow:auto; height:100%;">
            <v-card-text class="text--primary">
              <Hello v-on:parentMessage="messageLog" :elements="data.elements"></Hello>
            </v-card-text>
          </v-card>
        </pane>
        <pane size="20">
          <splitpanes class="default-theme" horizontal="horizontal" size="50">
            <pane size="50">
              <component :is="components.c3" :xml="xml" :props="props"></component>
            </pane>
            <pane size="50">
              <component :is="components.c4" :xml="xml" :props="props"></component>
            </pane>
          </splitpanes>
        </pane>
      </splitpanes>
    </div>

    <v-dialog v-model="dialog" width="80%">
      <component v-if="e" :is="components.c" :xml="xml" :props="props"></component>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Wiki from "../components/Wiki.vue";
import Map from "../components/Map.vue";
import Link from "../components/Link.vue";
import MIMA from "../components/MIMA.vue";
import Person from "../components/Person.vue";
import Name from "../components/Name/Index.vue";
import Sp from "../components/Sp/Index.vue";
import Graph from "../components/Graph/Index.vue";
import Pie from "../components/Pie/Index.vue";
import Wordcloud from "../components/Wordcloud/Index.vue";

var convert = require("xml-js");

export default {
  components: {
    Map,
    Wiki,
    Link,
    MIMA,
    Person,
    Name,
    Sp,
    Graph,
    Pie,
    Wordcloud
  },
  data: () => ({
    //config
    start: false,
    dialog: false,
    drawer: false,

    //パラメータ
    data: null,
    xml: null,
    e: null,

    //components
    components: {
      c1: "Person",
      c2: "Link",
      c3: "Name",
      c4: "Sp"
    },
    map: {
      "人物の出現頻度": Graph,
      "呼称割合の可視化": Pie,
      "ワードクラウド": Wordcloud
    }
  }),
  mounted() {
    this.init();
  },
  watch: {
    $route() {
      this.$router.go({
        path: this.$router.currentRoute.path,
        force: true
      });
    },
    xml() {
      this.handleXml();
    }
  },
  computed: {
    props: function() {
      return {
        e: this.e
      };
    }
  },
  methods: {
    handleFileSelect(evt) {
      var files = evt.target.files; // FileList object

      for (var i = 0; i < files.length; i++) {
        let f = files[i];
        var reader = new FileReader();
        reader.readAsText(f);

        var vm = this;
        reader.onload = function() {
          var dpObj = new DOMParser();
          let xmlDoc = dpObj.parseFromString(reader.result, "text/xml");
          vm.xml = xmlDoc;
        };
      }
    },
    handleXml() {
      let xml_node = this.xml;

      //xmlの読み込みのために必須
      let xml_str = new XMLSerializer().serializeToString(xml_node);
      var result = convert.xml2json(xml_str, { compact: false, spaces: 4 });
      this.data = JSON.parse(result);
      this.start = true;
    },
    init() {
      let u = this.$route.query.u == null ? null : this.$route.query.u; //"01_with_wit.xml"

      if (!u) {
        this.start = false;
        return;
      }

      if (u.indexOf("bbp") != -1) {
        this.components = {
          c1: "Wiki",
          c2: "Map",
          c3: "MIMA",
          c4: "Link",
          c: "Graph"
        };
      }

      axios
        .get(u, {
          //responseType: "document"
        })
        .then(response => {
          let xml_node = response.data;
          if (typeof xml_node == "string") {
            var dpObj = new DOMParser();
            xml_node = dpObj.parseFromString(xml_node, "text/xml");
          }
          this.xml = xml_node;
        });
    },
    messageLog(message) {
      this.e = message;
    },
    init2() {
      let u = this.$route.query.u == null ? "test3.xml" : this.$route.query.u; //"01_with_wit.xml"
      this.exec2main(u);

      let param = Object.assign({}, this.$route.query);
      let class_arr = param.class ? param.class.split(",") : ["Q282"];

      class SPARQLQueryDispatcher {
        constructor(endpoint) {
          this.endpoint = endpoint;
        }

        query(sparqlQuery) {
          const fullUrl =
            this.endpoint + "?query=" + encodeURIComponent(sparqlQuery);
          const headers = { Accept: "application/sparql-results+json" };

          return fetch(fullUrl, { headers }).then(body => body.json());
        }
      }

      const endpointUrl = "https://query.wikidata.org/sparql";

      let aaa = "";
      for (let i = 0; i < class_arr.length; i++) {
        let class_value = class_arr[i];
        aaa +=
          `{  ?item wdt:P31 wd:` +
          class_value +
          `;
        rdfs:label ?label . }`;
        if (i != class_arr.length - 1) {
          aaa += " UNION ";
        }
      }

      const sparqlQuery =
        `#ネコ
      SELECT DISTINCT *
      WHERE 
      {
  ` +
        aaa +
        `
    filter(lang(?label) = "en")
    optional { ?item schema:description ?description . filter(lang(?description) = "en")}
    optional { ?item wdt:P18 ?image }
    optional { ?item wdt:P571 ?inception }
    optional { ?item wdt:P495 ?country . ?country rdfs:label ?country_label . filter(lang(?country_label) = "en")}
    optional { ?item wdt:P176 ?manufacturer . ?manufacturer  rdfs:label ?manufacturer_label . filter(lang(?manufacturer_label) = "en") }
  }`;

      const queryDispatcher = new SPARQLQueryDispatcher(endpointUrl);
      queryDispatcher.query(sparqlQuery).then(response => {
        let results = response.results.bindings;

        let index = {};
        for (let i = 0; i < results.length; i++) {
          let obj = results[i];
          for (let key in obj) {
            let value = obj[key].value;

            if (key == "inception") {
              value = value.split("-")[0];
            }

            if (!index[key]) {
              index[key] = {};
            }
            if (!index[key][value]) {
              index[key][value] = 0;
            }
            index[key][value] += 1;
          }
        }

        let aggs = {};

        let op = [
          {
            label: "Inception",
            field: "inception"
          },
          {
            label: "Country",
            field: "country_label"
          },
          {
            label: "Manufacturer",
            field: "manufacturer_label"
          }
        ];

        let query_aggs = {};

        for (let i = 0; i < op.length; i++) {
          let obj = op[i];
          query_aggs[obj.label] = {
            terms: {
              field: obj.field,
              order: {
                _count: "desc"
              },
              size: 20
            }
          };
        }

        for (let label in query_aggs) {
          let obj = query_aggs[label].terms;
          let size = Number(obj.size);
          let field = obj.field.replace(".keyword", "");
          let map = index[field];

          let map_new = {};
          for (let value in map) {
            map_new[value] = map[value];
          }

          //オブジェクトに変換
          let arr = Object.keys(map_new).map(e => ({
            key: e,
            value: map_new[e]
          }));

          //値でそーと
          arr.sort(function(a, b) {
            if (a.value < b.value) return 1;
            if (a.value > b.value) return -1;
            return 0;
          });

          if (size > arr.length) {
            size = arr.length;
          }

          let buckets = [];
          for (let i = 0; i < size; i++) {
            buckets.push({
              key: arr[i].key,
              doc_count: arr[i].value
            });
          }

          aggs[field] = {
            buckets: buckets
          };
        }

        let result = {
          aggregations: aggs,
          hits: {
            hits: results,
            total: {
              relation: "gte",
              value: results.length
            }
          }
        };

        this.results = result;
      });
    }
  }
};
</script>
