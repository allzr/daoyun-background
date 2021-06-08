<template>
<el-container class="home_container">
    <!-- 头部-->
  <el-header>
      <div>
          <img src="../assets/cloud2.jpg" alt="">
          <span>DAO云</span>
      </div>
      <i class="el-icon-user-solid" style="font-size:10px">
        <el-dropdown :hide-on-click="false">
  <span class="el-dropdown-link">
    个人中心<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item @click.native = "gotoChangePwd">修改密码</el-dropdown-item>
    <el-dropdown-item @click.native = "gotoLogin">退出登录</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
      </i>
  </el-header>
  <el-container>
    <!-- 侧边栏-->
    <el-aside width="200px">
        <el-menu background-color="#333744" text-color="#fff"
      active-text-color="#409EFF"  :router="true" :default-active="activePath">

       <el-menu-item :index="'/UserM'" @click="SaveNavState('/UserM')">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item :index="'/ClassM'" @click="SaveNavState('/ClassM')">
        <i class="el-icon-reading"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item :index="'/RoleM'" @click="SaveNavState('/RoleM')">
        <i class="el-icon-user"></i>
        <span slot="title">角色管理</span>
      </el-menu-item>
      <el-menu-item :index="'/DictionaryM'" @click="SaveNavState('/DictionaryM')">
        <i class="el-icon-s-order"></i>
        <span slot="title">字典管理</span>
      </el-menu-item>
      <el-menu-item :index="'/ParameterM'" @click="SaveNavState('/ParameterM')">
        <i class="el-icon-s-platform"></i>
        <span slot="title">系统参数</span>
      </el-menu-item>
      <el-menu-item :index="'/MenuM'" @click="SaveNavState('/MenuM')">
        <i class="el-icon-setting"></i>
        <span slot="title">菜单管理</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
    <!-- 右边主体-->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
//import Vue from "vue";

//import axios from 'axios'
export default ({
  data(){
    return{
      activePath:''
    }
  },
  created(){
    this.activePath=window.sessionStorage.getItem('activePath');
  //  请求拦截
  //   axios.interceptors.request.use(	
  //   config => {
  //   	// 在发送请求之前做些什么
  //       if (token) {// 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
  //           config.headers.Authorization = `Bearer ${ token }`;
  //       }
  //       return config;
  //   }, 
  //   error => {
  //   	// 对请求错误做些什么
  //       router.push({path: "/NotFound"});
  //       return Promise.reject(error);
	// })
  // 响应拦截
  // axios.interceptors.response.use(
  //   data => {
  //   	// 对响应数据做点什么
  //       return data;
  //   },
  //   error => {
  //   	// 对响应错误做点什么
  //       if (error.response) {
  //           switch (error.response.status) {//401的时候，如果是公众号跳登录，企业号、app给提示
  //               case 400:
  //                   Message.error({
  //                       message:"账号/密码错误",
  //                       type:"error",
  //                       duration:2000
  //                   })
  //               case 401://没有权限
  //                   router.replace(
  //                   	{path: "/Login",query: {redicet: router.currentRoute.fullPath} }
  //                   );
  //                   break;
  //           }
  //       } else {
  //           router.push({path: "/NotFound"});
  //       }
  //       return Promise.reject(error);       
	// })
  },
  methods:{
    SaveNavState(activePath){
    window.sessionStorage.setItem('activePath',activePath);
  },
  gotoChangePwd(){
      this.$router.push('/changePassword');
  },
  gotoLogin(){
    window.sessionStorage.clear();
    this.$router.push('/login');
  }
  }
})
</script>
<style lang="less" scoped>
.home_container{
    height: 100%;
}
.el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left:0;
    img{
        border-radius: 50%;
    }
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div{
        display: flex;
        align-items: center;
    }
    span{
        margin-left: 15px;
    }
}
.el-aside{
    background-color: #333744;
}
.el-main{
    background-color: #EAEDF1;
}
 .el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
