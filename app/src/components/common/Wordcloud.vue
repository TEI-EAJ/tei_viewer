<template>
  <div>
    <div class="pa-5">{{status}}</div>
    <wordcloud
      :data="defaultWords"
      nameKey="name"
      valueKey="value"
      :color="myColors"
      :showTooltip="true"
      :wordClick="wordClickHandler"
    ></wordcloud>
  </div>
</template>

 <script>
import kuromoji from "kuromoji";
import wordcloud from "vue-wordcloud";
export default {
  components: {
    wordcloud
  },
  props: ["text"],
  name: "Wordcloud",
  data() {
    return {
      status: "",
      builder: kuromoji.builder({ dicPath: "/dict" }),
      myColors: ["#1f77b4", "#629fc9", "#94bedb", "#c9e0ef"],
      defaultWords: [],
      tmp: ""
      //text: ""
    };
  },
  watch: {
    text: function() {
      this.conv();
    }
  },
  mounted() {
    if (!this.text) {
      this.text = "テキストを入力してください。";
    }
    this.conv();
  },
  methods: {
    wordClickHandler(name, value, vm) {
      this.tmp = value + vm;
    },
    conv: async function() {
      this.status = this.text.length + "文字のテキストを処理中。";
      let text = this.text;
      let size = text.length;
      if (size > 10000) {
        text = text.substr(0, 10000);
        this.status =
          "文字が多いため、はじめの10000文字（" +
          size +
          "文字中）のテキストを処理中。";
      }
      //console.log(text)
      this.defaultWords = [];
      var vm = this;
      this.builder.build(
        await function(err, tokenizer) {
          if (err) {
            throw err;
          } else {
            var token = tokenizer.tokenize(text);

            let map = {};
            for (let i = 0; i < token.length; i++) {
              let obj = token[i];

              if (obj.pos != "名詞" || obj.pos_detail_1 === "非自立") {
                continue;
              }

              let text = obj.surface_form;
              if (!map[text]) {
                map[text] = 0;
              }
              map[text] += 1;
            }

            let defaultWords = [];
            for (let key in map) {
              defaultWords.push({
                name: key,
                value: map[key]
              });
            }
            vm.defaultWords = defaultWords;
            vm.status = "";
          }
        }
      );
    }
  }
};
</script>