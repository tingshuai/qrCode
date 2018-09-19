<template>
    <div class="gm-toast-body">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="18">
            <el-form-item label="用户名：" prop="username">
              <el-input type="text" v-model="ruleForm.username" :disabled="this.config?disabled=true:disabled=false" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="密码" prop="pass" v-if="this.config !== 'update'"> 
              <!-- {{ruleForm.pass}} -->
              <el-input type="password" v-model="ruleForm.pass" auto-complete="off" @change="checkNo(ruleForm.pass)" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="确认密码" prop="password" v-if="this.config !== 'update'">
              <!-- {{ruleForm.password}} -->
              <el-input type="password" v-model="ruleForm.password" auto-complete="off" @change="checkNos(ruleForm.password)" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="邮箱：" prop="email">
              <el-input type="text" v-model="ruleForm.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="手机号：" prop="mobile">
              <el-input type="text" v-model="ruleForm.mobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24">
            <el-form-item label="打印机：" prop="printerName">
              <el-select v-model="ruleForm.printerName" filterable clearable placeholder="请选择">
                <el-option v-for="item in printerNamesq" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="账户类型：" prop="roleIdList">
               <el-checkbox-group v-model="ruleForm.roleIdList"> 
                <el-checkbox :label="item.roleId" :key="item.roleId" v-for="item in role">{{item.roleName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="账户状态：" prop="status">
              <el-radio v-model="ruleForm.status" :label="0">禁用</el-radio>
              <el-radio v-model="ruleForm.status" :label="1">可用</el-radio>
            </el-form-item>
          </el-col> 
        </el-row>
      </el-form>
    </div>
</template>
<script>
  import {
    roleManagement, //角色管理
    lookInfos, //获取角色
    printerNames,//获取打印机名称
  } from '../../api/accountManagement.js'
  export default {
    props: ['config'],
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
       var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          console.log(reg.test(value));
          if (reg.test(value)) { 
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
    return{  
        printerNamesq:[],//获取打印机
        role:[],
        roleIdList:[],
        ruleForm: {
          username:'', //用户名
          pass:'', //密码
          password:'', //确认密码 
          email:'', //邮箱
          mobile: '', //手机号
          roleIdList:[], //角色
          status:0, //状态
        },
        rules: { //校验
          username: [{ required: true, message: '用户名不能为空！', trigger: 'blur' }], //用户名
          pass: [{ required: true,validator: validatePass, trigger: 'change' },
                 { min: 6, message: '请输入6-20位字母或数字且不能为空！', trigger: 'blur' }], //密码
          password: [{ required: true,validator: validatePass2, trigger: 'blur' },
                     { min: 6, message: '请输入6-20位字母或数字且不能为空！', trigger: 'blur' }], //确认密码
          mobile: [{required: true,validator: checkPhone, trigger: 'blur'}],
          email: [{ required: true, message: '邮箱不能为空！', trigger: 'blur' },
                  { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'blur'] }],//邮箱
          printerName: [{ required: true, message: '请选择打印机', trigger: 'change' }], //请选择打印机
        },
      }
    },
    mounted(){
        roleManagement({ //获取角色下拉
          Vue: this
        }).then(data => {
           let array = [];
           data.list.forEach(element => {
               this.role.push(element)
           });
           console.log(this.role,'xxx');
        }),
        printerNames({ //获取打印机名称
          Vue: this
        }).then(data => {
          let array = [];
                data.data.forEach((item,index)=>{
                    array.push({
                        name:item,
                        id:item,
                      })
                    this.printerNamesq = array                
              })
        })
    },
    methods: {
       init(){ //重置按钮
        // this.ruleForm ={}
        // this.printerNamesq=[]
        this.ruleForm.pass = ''
        this.ruleForm.password = ''
        // this.ruleForm.roleIdList = [];
      },
      checkNo(value){ //密码只能为数字
        let reg = /^[a-zA-Z1-9]\w*$/;
          if (value) {
            if (new RegExp(reg).test(value) == false) {
            setTimeout(() => {
               this.ruleForm.pass ='';
                    }, 0);
          }
        }
      },
      checkNos(value){ //确认密码只能为数字
        let reg = /^[a-zA-Z1-9]\w*$/;
          if (value) {
            if (new RegExp(reg).test(value) == false) {
            setTimeout(() => {
               this.ruleForm.password ='';
                    }, 0);
          }
        }
      },
      getDate(userId){ 
        lookInfos({ //获取角色
          Vue: this,
          params:{userId},
        }).then(data => {
          this.ruleForm.roleIdList = [];
          data.user.roleList.forEach(element => {
            this.ruleForm.roleIdList.push(element.roleId);
          });
        })
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
  .gm-toast-body {
    padding: 0 40px;
    margin-left: 60px;
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
