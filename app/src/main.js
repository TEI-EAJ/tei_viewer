import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import MainText from './components/MainText/Index.vue'
import { Splitpanes, Pane } from "splitpanes";

Vue.config.productionTip = false

Vue.component("MainText", MainText);
Vue.component("Splitpanes", Splitpanes);
Vue.component("Pane", Pane);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
