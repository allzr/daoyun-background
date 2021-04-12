<template>
    <div class="login_container">
        <div class="login_box">
            <!--头像区域 -->
            <div class="avatar_box">
                <img src="../assets/cloud2.jpg">
            </div>
            <!--表单区域 -->
            <el-form :model="loginForm" ref="loginFormRef"  :rules="loginFormRules" label-width="30%" class="login_form">
                <!--旧户名-->
                <el-form-item prop="password" label="旧密码"> 
                    <el-input v-model="loginForm.password" type="password"  prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <!-- 新密码-->
                <el-form-item prop="password" label="新密码"> 
                    <el-input v-model="loginForm.password" type="password"  prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item class="btns" label="">
                    <el-button type="primary" @click="login">确认修改</el-button>
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
                username:[{ required: true, message: '请输入旧密码', trigger: 'blur' },{ min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' }],
                password:[{ required: true, message: '请输入新密码', trigger: 'blur' },{ min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' }]
            }
        }
        
    },
    methods: {
        login(){
            this.$refs.loginFormRef.validate(valid=>{
                //需后期导入数据库
                if(!valid)return this.$message.error('修改失败');
                this.$message.success('修改成功');
                this.$router.push("/");
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
    width: 90%;
    padding: 0 20px;
    box-sizing: border-box;
    //transform: translate(20%);
}
.btns{
    display: flex;
    justify-content:center;
}
}
</style>