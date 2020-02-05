import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Index_bk from '../views/Index_bk.vue'
import Test from '../components/common/Wordcloud.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/index_bk',
    name: 'index_bk',
    component: Index_bk
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  }
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
})

export default router
