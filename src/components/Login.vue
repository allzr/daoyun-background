<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/cloud2.jpg">
            </div>
            <el-tabs type="card" :stretch="true">
                <el-tab-pane label="密码登录">
                <el-form :model="loginForm" ref="loginFormRef"  :rules="loginFormRules" label-width="0px" class="l_form" >
                <!-- 用户名-->
                    <el-form-item prop="phoneNumber">
                        <el-input v-model="loginForm.phoneNumber" prefix-icon="el-icon-user"></el-input>
                    </el-form-item>
                    <!-- 密码-->
                    <el-form-item prop="password"> 
                        <el-input v-model="loginForm.password" type="password"  prefix-icon="el-icon-lock"></el-input>
                    </el-form-item>
                    <el-form-item class="btns" label="">
                        <el-button class="bt" type="primary"  @click="login">登录</el-button>
                        <el-button type="info" @click="resetLoginForm">忘记密码</el-button>
                    </el-form-item>
                </el-form>
                </el-tab-pane>
                <!--短信登录 -->
                <el-tab-pane label="短信登录">
                <el-form :model="loginbyCinForm" ref="loginCFormRef"  :rules="loginByCodeInformRules" label-width="0px" class="l_form" >
                <!-- 用户名-->
                    <el-form-item prop="phoneNumber">
                        <el-input v-model="loginbyCinForm.phoneNumber" prefix-icon="el-icon-user"></el-input>
                    </el-form-item>
                    <!-- 密码-->
                    <el-form-item prop="password"> 
                        <el-col :span="12">
                        <el-input v-model="loginbyCinForm.password"  prefix-icon="el-icon-lock"></el-input>
                        </el-col>
                        <el-col :span="12">
                         <el-button @click="getCode" type="primary" :disabled="isDisabled" class="codebot" >{{buttonName}}</el-button>
                        </el-col>
                    </el-form-item>               
                    <el-form-item class="btns" label="">
                        <el-button class="bt" type="primary"  @click="loginbyCode">登录</el-button>
                    </el-form-item>
                </el-form>
                </el-tab-pane>
            </el-tabs>
            <!--表单区域 -->
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            buttonName: "发送短信",
            isDisabled: false,
            time: 60,
            loginForm: {
                phoneNumber:'',
                password:''
            },
            loginbyCinForm: {
                phoneNumber:'',
                password:''
            },
            loginByCodeInformRules:{
                phoneNumber:[{ required: true, message: '请输入手机号11位', trigger: 'blur' },
                { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' }, 
                {required: true,pattern: /^1[3456789]\d{9}$/,message: '请输入正确的手机号码',trigger: 'blur'}],
                //password:[{ required: true, message: '请输入验证码', trigger: 'blur' },{ min: +6, max: 6, message: '验证码长度6位', trigger: 'blur' }]
            },
            loginFormRules:{
                phoneNumber:[{ required: true, message: '请输入手机号11位', trigger: 'blur' },{ min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' },{required: true,pattern: /^1[3456789]\d{9}$/,message: '请输入正确的手机号码',trigger: 'blur'}],
                password:[{ required: true, message: '请输入密码', trigger: 'blur' },{ min: +6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' }]
            },
            postForm:{}
        }
        
    },
    methods: {
        resetLoginForm(){
            console.log(this); 
            this.$message.error('功能未开放');
            //this.$router.push("/forgetPassword");
        },
        getCode(){
            let me = this;
            me.isDisabled = true;

            let interval = window.setInterval(function() {
                me.buttonName = '' + me.time + '秒后重新发送';
                        --me.time;
                        if(me.time < 0) {
                            me.buttonName = "发送短信";
                            me.time = 60;
                            me.isDisabled = false;
                            window.clearInterval(interval);
                        }
                    }, 1000);
            this.$refs.loginCFormRef.validate(async valid=>{
                if(!valid)return;
                
                this.$http.post("/user/code",this.loginbyCinForm.phoneNumber);
            });
        },
        login(){
            this.$refs.loginFormRef.validate(async valid=>{
                //需后期导入数据库
                if(!valid)return;
                this.postForm.phoneNumber=this.loginForm.phoneNumber;
                this.postForm.password=this.loginForm.password;
                const {data:res} =await this.$http.post("/user/loginByPassword",this.postForm); 
                console.log(res);
                if(res.code==500){this.loginForm.password=''; return this.$message.error(res.message);}
                this.$message.success(res.message);
                //console.log(res);
                window.sessionStorage.setItem('token',res.obj.token);
                this.$router.push("/home");
            });
        },
        loginbyCode(){
            this.$refs.loginCFormRef.validate(async valid=>{
                //需后期导入数据库
                if(!valid)return;
                const {data:res} =await this.$http.post("/user/loginByCode",this.loginbyCinForm); 
                console.log(res);
                if(res.code==500)return this.$message.error(res.message);
                this.$message.success(res.message);
                //console.log(res);
                window.sessionStorage.setItem('token',res.obj.token);
                this.$router.push("/home");
            });
        },
          sendMsg() {
                    let me = this;
                    me.isDisabled = true;
                    let interval = window.setInterval(function() {
                        me.buttonName = '' + me.time + '秒后重新发送';
                        --me.time;
                        if(me.time < 0) {
                            me.buttonName = "发送短信";
                            me.time = 10;
                            me.isDisabled = false;
                            window.clearInterval(interval);
                        }
                    }, 1000);
 
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
        transform: translate(-50%,-80%);
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
.l_form{
    bottom:0;
    width: 70%;
    padding: 0 20px;
    box-sizing: border-box;
    transform: translate(20%,10%);
}
.codebot{
    width: 100%;
}
</style>
