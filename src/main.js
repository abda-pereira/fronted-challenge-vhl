import Vue from 'vue'
import ShardsVue from 'shards-vue'

// Styles
import 'bootstrap/dist/css/bootstrap.css'
import 'shards-ui/dist/css/shards.css'
import "vue-context/dist/css/vue-context.css";
import './scss/app.scss';


// Core
import App from './App.vue'


Vue.use(ShardsVue);

Vue.config.productionTip = false

var shared = new Vue({data:{ showIconMenu: true }})

shared.install = function(){
  Object.defineProperty(Vue.prototype, '$globalStuff', {
    get () { return shared }
  })
}
Vue.use(shared);

new Vue({
  render: h => h(App),
}).$mount('#app')
