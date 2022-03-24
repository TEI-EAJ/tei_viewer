<template>
  <v-card class="ma-2">
    <v-toolbar class="headline grey lighten-2" flat>
      <v-toolbar-title>時間情報</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <p v-if="obj && obj.when"><b>When: </b>{{obj.when}}</p>
      
      <p v-if="obj && obj.uri">
        <b>URI: </b>
        <a :href="obj.uri" target="_blank">{{obj.uri}}</a>
      </p>
    </v-card-text>

    <!-- <v-card-text style="background-color : yellow">{{e}}</v-card-text> -->
  </v-card>
</template>

<script>
export default {
  data() {
    return {
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
    main: async function() {
      let obj = this.props.e;

      let attrs = ["when"];
      if (obj && obj.attributes) {
        for (let i = 0; i < attrs.length; i++) {
          let attr = attrs[i];
          if (obj.attributes[attr]) {
            let when = obj.attributes[attr]
            obj.when = when
            obj.uri = "http://datetime.hutime.org/date/"+when
          }
        }
      }

      this.obj = obj
      
    }
  }
};
</script>