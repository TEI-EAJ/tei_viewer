<template>
  <v-card class="ma-2" style="overflow: auto; height: 100%">
    <v-toolbar class="headline grey lighten-2" flat>
      <v-toolbar-title>発話内容</v-toolbar-title>
    </v-toolbar>

    <template v-if="arr.length > 0">
      <v-card-title>「{{ id }}」の発話（{{ arr.length }}件）</v-card-title>

      <v-card-text>
        <v-btn v-if="false" @click="flg = !flg">
          <template v-if="flg">ワードクラウドを隠す</template>
          <template v-else>ワードクラウドを表示</template>
        </v-btn>

        <v-card v-show="flg" outlined class="mt-2">
          <v-card-text>
            <Wordcloud :text="text"></Wordcloud>
          </v-card-text>
        </v-card>

        <ol class="mt-5">
          <li v-for="(value, key) in arr" :key="key">{{ value }}</li>
        </ol>
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
import Wordcloud from '../../components/common/Wordcloud.vue'
export default {
  components: {
    Wordcloud,
  },
  props: ['xml', 'props'],
  data() {
    return {
      flg: false,
      arr: [],
      id: null,
      text: '',
    }
  },
  watch: {
    props() {
      this.main()
    },
    xml() {
      this.init()
    },
  },
  mounted() {
    this.init()
    this.main()
  },
  methods: {
    init() {},
    main() {
      this.arr = []
      this.id = null

      const attrs = ['corresp', 'ref', 'sameAs']

      // 選択語
      const obj = this.props.e

      let id = null

      // 戯曲の場合
      if (obj && obj.name == 'speaker') {
        // ---- ここまで ----
        const xml = this.xml
        const sps = xml.querySelectorAll('speaker')
        for (let i = 0; i < sps.length; i++) {
          const sp = sps[i]
          if (sp.textContent == obj.elements[0].text) {
            id = sp.parentElement.attributes.who.value.replace('#', '')
            break
          }
        }
      } else if (obj && obj.attributes) {
        for (let i = 0; i < attrs.length; i++) {
          const attr = attrs[i]
          if (obj.attributes[attr]) {
            id = obj.attributes[attr].replace('#', '')
          }
        }
      }

      if (id != null) {
        this.id = id

        // ---- ここまで ----
        const xml = this.xml

        if (xml) {
          const body = xml.querySelector('body')
          // let persNames = [];
          let sps = body.querySelectorAll('sp')
          const arr = []
          for (let j = 0; j < sps.length; j++) {
            const sp = sps[j]
            if (!sp.attributes || !sp.attributes.who) {
              continue
            }
            if (sp.attributes.who.value.replace('#', '') == id) {
              const ps = sp.querySelectorAll('p')
              let text = ''
              for (let k = 0; k < ps.length; k++) {
                text += ps[k].textContent
              }
              arr.push(text)
            }
          }

          sps = body.querySelectorAll('said')
          for (let j = 0; j < sps.length; j++) {
            const sp = sps[j]
            if (
              sp.attributes.who &&
              sp.attributes.who.value.replace('#', '') == id
            ) {
              arr.push(sp.textContent)
            }
          }

          this.arr = arr

          let text = ''
          for (let i = 0; i < arr.length; i++) {
            text += arr[i] + '\n'
          }

          this.text = text
        }
      }
    },
  },
}
</script>
