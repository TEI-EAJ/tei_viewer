<template>
  <v-card style="overflow: auto; height: 100%">
    <v-toolbar class="headline grey lighten-2" flat>
      <v-toolbar-title>発話者別の呼称の可視化</v-toolbar-title>
    </v-toolbar>

    <v-card>
      <v-card-text>
        <template v-if="Object.keys(result).length == 0">
          <div class="text-center pa-5">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </template>

        <template v-else>
          <v-row>
            <v-col>
              <v-select
                v-model="target"
                :items="items"
                label="発話者"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="target2"
                :items="items"
                label="対象者"
              ></v-select>
            </v-col>
          </v-row>

          <br />
          <pie
            style="height: 300px"
            :data="data4pie"
            :options="options4pie"
            class="mb-4"
          ></pie>

          <br />
          <br />
          <chart
            style="height: 300px"
            :data="data"
            :options="options"
            class="mb-4"
          ></chart>
        </template>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import Chart from '../../components/Called/Chart.vue'
import Pie from '../../components/Called/Pie.vue'
export default {
  components: { Chart, Pie },
  props: ['xml', 'props'],
  data() {
    return {
      data: {},
      options: {},

      data4pie: {},
      options4pie: {},

      items: [],
      target: null,
      target2: null,

      result: {},
    }
  },
  watch: {
    target() {
      this.main()
    },
    target2() {
      this.main()
    },
    xml() {
      this.init()
    },
    props() {
      this.init()
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    main() {
      const target = this.target
      const target2 = this.target2

      if (target == null || target2 == null) {
        return
      }

      const labels4pie = []

      const result = this.result

      const objBySp = {}

      for (const head in result) {
        const ch = result[head]

        for (const org in ch) {
          if (org !== target) {
            continue
          }

          if (!objBySp[org]) {
            objBySp[org] = {}
          }

          const org_obj = ch[org]

          for (const dest in org_obj) {
            if (dest !== target2) {
              continue
            }

            if (!objBySp[org][dest]) {
              objBySp[org][dest] = {}
            }

            const dest_obj = org_obj[dest]
            for (const e in dest_obj) {
              const count = dest_obj[e]

              if (!objBySp[org][dest][e]) {
                objBySp[org][dest][e] = 0
              }

              objBySp[org][dest][e] += count
            }
          }
        }
      }

      const colors = {}

      const datasets4pie = []
      for (const org in objBySp) {
        for (const dest in objBySp[org]) {
          const data = []
          const backgroundColor = []

          const objByOrgByDest = objBySp[org][dest]

          const arr = Object.keys(objByOrgByDest).map((e) => ({
            key: e,
            value: objByOrgByDest[e],
          }))

          arr.sort(function (a, b) {
            if (a.value < b.value) return 1
            if (a.value > b.value) return -1
            return 0
          })

          for (let i = 0; i < arr.length; i++) {
            const obj = arr[i]
            const label = obj.key
            const value = obj.value

            labels4pie.push(label)
            const randomColor =
              '#' + Math.floor(Math.random() * 16777215).toString(16)
            data.push(value)
            backgroundColor.push(randomColor)

            colors[label] = randomColor
          }

          datasets4pie.push({
            data,
            backgroundColor,
          })
        }
      }

      const data4pie = {
        labels: labels4pie,
        datasets: datasets4pie,
      }

      const options4pie = {
        responsive: true,
        maintainAspectRatio: false,
      }

      this.data4pie = data4pie
      this.options4pie = options4pie

      // --------------------

      const labels = []

      // legendの取得
      const vectors = labels4pie
      for (const head in result) {
        labels.push(head)
      }

      // ベクトルの初期化
      const dt = {}
      for (let i = 0; i < vectors.length; i++) {
        const size = Object.keys(result).length
        dt[vectors[i]] = Array(size)
        for (let j = 0; j < size; j++) {
          dt[vectors[i]][j] = 0
        }
      }

      // 値の登録
      let i = 0
      for (const head in result) {
        const ch = result[head]

        if (!ch[target]) {
          i += 1
          continue
        }
        const obj = ch[target][target2]

        for (const label in obj) {
          dt[label][i] = obj[label]
        }

        i += 1
      }

      const datasets = []
      for (const label in dt) {
        datasets.push({
          label,
          data: dt[label],
          backgroundColor: colors[label],
        })
      }

      const data = {
        labels,
        datasets,
      }

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }

      this.data = data
      this.options = options
    },
    execDiv(div) {
      const map = {}

      const sps = div.querySelectorAll('speaker')
      for (let i = 0; i < sps.length; i++) {
        const sp = sps[i]
        const parent = sp.parentElement
        if (!parent.attributes.who) {
          continue
        }

        const sp_id = parent.attributes.who.value.replace('#', '')

        if (!this.items.includes(sp_id)) {
          this.items.push(sp_id)
        }

        if (!map[sp_id]) {
          map[sp_id] = {}
        }

        const tmp = map[sp_id]

        const ps = sp.parentElement.querySelectorAll('p')

        for (let k = 0; k < ps.length; k++) {
          const p = ps[k]
          const persons = p.querySelectorAll('persName')
          for (let m = 0; m < persons.length; m++) {
            const person = persons[m]

            let ref = ''
            const text = person.textContent

            if (!person.attributes) {
              continue
            }

            if (person.attributes.ref) {
              ref = person.attributes.ref.value
            } else if (person.attributes.corresp) {
              ref = person.attributes.corresp.value
            } else {
              continue
            }
            const refs = ref.split(' ')
            for (let n = 0; n < refs.length; n++) {
              const pid = refs[n].replace('#', '')

              if (!tmp[pid]) {
                tmp[pid] = {}
              }

              const tmp2 = tmp[pid]
              if (!tmp2[text]) {
                tmp2[text] = 0
              }

              tmp2[text] += 1
            }
          }
        }
      }

      return map
    },
    init() {
      const xml = this.xml

      if (!xml) {
        return
      }

      const result = {}

      const heads = xml.querySelector('body').querySelectorAll('head')

      if (heads.length > 0) {
        for (let i = 0; i < heads.length; i++) {
          const obj = heads[i]

          const div = obj.parentNode

          const map = this.execDiv(div)
          result[obj.textContent] = map
        }
      } else {
        const div = xml.querySelector('body')
        const map = this.execDiv(div)
        result.All = map
      }

      this.result = result
    },
  },
}
</script>
