// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import BaiduMap from 'vue-baidu-map'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(BaiduMap, {
  ak: 'ovSXZ5CIXP6g34ai930s0u4GiIabHZ6h'
})
Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  // components: { App },
  // template: '<App/>'
  // render: h => h(App)
  render: function (h) {
    return h(App)
  }
}).$mount('#app')
