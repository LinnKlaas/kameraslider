import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'https://hal.hfg.design:10000/linnbot_control', //WICHTIG: Hier nach dem Slash den Namen eures Bots angeben (wie auf dem Pi festgelegt)
  options: {
    useConnectionNamespace: true
  }
}))

new Vue({
  render: h => h(App),
}).$mount('#app')
