<template>
  <sunburst :data="data" colorScheme="schemePastel1" :style="'height : '+height+'px'" class="mt-5">
    <!-- Add behaviors -->
    <breadcrumbTrail
      slot="legend"
      slot-scope="{ nodes, colorGetter, width }"
      :current="nodes.mouseOver"
      :root="nodes.root"
      :colorGetter="colorGetter"
      :from="nodes.zoomed"
      :width="width"
    />

    <nodeInfoDisplayer
      slot="top"
      slot-scope="{ nodes }"
      :current="nodes.mouseOver"
      :root="nodes.root"
      :clicked="nodes.clicked"
      description="of selected"
    />

    <template slot-scope="{ on, actions}">
      <highlightOnHover v-bind="{ on, actions }" />
      <zoomOnClick v-bind="{ on, actions }" />
    </template>
  </sunburst>
</template>

<script>
import {
  breadcrumbTrail,
  highlightOnHover,
  sunburst,
  nodeInfoDisplayer,
  zoomOnClick
} from "vue-d3-sunburst";
import "vue-d3-sunburst/dist/vue-d3-sunburst.css";

export default {
  components: {
    breadcrumbTrail,
    highlightOnHover,
    sunburst,
    zoomOnClick,
    nodeInfoDisplayer
  },
  props: ["height", "data"]
};
</script>