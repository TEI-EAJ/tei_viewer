<template>
  <v-card class="ma-2" style="overflow:auto; height:100%;">
    <v-toolbar class="headline grey lighten-2" flat>
      <v-toolbar-title>場所情報</v-toolbar-title>
    </v-toolbar>

    

    <v-card-title>{{obj.id}}</v-card-title>

    <v-card-subtitle>{{obj.desc}}</v-card-subtitle>

    <v-card-text>
      <p v-if="obj.placeName"><b>名前: </b>{{obj.placeName}}</p>
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
        <b>Note: </b>
        {{obj.note}}
      </p>

      <div style="width : 100%; height : 300px;" v-if="obj.markers">
        <l-map :zoom="zoom" :center="obj.center">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker v-for="(marker, index) in obj.markers" v-bind:key="index" :lat-lng="marker.latlng">
            <l-popup>
              <a target="_blank" :href="marker.url">{{marker.content}}</a>
            </l-popup>
          </l-marker>
        </l-map>
      </div>
    </v-card-text>

    <!-- <v-card-text style="background-color : yellow">{{e}}</v-card-text> -->
  </v-card>
</template>

<script>

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
  data() {
    return {
      map: {},
      obj: {},

      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 3,
      attribution: "Sample Organization",
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

            if(node.attributes.ref){
              obj.ref = node.attributes.ref.value
            }
          }
          obj.placeName = placeNames.join(", ")
        }
        if (place.querySelector("desc")) {
          obj.desc = place.querySelector("desc").textContent;
        }
        if (place.querySelectorAll("geo")) {
          let markers = []
          let tlat = 0;
          let tlong = 0;
          let geoList = place.querySelectorAll("geo")
          for(let j = 0; j < geoList.length; j++){
            let geo = geoList[j]
            let text = geo.textContent
            let textSpl = text.split(", ")
            let lat = textSpl[0]
            let long = textSpl[1]

            let marker = {
              latlng: [Number(lat), Number(long)],
              content: obj.placeName
            };
            markers.push(marker);
            tlat += Number(lat);
            tlong += Number(long);
          }

          let center = [tlat / geoList.length, tlong / geoList.length];
          obj.markers = markers
          obj.center = center
          
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
        if (place.querySelector("note")) {
          obj.note = place.querySelector("note").textContent;
        }
        map[obj.id] = obj;
      }

      this.map = map;
    },
    main() {
      this.obj = {};
      this.markers = []

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