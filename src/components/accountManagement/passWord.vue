<template>
    <div class="gm-toast-bodyd">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="密码" prop="pass"> 
              <el-input type="password" v-model="ruleForm.pass" auto-complete="off" @change="checkNos(ruleForm.pass)"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="确认密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" auto-complete="off" @change="checkNo(ruleForm.password)"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
</template>
<script>
  import {
  chatPassword, //修改密码
} from '../../api/accountManagement.js'
  export default {
  props:['config'],
  data(){
     var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入6-20位字母或数字且不能为空！'));
        } else {
          if (this.ruleForm.password !== '') {
            this.$refs.ruleForm.validateField('password');
          }
          callback();
        }
        // if (value.trim() === ''){
        //   callback(new Error('不能全为空格'));
        // }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return{  
        ruleForm: {
          id:'',
          pass:'', //密码
          password:'', //确认密码 
        },
        rules: { //校验
          pass: [{ required: true,validator: validatePass, trigger: 'change' },
                 { min: 6, message: '请输入6-20位字母或数字且不能为空！', trigger: 'change' }], //密码
          password: [{ required: true,validator: validatePass2, trigger: 'change' },
                     { min: 6, message: '请输入6-20位字母或数字且不能为空！', trigger: 'change' }], //确认密码
        },
         getData:'',
      }
    },
    mounted(){
      
      },
    methods: {
       checkNos(value){ //密码只能为数字
        let reg = /^[a-zA-Z1-9]\w*$/;
          if (value) {
            debugger;
            if (new RegExp(reg).test(value) == false) {
            setTimeout(() => {
                this.ruleForm.pass ='';
              }, 500);
          }
        }
      },
      checkNo(value){ //密码只能为数字
        let reg = /^[a-zA-Z1-9]\w*$/;
          if (value) {
            debugger;
            if (new RegExp(reg).test(value) == false) {
            setTimeout(() => {
                this.ruleForm.password ='';
              }, 500);
          }
        }
      },
      passwords(){
          this.ruleForm.id = this.config.userId;
      },
      submitForm(fun) {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
             if (fun) {
              fun();
            }
          } else {
            return false;
          }
        });
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields();
      }
    },
  }
</script>
<style lang="less" scoped>
  .gm-toast-bodyd {
    padding: 0 40px;
    // margin-left: 60px;
    .el-form-item__content {
      color: #333;
      font-size: 14px;
    }
    .el-form-item__label {
      color: #666666;
      font-size: 14px;
    }
    .utb-btn{
      border-bottom:1px dashed #eee;
      height:50px;
      width:1100px;
      margin-left:-41px;
      padding-left: 58px;
      margin-bottom: 20px;
    }
    .el-button--mini, .el-button--small {
      width: 110px;
    }
  }
</style>