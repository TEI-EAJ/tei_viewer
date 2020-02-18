<template>
  <v-card class="ma-2" style="overflow:auto; height:100%;">
    <v-toolbar class="headline grey lighten-2" flat>
      <v-toolbar-title>関連コンテンツ</v-toolbar-title>
    </v-toolbar>
    <template v-if="label">
      <v-card-text>
        <v-list subheader>
          <v-subheader>
            <a
              target="_blank"
              :href="'http://mimasearch.jp/bbp/mimasearch/#/q='+label"
            >「{{label}}」をMIMAサーチで検索する</a>
          </v-subheader>
        </v-list>
        <ol>
          <v-list-item v-for="(item, key) in results" :key="key">
            <li v-html="getHtml(item)"></li>
          </v-list-item>
        </ol>
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      results: [],
      label: null
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
      this.label = label;

      let url =
        "https://diyhistory.org/iiif_conv.php/http://demo:demo@mimasearch.jp/bbp/mimasearch/api?callback=jQuery1720936973559136278_1581945920314&action=search&min-score=0.1&start-index=1&max-results=50&alt=json&auth=bWltYXNlYXJjaDptaW1hc2VhcmNoMjAwOA==&q=" +
        label +
        "&_=1581945921405";

      axios
        .get(url)
        .then(
          function(response) {
            let data = response.data;
            data = "{" + data.split("( {")[1];
            data = data.replace("} );", "}");
            data = JSON.parse(data);
            this.results = data.searchResultSet.results;
          }.bind(this)
        )
        .catch(
          function(err) {
            alert(err);
          }.bind(this)
        );
    },
    getHtml: function(item) {
      return (
        item.summary +
        " <a target='_blank' href='http://mimasearch.jp/bbp/mimasearch/api?action=detail&q=" +
        this.label +
        "&doc_id=" +
        item.doc_id +
        "&db_id=" +
        item.db_id +
        "'>MIMAサーチ</a>"
      );
    }
  }
};
</script>
<style>
.mimasearch_keyword {
  background-color: rgba(255, 255, 0, 0.5);
}
</style>