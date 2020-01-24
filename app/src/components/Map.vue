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
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 8,
      center: [35.693825, 139.703356]
    };
  },
  methods: {
    /*
    messageLog(dat) {
        this.$emit('parentMessage', dat)
    }
    */
  }
};
</script>