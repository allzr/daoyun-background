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
import changePassword from '../components/changePassword.vue'
Vue.use(VueRouter)

const  Router=new VueRouter({
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
      {path:'/RoleM', component:RoleM},
    ]
    },
    {path:'/forgetPassword' ,component:forgetPassword},
    {path :'/changePassword',component:changePassword},
    {path:'/',redirect:'/login'},
 ]
})

Router.beforeEach((to,from,next)=>{
  if(to.path==='/login')return next()
  const tokenStr=window.sessionStorage.getItem('token');
  if(tokenStr == null) return next('/login');
  if(to.path==='/UserM'){
    const userMR=window.sessionStorage.getItem('userMR');
    if(userMR==null||userMR!="true") return next('/home');

  }
  if(to.path==='/ClassM'){
     const classMR=window.sessionStorage.getItem('classMR');
     if(classMR==null||classMR!="true") return next('/home');
   }
   if(to.path==='/DictionaryM'){
    const dicMM=window.sessionStorage.getItem('dicMM');
    if(dicMM==null||dicMM!="true") return next('/home');
  }
  if(to.path==='/RoleM'){
    const roleMM=window.sessionStorage.getItem('roleMM');
    if(roleMM==null||roleMM!="true") return next('/home');
  }
  if(to.path==='/ParameterM'){
    const perMM=window.sessionStorage.getItem('perMM');
    if(perMM==null||perMM!="true") return next('/home');
  }
  if(to.path==='/MenuM'){
    const menuMM=window.sessionStorage.getItem('menuMM');
    if(menuMM==null||menuMM!="true") return next('/home');
  }
  next();
})

export default Router

 