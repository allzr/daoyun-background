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

       <el-menu-item :index="'/UserM'" @click="SaveNavState('/UserM')" :disabled="userM">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item :index="'/ClassM'" @click="SaveNavState('/ClassM')" :disabled="classMM">
        <i class="el-icon-reading"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item :index="'/RoleM'" @click="SaveNavState('/RoleM')" :disabled="roleM">
        <i class="el-icon-user"></i>
        <span slot="title">角色管理</span>
      </el-menu-item>
      <el-menu-item :index="'/DictionaryM'" @click="SaveNavState('/DictionaryM')" :disabled="disM">
        <i class="el-icon-s-order"></i>
        <span slot="title">字典管理</span>
      </el-menu-item>
      <el-menu-item :index="'/ParameterM'" @click="SaveNavState('/ParameterM')" :disabled="perM">
        <i class="el-icon-s-platform"></i>
        <span slot="title">系统参数</span>
      </el-menu-item>
      <el-menu-item :index="'/MenuM'" @click="SaveNavState('/MenuM')" :disabled="menuM">
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
      userM:true,
      classMM:true,
      roleM:true,
      disM:true,
      perM:true,
      menuM:true,
      activePath:'',
    }
  },
  async created(){
    this.activePath=window.sessionStorage.getItem('activePath');
     let res = await this.$http.get("/userright/selectLoadingUserRight");
      console.log(res.data.obj);
      let roleSeting = res.data.obj;
      if(roleSeting.userManage==true){
        this.userM=false;
        window.sessionStorage.setItem("userMR","true");
        }
      else window.sessionStorage.setItem("userMR","false");
      if(roleSeting.courseManage==true){
        this.classMM=false;
        window.sessionStorage.setItem("classMR","true");
        }
      else window.sessionStorage.setItem("classMR","false");
      if(roleSeting.dicManage==true){
        this.disM=false;
        window.sessionStorage.setItem("dicMM","true");
        }
      else window.sessionStorage.setItem("dicMM","false");
      if(roleSeting.roleManage==true){
        this.roleM=false;
        window.sessionStorage.setItem("roleMM","true");
        }
      else window.sessionStorage.setItem("roleMM","false");
      if(roleSeting.systemManage==true){
        this.perM=false;
        window.sessionStorage.setItem("perMM","true");
        }
      else window.sessionStorage.setItem("perMM","false");
      if(roleSeting.manuManage==true){
        this.menuM=false;
        window.sessionStorage.setItem("menuMM","true");
        }
      else window.sessionStorage.setItem("menuMM","false");
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
