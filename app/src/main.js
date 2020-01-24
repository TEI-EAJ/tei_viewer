import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import Hello from './components/Hello.vue'
import { Splitpanes, Pane } from "splitpanes";

Vue.config.productionTip = false

Vue.component("Hello", Hello);
Vue.component("Splitpanes", Splitpanes);
Vue.component("Pane", Pane);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
