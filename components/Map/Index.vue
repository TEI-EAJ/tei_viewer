<template>
  <div class="ma-2 pa-2">
    <div style="width : 100%; height : 600px">
      <l-map :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker v-for="(marker, index) in markers" v-bind:key="index" :lat-lng="marker.latlng">
          <l-popup>
            <a target="_blank" :href="marker.url">{{marker.content}}</a>
          </l-popup>
        </l-marker>
      </l-map>
    </div>
  </div>
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

import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import { Icon } from "leaflet";

import "leaflet/dist/leaflet.css";

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
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
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 3,
      center: [35.693825, 139.703356],
      attribution: "Sample Organization",
      markers: []
    };
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
        ?item wdt:P625 ?location .
        optional { ?item wdt:P18 ?image }
      }`;

      const self = this;
      this.markers = [];
      const queryDispatcher = new SPARQLQueryDispatcher(endpointUrl);
      queryDispatcher.query(sparqlQuery).then(function(data) {
        let results = data.results.bindings;

        let tlat = 0;
        let tlong = 0;
        for (let i = 0; i < results.length; i++) {
          let obj = results[i];

          let location = obj.location.value
            .replace(")", "(")
            .split("(")[1]
            .split(" ");

          let lat = location[1];
          let long = location[0];

          let marker = {
            latlng: [Number(lat), Number(long)],
            content: obj.label.value,
            url: obj.item.value
          };
          self.markers.push(marker);
          tlat += Number(lat);
          tlong += Number(long);
        }

        let center = [tlat / results.length, tlong / results.length];
        self.center = center;
      });
    }
  }
};
</script>