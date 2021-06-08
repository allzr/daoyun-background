import axios from 'axios'
import Vue from 'vue'
const http = axios.create({
    baseURL: 'http://192.168.0.109:8081'
})
//请求拦截
http.interceptors.request.use(function (config) {
    config.headers = {
        'content-type':'application/json',
        }
    if(window.sessionStorage.getItem('token')){
        config.headers.Authorization = window.sessionStorage.getItem('token');
    }
    //console.log(config.headers)
    return config
}, function (error) {
    return Promise.reject(error)
});
//响应拦截
http.interceptors.response.use(function (response) {
    return response
}, function (error) {
    if(error.response.status == 401 || error.response.status == 402){
        Vue.prototype.$toast.fail('请重新登录')
    }
    return Promise.reject(error)
});
export default http