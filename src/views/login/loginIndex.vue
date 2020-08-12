<template>
    <div class="loginContainer">
        <div class="loginBox"  >  
            <div class="loginTitle">
                <li class="line"></li>
                <span>株洲市创新服务平台</span>
                <li class="line"></li>
            </div>    
             <el-form :model="loginForm" :rules="loginRules" ref="loginRef" label-width="80px">
                <el-form-item label="账号名" prop="username">
                    <el-input v-model="loginForm.username" type="text"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" show-password></el-input>
                </el-form-item>
                <el-form-item class="remFor">
                    <el-checkbox v-model="remember" class="remBox">记住我</el-checkbox>
                    <span class="forgetBox">忘记密码?</span>
                </el-form-item>
                <el-form-item>
                    <el-button class="loginbut" type="primary" round @click="loginIn">登录</el-button> 
                </el-form-item>
            </el-form>           
        </div>
    </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
export default {
    data() {
        var validateName = (rule, value, callback) => {
            if (!value) {
            return callback(new Error('账号名不能为空'));
            } else {
                callback()
            }
        };
        var validatePass = (rule, value, callback) => {
            if (!value) {
            return callback(new Error('密码不能为空'));
            } else {
                callback()
            }
        };
        return {
            checked: false,
            loginForm: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [
                    { validator: validateName, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ]
            },
            remember: false
        }
    },
    methods: {
        loginIn() {
            this.$refs.loginRef.validate((valid) => {
            if (!valid) {
                console.log('error submit!!');
                return 
            } else {
                console.log(this.loginForm);
                this.loading = true;
                this.$store.dispatch('user/login', this.loginForm).then(() => {
                this.$router.push('dashboard')
                this.loading = false
                }).catch((err) => {
                    this.loading = false
                    console.log(err)
                })
            }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.loginContainer{
    width: 100%;
    height: 100%;
    background: url(https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4194309895,1479631024&fm=26&gp=0.jpg);
    background-size: cover;
    background-position: center;   
}
.loginBox{
    width: 450px;
    text-align: center;
    border-radius: 20px;
    padding: 30px 80px 10px 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background: rgba(255, 255,255, 0.9);
}
.line{
    display: inline-block;
    width: 50px;
    border-top: solid 2px #ccc;
    position: relative;
    top: -3px;
}
.loginTitle{
    text-align: center;
    margin-bottom: 30px;
    margin-left: 50px;
    font-weight: 600;
    letter-spacing: 0.2em;
    color: #606266;
}
.remBox{
    margin-bottom: 0;
    float: left;
}
.forgetBox{
    display: block;
    float: right;
}
.loginbut{
    width: 100%;
}
</style>