<template>
    <div class="login">
        <div style="height:1500px;">
            <img src="../assets/images/images.png" alt="" class="image">
            <div class="login_w">
                <h1 class="title">登录</h1>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="账号" prop="username">
                                <el-input v-model="ruleForm.username"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="ruleForm.password" type="password"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="13">
                            <el-form-item label="验证码" prop="captcha">
                                <el-input v-model="ruleForm.captcha"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <el-form-item>
                                <span class="yzm iii">
                                    <img :src="captchaPath" @click="getCaptcha()" alt="" style="width:90px;margin-top:-20px;"> 
                                </span>
                            </el-form-item>
                        </el-col> 
                        <el-col :span="1">
                            <img class="iii" src="../assets/images/refresh.png" @click="getCaptcha()" style="width:20px;margin-top:10px;margin-left:96px;">
                        </el-col>
                    </el-row>
                    <!-- <el-row>
                        <el-col :span="20">
                            <el-form-item prop="uuid">
                                <el-checkbox v-model="checked" @change="password(checked)">记住密码</el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row> -->
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')" style="border-radius:0px;width:193px;">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
//   import {mapGetters} from 'vuex'
  import axios from 'axios'
  import http from '../api/public'
  import {
    userLogin,//登录
    captchaImg,//验证码图片
  } from "../api/login.js";
  export default {
    data() {
      return {
        // isLoading: false, //是否开启loading
        checked:false,
        ruleForm: {
          username: '',
          password: '',
          captcha: '',
          uuid:'',
        },
        ruleForms:{
          uuid:'',
        },
        rules: {
          username: [{ required: true, message: '请输入账号名称', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' },{ min: 3, max: 16, message: '长度在 3 到 5 个字符', trigger: 'blur' }]
        },
        captchaPath: '',
      };
    },
    mounted(){
         this.captchaImguuid() //获取uuid
         this.getCaptcha()  //获取验证码
        //  this.getlocalStorage() //记住密码
    },
    methods: {
    //   password(checked){
    //       console.log("记住密码================================================",checked)
    //       debugger;
    //        const self = this
    //         if (self.checked == true) {  //勾选记住密码
    //             self.setlocalStorage(self.ruleForm.username, self.ruleForm.password)
    //         } else {
    //             self.setlocalStorage('','') //取消清除密码
    //         }
    //         //与后端请求代码，暂时还没有请求地址，先省略了
    //         console.log('登陆成功')
    //   },
    //   //向localStorage里存入从页面获取的用户名和密码；
    //   setlocalStorage(c_name, c_pwd) {
    //     localStorage.siteUsername = c_name
    //     localStorage.sitePassword = c_pwd
    //     debugger;
    //   },
    //   getlocalStorage: function() {
    //       debugger;
    //     this.ruleForm.username = localStorage.getItem(localStorage.key(1)) //保存到保存数据的地方
    //     this.ruleForm.password = localStorage.getItem(localStorage.key(2))
    //   },
      captchaImguuid(){ //获取uuid
        let s = [];
        let hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; 
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        let uuid = s.join("");
        this.ruleForms.uuid= uuid;
        this.ruleForm.uuid= uuid;
      },
       // 获取验证码
      getCaptcha () {
        this.captchaImguuid()
        this.captchaPath = `${localStorage.getItem('pocPort')}captcha.jpg?uuid=${this.ruleForms.uuid}`
        
        captchaImg({
            Vue: this,
            params: this.ruleForms.uuid,
        }).then( data => {
        })



      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            userLogin({
              Vue: this,
              params: this.ruleForm,
            }).then( data => {
                console.log("++++++++++login+++++++++++++++",data)
                if (data.code === 0) {
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("userName", data.userName)
                    localStorage.setItem("printerName", data.printerName)
                    this.$message.success("登录成功！")
                    this.$router.push({ path:'/qrCodeQuery'});
                } else {
                    this.getCaptcha() //重新获取验证码
                    this.$message.error("登录失败！")
                }
            })
          } else {
            return false;
          }
        });
      },
    }
  }
</script>
<style lang="less">
   .login{
       display: block;
       width: 100%;
       height: 100%x;
       background-image: url('../assets/images/image.png');
       background-size:100% 100%;
       background-repeat:no-repeat;
       .image{
        //    display: block;
        //    border:1px solid red;
           width:250px;
           height:250px;
           margin:350px 0px 0px 307px;
       }
       .login_w{
            .title{
                    border-bottom:1px dashed #eee;
                    width:100%;
                    height:40px;
                    font-size:20px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:rgba(47,135,255,1);
                    margin-bottom:15px;
                    padding-left: 44%;
                    margin-top: 17px;
            }
            margin:-325px 0 0 65%;
            width:350px;
            border:1px solid green;
            overflow:hidden;
            background: #fff;
            .el-col-20 {
                height: 58px;
            }
            .el-input__inner {
                border-radius: 0;
            }
            .el-form-item.is-required .el-form-item__label:before {
                content: '*';
                color: #f56c6c;
                margin-right: 4px;
                // display: none;
            }
            .yzm{
                width:90px;
                height:22px;
                border:1px solid #eee;
                display:block;
                margin:9px 0px 0px -88px;
            }
            .iii:hover{
                cursor:pointer;
            }
       }
   }
</style>