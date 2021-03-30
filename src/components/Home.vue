<template>
<el-container class="home_container">
    <!-- 头部-->
  <el-header>
      <div>
          <img src="../assets/cloud2.jpg" alt="">
          <span>DAO云</span>
      </div>
      <i class="el-icon-user-solid" style="font-size:10px">个人中心</i>
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
export default ({
  data(){
    return{
      activePath:''
    }
  },
  created(){
    this.activePath=window.sessionStorage.getItem('activePath');
  },
  methods:{
    SaveNavState(activePath){
    window.sessionStorage.setItem('activePath',activePath);
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
</style>
