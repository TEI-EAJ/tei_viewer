<template>
  <span>
    <template v-for="(obj, key) in elements">
      <template v-if="obj.text">
        <span :key="key">{{obj.text}}</span>
      </template>
      <template
        v-else-if="obj.name == 'p' || 
        obj.name == 'head' || 
        obj.name == 'ab' || 
        obj.name == 'list' || 
        //obj.name == 'listPerson' || 
        obj.name == 'item' || 
        obj.name == 'resp' || 
        obj.name == 'person'"
      >
        <span :class="'tei-'+obj.name" class="my-5" :key="key">
          <MainText
            v-on:parentMessage="messageLog"
            :key="key"
            v-if="obj.elements"
            :elements="obj.elements"
            :parent="obj.name"
          ></MainText>
        </span>
      </template>
      <template v-else-if="obj.name == 'time' || obj.name == 'note'">
        <v-tooltip bottom :key="key">
          <template v-slot:activator="{ on }">
            <span v-on="on" :style="style(obj.name)">
              <MainText :key="key" v-if="obj.elements" :elements="obj.elements" :parent="obj.name"></MainText>
            </span>
          </template>
          <span>{{obj.attributes}}</span>
        </v-tooltip>
      </template>
      <template v-else-if="obj.name == 'teiHeader'">
        <v-sheet :key="key" class="pa-5 ma-5" color="grey lighten-3">
          <MainText
            v-on:parentMessage="messageLog"
            :key="key"
            v-if="obj.elements"
            :elements="obj.elements"
            :parent="obj.name"
          ></MainText>
        </v-sheet>
      </template>
      <template v-else-if="obj.name == 'title'">
        <h2 :key="key" class="my-5">
          <MainText
            v-on:parentMessage="messageLog"
            :key="key"
            v-if="obj.elements"
            :elements="obj.elements"
            :parent="obj.name"
          ></MainText>
        </h2>
      </template>
      <template
        v-else-if="(obj.name == 'eaj:ruby') || (obj.attributes && obj.attributes.type == 'ruby')"
      >
        <ruby :key="key">
          <MainText :elements="obj.elements[0].elements"></MainText>
          <rt>{{obj.elements[2].elements[0].text}}</rt>
        </ruby>
      </template>
      <template
        v-else-if="obj.name == 'persName' || 
        obj.name == 'placeName' || 
        obj.name == 'name' || 
        obj.name == 'rs' ||
        obj.name == 'speaker' || 
        obj.name == 'bibl' ||
        obj.name == 'date'
        "
      >
        <v-tooltip bottom :key="key">
          <template v-slot:activator="{ on }">
            <span
              v-on="obj.attributes ? on : null"
              :class="'tei-'+obj.name"
              :key="key"
              :style="parent != 'person' && parent != 'respStmt' ? style(obj.name) : 'margin-right : 10px; margin-left : 10px;'"
              @click="parent != 'person' && parent != 'respStmt' ? $emit('parentMessage', obj) : ''"
              :id="obj.id"
            >
              <MainText
                v-on:parentMessage="messageLog"
                :key="key"
                v-if="obj.elements"
                :elements="obj.elements"
                :parent="obj.name"
              ></MainText>
            </span>
          </template>
          <span>{{obj.attributes}}</span>
        </v-tooltip>
      </template>

      <!-- 青空自動TEI用 -->
      <template v-else-if="obj.name == 'seg' && obj.attributes && obj.attributes.rendition">
          <span :class="'tei-'+obj.attributes.rendition" :style="obj.attributes.style" :key="key">
            <MainText
              v-on:parentMessage="messageLog"
              :key="key"
              v-if="obj.elements"
              :elements="obj.elements"
              :parent="obj.name"
            ></MainText>
          </span>
      </template>

      <template v-else-if="obj.name != 'figure' && obj.name != 'listPerson'">
        <span :class="'tei-'+obj.name" :key="key" :id="obj.attributes ? obj.attributes['xml:id'] : null">
          <span
            v-if="obj.attributes && obj.attributes.facs && obj.attributes.facs.startsWith('#')"
            @click="$emit('parentMessage', obj)"
          >
            <i class="fas fa-camera primary--text"></i>
          </span>
          <MainText
            v-on:parentMessage="messageLog"
            :key="key"
            v-if="obj.elements"
            :elements="obj.elements"
            :parent="obj.name"
          ></MainText>
        </span>
      </template>
    </template>
  </span>
</template>

<script>
import { uuid } from "vue-uuid";

export default {
  name: "MainText",
  props: ["elements", "flg", "parent"],
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  /*
  watch: {
    elements: function() {
      this.init();
    }
  },
  */
  methods: {
    init() {
      let elements = this.elements;
      if (elements != null) {
        for (let i = 0; i < elements.length; i++) {
          let obj = elements[i];
          obj.id = uuid.v1();
        }
      }
    },
    messageLog(dat) {
      this.$emit("parentMessage", dat);
    },
    style(dat) {
      let color = "0,0,255"; //blue
      if (dat == "persName" || dat == "rs") {
        color = "0,255,0"; //green
      } else if (dat == "placeName") {
        color = "255,0,0"; //red
      } else if (dat == "date") {
        color = "255,165,0"; //
      } else if (dat == "bibl") {
        color = "128,0,128"; //
      } else if (dat == "time") {
        color = "128,165,0"; //
      }
      return "background-color : rgba(" + color + ", 0.2);";
    }
  }
};
</script>