<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  name: "chart",
  props: ["data", "options"],
  watch: {
    data: function() {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.renderChart(this.data, this.options);
    }
  }
};
</script>