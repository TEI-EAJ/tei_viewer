<template>
  <div class="mt-2">
    <template v-if="defaultWords.length == 0">
      <div>
        <v-btn color="primary" @click="conv()">実行</v-btn>
        <p class="mt-5">{{status}}</p>
      </div>
    </template>
    <template v-else>
      <wordcloud
        :data="defaultWords"
        nameKey="name"
        valueKey="value"
        :color="myColors"
        :showTooltip="true"
        :wordClick="wordClickHandler"
      ></wordcloud>

      <v-card outlined>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          dense
          :headers="headers"
          :items="defaultWords"
          :search="search"
        ></v-data-table>
      </v-card>
    </template>
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
      builder: kuromoji.builder({ dicPath: "dict" }),
      myColors: ["#1f77b4", "#629fc9", "#94bedb", "#c9e0ef"],
      defaultWords: [],
      tmp: "",

      search: '',
        headers: [
          { text: '形態素', value: 'name' },
          { text: '出現回数', value: 'value' }
        ],
        desserts: this.defaultWords
    };
  },

  watch: {
    text: function() {
      this.defaultWords = [];
    }
  },
  methods: {
    wordClickHandler(name, value, vm) {
      this.tmp = value + vm;
    },
    conv: async function() {
      let text = this.text;
      let size = text.length;
      let max = 100000;
      let status = this.text.length.toLocaleString()+"文字";

      if (size > max) {
        text = text.substr(0, max);
        status =
          "文字が多いため、はじめの" +
          max.toLocaleString() +
          "文字（" +
          size.toLocaleString() +
          "文字中）";
      }

      status += "のテキストを処理中。"

      this.status = status;

      var vm = this;
      this.builder.build(
        await function(err, tokenizer) {
          if (err) {
            vm.status = "";
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