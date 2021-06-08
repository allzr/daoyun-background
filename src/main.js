import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
//import axios from 'axios'
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
import http from './http.js';
Vue.prototype.$http = http;
// axios.defaults.baseURL ='http://192.168.0.109:8081'
// Vue.prototype.$http =axios
// axios.interceptors.request.use(config=>{
  
//     config.headers = {
//       'content-type':'application/json',
//     }
//     if(localStorage.getItem('token')){config.headers.Authorization ="JWT "+localStorage.getItem('token');}
//   return config;
// })
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
