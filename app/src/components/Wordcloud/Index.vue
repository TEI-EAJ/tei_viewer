<template>
  <v-card style="overflow:auto; height:100%;">
    <v-toolbar class="headline grey lighten-2" flat>
      <v-toolbar-title>ワードクラウド</v-toolbar-title>
    </v-toolbar>

    <v-card-text class="mt-5">
      <Wordcloud :text="text"></Wordcloud>
    </v-card-text>
  </v-card>
</template>

<script>
import Wordcloud from "../../components/common/Wordcloud.vue";
export default {
  components: {
    Wordcloud
  },
  data() {
    return {
      text: ""
    };
  },
  props: ["xml", "props"],
  created() {
    this.init();
    this.main();
  },
  watch: {
    /*
    props: function() {
      this.main();
    },
    */
    xml: function() {
      this.init();
    }
  },
  methods: {
    init() {},
    main() {

        //---- ここまで ----
      let xml = this.xml;

      if (xml) {
        let body = xml.querySelector("body");
        //let persNames = [];
        let sps = body.querySelectorAll("sp");
        let arr = [];
        for (let j = 0; j < sps.length; j++) {
          let sp = sps[j];
          if (!sp.attributes || !sp.attributes["who"]) {
            continue;
          }
          let ps = sp.querySelectorAll("p");
          let text = "";
          for (let k = 0; k < ps.length; k++) {
            text += ps[k].textContent;
          }
          arr.push(text);
          
        }

        sps = body.querySelectorAll("said");
        //let arr = []
        for (let j = 0; j < sps.length; j++) {
          let sp = sps[j];
          arr.push(sp.textContent);
        }

        let text = "";
        for (let i = 0; i < arr.length; i++) {
          text += arr[i] + "\n";
        }

        this.text = text;
        
      }
    }
  }
};
</script>