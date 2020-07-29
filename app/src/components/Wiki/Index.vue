<template>
  <v-card class="ma-2">
    <!--  style="overflow:auto; height:100%;" -->
    <v-toolbar class="headline grey lighten-2" flat>
      <v-toolbar-title>Wikidata</v-toolbar-title>
    </v-toolbar>

    <div>
      <v-img v-if="obj.image" :src="obj.image"></v-img>

      <v-card-title v-if="obj.label">{{ obj.label }}</v-card-title>

      <v-card-text class="text--primary">
        <div>
          {{ obj.description ? obj.description : "" }}
          <ul class="mt-5">
            <li v-if="obj.wikidata">
              <a :href="obj.wikidata" target="_blank">Wikidata</a>
            </li>
            <li><a :href="obj.wikipedia" target="_blank">Wikidpedia</a></li>
          </ul>
        </div>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      results: [],
      obj: {},
      url: "",
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
    },
  },
  methods: {
    init() {},
    main: async function() {
      let label = null;
      let obj = this.props.e;
      let uri = "";

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
              uri = id;
              let tmp = id.split("/");
              id = tmp[tmp.length - 1];
            }
            label = id;
          }
        }
      } else if (obj && obj.elements) {
        label = obj.elements[0].text;
      }

      if (!label) {
        return;
      }

      let jsonUrl =
        "https://www.wikidata.org/wiki/Special:EntityData/" + label + ".json";
      let result = await axios.get(jsonUrl).then(function(data) {
        const obj = data.data.entities[label];
        const descriptions = obj.descriptions;
        const labels = obj.labels;
        const sitelinks = obj.sitelinks;

        const result = {};

        if (descriptions.ja) {
          result.description = descriptions.ja.value;
        } else {
          result.description = descriptions.en.value;
        }
        if (labels.ja) {
          result.label = labels.ja.value;
        } else {
          result.label = labels.en.value;
        }

        if (sitelinks.jawiki) {
          result.wikipedia = sitelinks.jawiki.url;
        } else {
          result.wikipedia = sitelinks.enwiki.url;
        }

        result.wikidata = uri;

        return result;
      }).catch(() => {
        return {}
      });

      this.obj = result;
    },
  },
};
</script>
