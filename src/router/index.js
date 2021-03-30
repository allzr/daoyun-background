import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import UserM from '../components/users/UserM.vue'
import ClassM from '../components/users/ClassM.vue'
import DictionaryM from '../components/users/DictionaryM.vue'
import MenuMa from '../components/users/MenuMa.vue'
import ParameterM from '../components/users/ParameterM.vue'
import RoleM from '../components/users/RoleM.vue'
import forgetPassword from '../components/forgetPassword.vue'
Vue.use(VueRouter)

export default  new VueRouter({
  routes : [
    {path:'/login', component: Login},
    {path:'/home',
    component: Home,
    children:[
      {path:'/UserM' , component:UserM},
      {path:'/DictionaryM', component:DictionaryM},
      {path:'/ClassM', component:ClassM},
      {path:'/MenuM' , component:MenuMa},
      {path:'/ParameterM' ,component:ParameterM},
      {path:'/RoleM', component:RoleM}
    ]
    },
    {path:'/',redirect:'/login'},
    {path:'/forgetPassword' ,component:forgetPassword}
 ]
})

 