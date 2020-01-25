<template>
  <v-card class="ma-2">
    <v-toolbar class="headline grey lighten-2" flat>
      <v-toolbar-title>外部サイト</v-toolbar-title>
    </v-toolbar>
    <template v-if="label">
    <v-list subheader>
      
        <v-subheader>「{{label}}」を調べる</v-subheader>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :href="item.link+label"
          target="_blank"
        >
          <v-list-item-avatar>
            <v-img :src="item.avator"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      
    </v-list>
    </template>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      label: null,
      items: [
        {
          title: "Wikipedia",
          avator:
            "https://pbs.twimg.com/profile_images/378800000669744275/31f249f84c8297ba8fc3fd9b6c63816f_400x400.png",
          link: "https://ja.wikipedia.org/wiki/"
        },
        {
          title: "Twitter",
          avator: "https://image.flaticon.com/icons/png/512/124/124021.png",
          link: "https://twitter.com/hashtag/"
        },
        {
          title: "Amazon",
          avator:
            "https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Amazon-512.png",
          link: "https://www.amazon.co.jp/s?k="
        }
      ]
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
            let id = obj.attributes[attr]
            if(id.indexOf("#") != -1){
              id = id.replace("#", "");
            } else {
              //ローカル値
              let tmp = id.split("/")
              id = tmp[tmp.length - 1]
            }
            label = id;
          }
        }
      } else if (obj && obj.elements) {
        label = obj.elements[0].text;
      }
      this.label = label;
    }
  }
};
</script>