<template>
  <div>
    <v-app-bar>
      <v-toolbar-title>TEI Multi Viewer</v-toolbar-title>
      <v-spacer></v-spacer>

      <template v-if="start">
        <v-menu left bottom v-if="hash">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="scroll();">
              <v-icon>mdi-link</v-icon>
            </v-btn>
          </template>
        </v-menu>
      
      <v-tooltip bottom v-if="u">
        <template v-slot:activator="{ on }">
          <v-btn icon target="_blank" v-on="on" :href="u">
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </template>
        <span>{{"TEI/XMLファイルをダウンロード"}}</span>
      </v-tooltip>
       

      <v-tooltip bottom v-if="u">
        <template v-slot:activator="{ on }">
          <v-btn icon target="_blank" @click="snackbar = true; copyLink();" v-on="on"> <!-- :href="exportLink" -->
            <v-icon>mdi-link</v-icon>
          </v-btn>
        </template>
        <span>{{"現在の表示レイアウトのリンクをコピー"}}</span>
      </v-tooltip>

      <v-snackbar
        v-model="snackbar"
        :timeout="2000"
      >
        {{"リンクをコピーしました"}}
        <template v-slot:action="{ attrs }">
          <v-btn
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            {{"閉じる"}}
          </v-btn>
        </template>
      </v-snackbar>
        

        <!-- 
        <v-menu left bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="dialog_information = !dialog_information;">
              <v-icon>mdi-information</v-icon>
            </v-btn>
          </template>
        </v-menu>
        -->

        
        <v-menu left bottom>
          <template v-slot:activator="{ on }">
            <v-tooltip bottom v-on="on" >
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click="dialog_config = !dialog_config;">
                  <i class="fas fa-cog"></i>
                </v-btn>
              </template>
              <span>表示設定</span>
            </v-tooltip>
          </template>
        </v-menu>

        <v-menu left bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              @click="dialog_component = value; dialog = !dialog;"
              v-for="(value, key) in map"
              :key="key"
            >
              <v-list-item-content>
                <v-list-item-title>{{key}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn icon href="./">
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <div v-show="!start">
      <v-container class="my-5">
        <h2 class="mb-5">TEI Multi Viewer</h2>



        <p>TEI/XMLファイルを選択してください。</p>
        <input type="file" id="files" @change="handleFileSelect" multiple />

        <!-- 

        <hr class="my-5" />

        <p>TEI/XMLファイルのURLを入力してください。</p>



        <hr class="my-5" />

        -->

        <output id="list" class="mt-5"></output>

        <br />
        <br />
        <br />

        <p class="mt-5">例１：走れメロス</p>

        <v-btn
          color="primary"
          to="/?u=https://www.dhii.jp/nagasaki/dazai_all_20191012.xml"
          class="mx-2 my-1"
        >可視化例を見る</v-btn>
        <v-btn
          href="https://www.dhii.jp/nagasaki/dazai_all_20191012.xml"
          target="_blank"
          class="mx-2 my-1"
        >サンプルデータを見る</v-btn>

        <br />
        <br />

        <p class="mt-5">例２：芥川龍之介 三つの宝</p>

        <v-btn
          color="primary"
          to="/?u=https://raw.githubusercontent.com/TEI-EAJ/aozora_tei/master/data/complete/tei_lib_lv3/1126_tei.xml"
          class="mx-2 my-1"
        >可視化例を見る</v-btn>
        <v-btn
          href="https://raw.githubusercontent.com/TEI-EAJ/aozora_tei/master/data/complete/tei_lib_lv3/1126_tei.xml"
          target="_blank"
          class="mx-2 my-1"
        >サンプルデータを見る</v-btn>

        <br />
        <br />

        <p class="mt-5">例３：芥川龍之介 二人小町</p>

        <v-btn
          color="primary"
          to="/?u=https://raw.githubusercontent.com/TEI-EAJ/aozora_tei/master/data/complete/tei_lib_lv3/86_tei.xml"
          class="mx-2 my-1"
        >可視化例を見る</v-btn>
        <v-btn
          href="https://raw.githubusercontent.com/TEI-EAJ/aozora_tei/master/data/complete/tei_lib_lv3/86_tei.xml"
          target="_blank"
          class="mx-2 my-1"
        >サンプルデータを見る</v-btn>

        <br />
        <br />

        <p class="mt-5">
          例４：Emily Dickinson ‘Faith is a fine invention’ from
          <a
            href="http://v-machine.org/samples/"
          >Versioning Machine</a>
        </p>

        <v-btn
          color="primary"
          to="/?u=https://tei-eaj.github.io/koui/data/faith.xml"
          class="mx-2 my-1"
        >可視化例を見る</v-btn>
        <v-btn
          href="http://v-machine.org/samples/faith.xml"
          target="_blank"
          class="mx-2 my-1"
        >サンプルデータを見る</v-btn>
      </v-container>

      <br />

      <v-footer :dark="true" :inset="true" class="mt-5">
        <v-container>
          <p class="text-center my-5">TEI-C東アジア/日本語分科会</p>
        </v-container>
      </v-footer>
    </div>

    <div :style="'height : '+height+'px'" v-if="start">
      <splitpanes class="default-theme" @resize="resize1($event)">
        <pane v-for="(obj, key) in area" :key="key" :size="obj.w">
          <splitpanes
            class="default-theme"
            horizontal="horizontal"
            @resize="obj.h = Math.ceil($event[0].size)"
          >
            <pane :size="obj.h">
              <template v-if="obj.c1 == 'MainText'">
                <v-card class="ma-2 pa-0" :class="vertical ? 'scroll vertical' : ''" style="height:99%;" id="mainTextDiv">
                  <v-card-text class="text--primary">
                    <MainText v-on:parentMessage="messageLog" v-if="data" :elements="data.elements"></MainText>
                  </v-card-text>
                </v-card>
              </template>
              <template v-else>
                <component :is="obj.c1" :xml="xml" :props="props"></component>
              </template>
            </pane>
            <pane :size="100-obj.h">
              <template v-if="obj.c2 == 'MainText'">
                <v-card class="ma-2 pa-0" :class="vertical ? 'scroll vertical' : ''" style="height:99%;">
                  <v-card-text class="text--primary">
                    <MainText v-on:parentMessage="messageLog" v-if="data" :elements="data.elements"></MainText>
                  </v-card-text>
                </v-card>
              </template>
              <template v-else>
                <component :is="obj.c2" :xml="xml" :props="props"></component>
              </template>
            </pane>
          </splitpanes>
        </pane>
      </splitpanes>
    </div>

    <v-dialog v-model="dialog_information" width="80%">
      <v-card class="ma-2 pa-2" style="overflow:auto; height:100%;">
        <v-card-text class="text--primary">
          <h1 class="my-5">読み込み時のURL</h1>
          <a :href="current" target="_blank">{{current}}</a>
          <hr class="my-5" />
          <!--
          <h1 class="my-5">使用データ</h1>
          <a :href="u" v-if="u" target="_blank">{{u}}</a>
          <hr class="my-5" />
          -->
          <h1 class="my-5">設定情報</h1>
          <v-sheet class="my-5 pa-5" color="grey lighten-3">{{area}}</v-sheet>
          <v-btn class="mr-2 mb-5" color="primary" @click="export_myjson">設定情報をエクスポート</v-btn>
          <p v-if="link1">
            設定ファイルへのリンク:
            <a :href="link1" target="_blank">{{link1}}</a>
          </p>
          <p v-if="link2">
            Viewerへのリンク:
            <a :href="link2" target="_blank">{{link2}}</a>
          </p>
          <hr class="my-5" />
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" width="80%">
      <component :is="dialog_component" :xml="xml" :props="props"></component>
    </v-dialog>

    <v-dialog v-model="dialog_config" width="80%">
      <v-card class="pa-2" style="overflow-y:auto; height:100%;">
        <v-card-text class="text--primary">
          <br />
          <h1>表示設定</h1>
          <br />
          <div v-for="(obj, key) in area" :key="key">
            <v-select v-model="obj.c1" :items="items" :label="(key + 1)+'-1'"></v-select>

            <br />

            <v-select v-model="obj.c2" :items="items" :label="(key + 1)+'-2'"></v-select>

            <br />
          </div>
          <v-btn class="mr-2" @click="dialog_config = !dialog_config;" color="primary">閉じる</v-btn>
          <v-btn @click="conf(); dialog_config = !dialog_config;" color="primary">レイアウトを調整して閉じる</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Wiki from "../components/Wiki/Index.vue";
import Map from "../components/Map/Index.vue";
import Link from "../components/Link/Index.vue";
import MIMA from "../components/MIMA/Index.vue";

import Person from "../components/Person/Index.vue";
import Place from "../components/Place/Index.vue";
import Bibl from "../components/Bibl/Index.vue";

import Name from "../components/Name/Index.vue";
import Sp from "../components/Sp/Index.vue";
import Graph from "../components/Graph/Index.vue";
import Pie from "../components/Pie/Index.vue";

import HelloWorld from "../components/HelloWorld/Index.vue";
import MainText from "../components/MainText/Index.vue";

import Wordcloud from "../components/Wordcloud/Index.vue";
import Timeline from "../components/Timeline/Index.vue";
import Called from "../components/Called/Index.vue";

import IIIF from "../components/IIIF/Index.vue";

var convert = require("xml-js");

export default {
  components: {
    Map,
    Wiki,
    Link,
    MIMA,

    Person,
    Place,
    Bibl,

    Name,
    Sp,
    Graph,
    Pie,
    HelloWorld,
    MainText,

    Wordcloud,
    Timeline,
    Called,

    IIIF
  },
  data: () => ({
    snackbar: false,

    area: [
      { w: 25, h: 50, c1: "Person", c2: "Place" },
      { w: 50, h: 100, c1: "MainText", c2: null },
      { w: 25, h: 50, c1: "Name", c2: "Sp" }
    ],

    dialog_component: null,

    u: null,
    config: null,
    dialog_config: false,
    dialog_information: false,

    link1: null,
    link2: null,

    width: window.innerWidth,
    height: window.innerHeight,

    //config
    start: false,
    dialog: false,
    drawer: false,

    //パラメータ
    data: null,
    xml: null,
    e: null,

    items: [
      {
        value: null,
        text: ""
      },

      {
        value: "Person",
        text: "人物"
      },
      {
        value: "Place",
        text: "場所"
      },
      {
        value: "Bibl",
        text: "書誌項目引用"
      },

      {
        value: "Map",
        text: "地図"
      },
      {
        value: "MainText",
        text: "本文"
      },
      {
        value: "Link",
        text: "外部サイト"
      },
      {
        value: "Wiki",
        text: "Wikipedia"
      },
      {
        value: "Name",
        text: "呼称"
      },
      {
        value: "HelloWorld",
        text: "HelloWorld"
      },
      {
        value: "Sp",
        text: "発話内容"
      },
      {
        value: "MIMA",
        text: "関連コンテンツ"
      },
      {
        value: "IIIF",
        text: "Mirador"
      },
      {
        value: "Wordcloud",
        text: "ワードクラウド",
        type: "all"
      },
      {
        value: "Graph",
        text: "固有表現の出現頻度",
        type: "all"
      },
      {
        value: "Pie",
        text: "呼称割合の可視化",
        type: "all"
      },
      {
        value: "Timeline",
        text: "チャプター毎の呼称の可視化",
        type: "all"
      },
      {
        value: "Called",
        text: "発話者別の呼称の可視化",
        type: "all"
      }
    ],
    map: {},
    vertical: false,

    hash: null,
  }),
  mounted() {
    window.addEventListener("resize", this.handleResize);

    let items = this.items;
    for (let i = 0; i < items.length; i++) {
      let obj = items[i];
      if (obj.type !== "all") {
        continue;
      }
      this.map[obj.text] = obj.value;
    }

    if (this.$route.query.textDirection == "vertical") {
      this.vertical = true
    }

    //areaが優先
    if (this.$route.query.area) {
      this.area = JSON.parse(this.$route.query.area);
    } else if (this.$route.query.feature) {
      let feature = this.$route.query.feature;
      if(feature == "i"){
        this.area = [
          { w: 0, h: 0, c1: null, c2: null },
          { w: 50, h: 100, c1: "MainText", c2: null },
          { w: 50, h: 100, c1: "IIIF", c2: null }
        ]
      }
    } else if (this.$route.query.config) {
      let config = this.$route.query.config;
      this.config = config;
      axios
        .get(config, {
          //responseType: "document"
        })
        .then(response => {
          this.area = response.data;
        });
    }

    this.hash = this.$route.hash

    if (this.$route.query.c) {
      this.dialog_component = this.$route.query.c;
      this.dialog = true;
    }
    this.init();
  },
  watch: {
    //URLが変わった場合に更新
    $route(val, oldVal) {
      if (val.query.u != oldVal.query.u && val.query.u != null) {
        this.$router.go({
          path: this.$router.currentRoute.path,
          force: true
        });
      }
    },
    xml() {
      this.handleXml();
    },
    config() {
      this.handleXml();
    },
    area: {
      handler: function() {
        let param = {
          u: this.u,
          textDirection: this.vertical ? "vertical" : null,
          //area: JSON.stringify(this.area)
          feature: this.$route.query.feature
        };
        if (this.config) {
          param.config = this.config;
        }
        this.$router.replace(
          { path: "/", query: param },
          () => {},
          () => {}
        );
      },
      deep: true
    }
  },
  computed: {
    props: function() {
      return {
        e: this.e
      };
    },
    current: function() {
      return decodeURIComponent(window.location.href);
    },
    exportLink: function() {
      return window.location.href + "&area="+JSON.stringify(this.area)
    },
  },
  methods: {
    scroll(){
      this.$SmoothScroll(document.querySelector(this.hash).getBoundingClientRect()
              .top - (64 + 7), 400, null, document.querySelector("#mainTextDiv"), 'y')
    },
    export_myjson() {
      /*
      axios.post("https://api.myjson.com/bins", this.area).then(response => {
        //window.open(response.data.uri, '_blank');
        this.link1 = response.data.uri;
        this.link2 =
          window.location.origin +
          window.location.pathname +
          "#/?u=" +
          this.u +
          "&config=" +
          this.link1;
      });
      */
      /*
      $.ajax({
        url: ,
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result, textStatus, jqXHR) {
          uri = result.uri
        }
      })
      */
    },
    conf: function() {
      let area = this.area;
      let cell_exist_flgs = [];
      for (let i = 0; i < area.length; i++) {
        let obj = area[i];
        let c1 = obj.c1;
        let c2 = obj.c2;

        let cell_exist_flg = 1;

        if (c1 != null && c2 == null) {
          obj.h = 100;
        } else if (c1 == null && c2 != null) {
          obj.h = 0;
        } else if (c1 == null && c2 == null) {
          cell_exist_flg = 0;
        } else {
          obj.h = 50;
        }
        cell_exist_flgs.push(cell_exist_flg);
      }

      var sum = function(arr) {
        return arr.reduce(function(prev, current) {
          return prev + current;
        });
      };

      let cell_size = sum(cell_exist_flgs);

      for (let i = 0; i < area.length; i++) {
        let w = cell_exist_flgs[i] == 1 ? Math.ceil(100 / cell_size) : 0;
        area[i].w = w;
      }
    },
    resize1: function(event) {
      let area = this.area;
      for (let i = 0; i < area.length; i++) {
        let obj = area[i];
        obj.w = Math.ceil(event[i].size);
      }
    },
    handleResize: function() {
      // resizeのたびにこいつが発火するので、ここでやりたいことをやる
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
    handleFileSelect(evt) {
      var files = evt.target.files; // FileList object

      for (var i = 0; i < files.length; i++) {
        let f = files[i];
        var reader = new FileReader();
        reader.readAsText(f);

        var vm = this;
        reader.onload = function() {
          var dpObj = new DOMParser();
          let xmlDoc = dpObj.parseFromString(reader.result, "text/xml");
          vm.xml = xmlDoc;
        };
      }
    },
    handleXml() {
      let xml_node = this.xml;

      //xmlの読み込みのために必須
      let xml_str = new XMLSerializer().serializeToString(xml_node);
      var result = convert.xml2json(xml_str, { compact: false, spaces: 4 });
      this.data = JSON.parse(result);
      this.start = true;
    },
    async init() {
      let u = this.$route.query.u == null ? null : this.$route.query.u; //"01_with_wit.xml"
      this.u = u;

      if (!u) {
        this.start = false;
        return;
      }

      /*
      if (u.indexOf("bbp") != -1) {
        this.components = {
          c1: "Wiki",
          c2: "Map",
          c3: "MIMA",
          c4: "Link",
          c: "Graph"
        };
      }
      */

      await axios
        .get(u, {
          //responseType: "document"
        })
        .then(response => {
          let xml_node = response.data;
          if (typeof xml_node == "string") {
            var dpObj = new DOMParser();
            xml_node = dpObj.parseFromString(xml_node, "text/xml");
          }
          this.xml = xml_node;
        });

      this.$SmoothScroll(
        0,
        0,
        null,
        document.querySelector("#MainText"),
        "x"
      );
    },
    messageLog(message) {
      this.e = message;
    },
    size(a, b) {
      if (a != null && b != null) {
        return 50;
      } else if (a != null && b == null) {
        return 100;
      } else {
        return 0;
      }
    },
    copyLink(){
      const str = this.exportLink

      const listener = function (e) {
        e.clipboardData.setData('text/plain', str)
        // 本来のイベントをキャンセル
        e.preventDefault()
        // 終わったら一応削除
        document.removeEventListener('copy', listener)
      }

      // コピーのイベントが発生したときに、クリップボードに書き込むようにしておく
      document.addEventListener('copy', listener)

      // コピー
      document.execCommand('copy')
      // alert('Copied.')
    }
  }
};
</script>

<style>
.scroll {
  height: 100%;
  overflow-y: auto;
}

.vertical {
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;
}
</style>
