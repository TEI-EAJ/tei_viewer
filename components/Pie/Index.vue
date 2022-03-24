<template>
  <v-card style="overflow: auto; height: 100%">
    <v-toolbar class="headline grey lighten-2" flat>
      <v-toolbar-title>呼称割合の可視化</v-toolbar-title>
    </v-toolbar>

    <v-card>
      <v-card-text>
        <sunburst
          :data="data"
          color-scheme="schemePastel1"
          style="height: 600px"
          class="mt-5"
        >
          <!-- Add behaviors -->
          <breadcrumbTrail
            slot="legend"
            slot-scope="{ nodes, colorGetter, width }"
            :current="nodes.mouseOver"
            :root="nodes.root"
            :color-getter="colorGetter"
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

          <template slot-scope="{ on, actions }">
            <highlightOnHover v-bind="{ on, actions }" />
            <zoomOnClick v-bind="{ on, actions }" />
          </template>
        </sunburst>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import {
  breadcrumbTrail,
  highlightOnHover,
  sunburst,
  nodeInfoDisplayer,
  zoomOnClick,
} from 'vue-d3-sunburst'
import 'vue-d3-sunburst/dist/vue-d3-sunburst.css'

export default {
  components: {
    breadcrumbTrail,
    highlightOnHover,
    sunburst,
    zoomOnClick,
    nodeInfoDisplayer,
  },
  props: ['xml', 'props'],
  data() {
    return {
      data: {},
    }
  },
  watch: {
    props() {
      this.init()
    },
    xml() {
      this.init()
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.arr = []
      this.id = null

      const xml = this.xml

      const eles = ['persName', 'rs']
      const attrs = ['corresp', 'ref']

      if (!xml) {
        return
      }

      const map = {}

      const body = xml.querySelector('body')

      for (let l = 0; l < eles.length; l++) {
        const e = eles[l]

        for (let i = 0; i < attrs.length; i++) {
          const attr = attrs[i]
          const arr = body.querySelectorAll(e + '[' + attr + ']')
          for (let j = 0; j < arr.length; j++) {
            const obj = arr[j]
            const text = obj.textContent
            const ids = obj.attributes[attr].value.split(' ')
            for (let k = 0; k < ids.length; k++) {
              const id = ids[k].replace('#', '')
              if (!map[id]) {
                map[id] = {}
              }
              const tmp = map[id]
              if (!tmp[text]) {
                tmp[text] = 0
              }
              tmp[text] += 1
            }
          }
        }
      }

      const arr = Object.keys(map).map((e) => ({ key: e, value: map[e] }))

      arr.sort(function (a, b) {
        if (a.value < b.value) return 1
        if (a.value > b.value) return -1
        return 0
      })

      const children = []
      for (const id in map) {
        const obj = map[id]
        const children2 = []
        for (const text in obj) {
          children2.push({
            name: text,
            size: obj[text],
          })
        }
        children.push({
          name: id,
          children: children2,
        })
      }

      this.data = {
        children,
      }
    },
  },
}
</script>
