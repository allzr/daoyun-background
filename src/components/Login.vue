<template>
    <div class="login_container">
        <div class="login_box">
            <!--头像区域 -->
            <div class="avatar_box">
                <img src="../assets/cloud2.jpg">
            </div>
            <!--表单区域 -->
            <el-form :model="loginForm" ref="loginFormRef"  :rules="loginFormRules" label-width="0px" class="login_form">
                <!-- 用户名-->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <!-- 密码-->
                <el-form-item prop="password"> 
                    <el-input v-model="loginForm.password" type="password"  prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item class="btns" label="">
                    <el-button class="bt" type="primary"  @click="login">登入</el-button>
                    <el-button type="info" @click="resetLoginForm">忘记密码</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            loginForm: {
                username:'ouguojie',
                password:'123456'
            },
            loginFormRules:{
                username:[{ required: true, message: '请输入账号', trigger: 'blur' },{ min: 6, max: 10, message: '账号长度在 6 到 10 个字符', trigger: 'blur' }],
                password:[{ required: true, message: '请输入密码', trigger: 'blur' },{ min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' }]
            }
        }
        
    },
    methods: {
        resetLoginForm(){
            console.log(this); 
            //this.$refs.loginFormRef.resetFields();
            this.$router.push("/forgetPassword");
        },
        login(){
            this.$refs.loginFormRef.validate(valid=>{
                //需后期导入数据库
                if(!valid)return this.$message.error('登入失败');
                this.$message.success('登入成功');
                this.$router.push("/home");
            });
        }
    }
}
</script>
<style lang='less' scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    width: 450px;
    height:300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    .avatar_box{
        height:130px;
        width:130px;
        border:1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position:absolute;
        left:50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        img {
            width:100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
.login_form{
    position:absolute;
    bottom:0;
    width: 70%;
    padding: 0 20px;
    box-sizing: border-box;
    transform: translate(20%);
}
.btns{
    display: flex;
    justify-content:center;
    button{
        width: 100px;
    }
}
}
</style>
