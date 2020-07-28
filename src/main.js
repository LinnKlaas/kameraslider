import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import Vuex from 'vuex';
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
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    currentQueue: [],
    ownId: 'none',
    ownName: 'noname',
    clientName: 'undefined',
    currentTimer: 0,
  },
  getters: {
    amIActive: () => {
      if (store.state.currentQueue.length === 0) return false;
      return store.state.currentQueue[1][0].id === store.state.ownId;
    },
  },
});

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
