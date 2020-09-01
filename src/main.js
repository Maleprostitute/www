import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/iconfont.css'
import './styles/base.css'
import 'amfe-flexible'
import './utils/filters'
import './utils//global'
import './utils//request'
import './utils/vant'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
