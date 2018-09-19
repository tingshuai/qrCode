//二维码生成
<template>
  <div class="gm-toast-bodys">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
            <el-col :span="24">
            <el-form-item label="产品型号：" prop="unitType">
              <el-select v-model="ruleForm.unitTypeName" filterable placeholder="请选择" @change="dropdown">
                <el-option v-for="item in openIdsData" :key="item.id" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="硬件版本：" prop="hardwareVersion">
              <el-select v-model="ruleForm.hardwareVersion" filterable placeholder="请选择" @change="dropdowns">
                <el-option v-for="item in hardwareVersion" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="软件版本：" prop="softwareVersion">
              <el-select v-model="ruleForm.softwareVersion" filterable placeholder="请选择">
                <el-option v-for="item in softwareVersion" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5" style="margin-right:-70px">
            <el-form-item label="生产年月：" prop="year">
              <el-input type="text" v-model.trim="ruleForm.year" maxlength="20" style="width:70px;"></el-input>
              <span style="position:absolute;left:116%;top:0">年</span>
            </el-form-item>
          </el-col>
            <el-col :span="5">
            <el-form-item prop="month">
              <el-input type="text" v-model.trim="ruleForm.month" maxlength="20" style="width:70px;"></el-input>
              <span style="position:absolute;left:116%;top:0">月</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="生产批次：" prop="productionBatch">
              <el-input type="text" v-model.trim="ruleForm.productionBatch" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="手机串号：" prop="phoneNo">
              <el-input type="text" v-model.trim="ruleForm.phoneNo" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="模组串号：" prop="moduleNo">
              <el-input type="text" v-model.trim="ruleForm.moduleNo" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="utb-btn">
          <el-button type="primary" size="small" @click="submitForms('ruleForm')">生成</el-button>
          <el-button size="small" @click="init">重置</el-button>
        </div>
        <el-row>
          <el-col :span="10">
            <el-form-item label="编码：">
              <el-input type="text" disabled v-model="code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item>
               <span type="text" style="width:150px;height:150px;display:block;border:1px solid #eee">
                  <img  :src="item.qrCodeImage" alt="" v-for="item in businessTypeList" style="width:150px;height:150px;">
               </span>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <div class="utb-btn" style="border-bottom:none;">
          <el-button type="primary" size="small" @click="submitForms('ruleForm')">保存</el-button>
          <el-button size="small" >打印</el-button>
        </div> -->
    </el-form>
  </div>
</template>
<script>
  import {
    qrCodeGenerate, //生成二维码
    unitTypeName,  //产品型号下拉
    hardwareVersion, //硬件版本下拉
    softwareVersion, //软件版本下拉
  } from "../../api/qrCodeGenerate.js";
  export default {
    data() {
      return {
        qrCodeImage:[], //打印二维码
        code:'', //编码
        businessTypeList:[], //生成二维码
        openIdsData:[], //产品型号下拉
        hardwareVersion:[], //硬件版本下拉
        softwareVersion:[], //软件版本下拉
        checked:true,
        ruleForm: {
        },
        rules: { //校验
          unitType: [{ required: true, message: '请输入选择产品型号', trigger: 'change' }], //产品型号
          hardwareVersion: [{ required: true, message: '请输入选择产品型号', trigger: 'change' }], //硬件版本
          softwareVersion: [{ required: true, message: '请输入选择产品型号', trigger: 'change' }], //软件版本
          year: [{ required: true, message: '请输入年份', trigger: 'blur' }], //年
          month: [{ required: true, message: '请输入月份', trigger: 'blur' }], //月
          productionBatch: [{ required: true, message: '请输入生产批次', trigger: 'blur' }], //生产批次
          phoneNo: [{ required: true, message: '请输入手机串号', trigger: 'blur' }], //手机串号
          moduleNo: [{ required: true, message: '请输入模组串号', trigger: 'blur' }], //模组串号
        },
        captchaPath: '',
      };
    },
    mounted(){
        unitTypeName({ //产品型号下拉
          Vue: this
        }).then(data => {
          this.openIdsData = data.data;
      })
    },
    methods: {
      yyyyy(data){
         this.code = data.qrCode;
         this.businessTypeList = [data]
      },
      qqq(data){  //打印二维码
        this.qrCodeImage =[{
          printerName:localStorage.getItem("printerName"), 
          qrCodeImage:data.qrCodeImage,
          id:data.qrCode,
        }]
        // debugger;
      },
      dropdown(){ //生成硬件版本下拉
            this.hardwareVersion ='',
            hardwareVersion({ //硬件版本下拉
              Vue: this,
              params:{
                unitType:this.ruleForm.unitType,
              }
            }).then(data => {
             let array = [];
                data.data.forEach((item,index)=>{
                    array.push({
                        name:item,
                        id:item,
                      })
                    this.hardwareVersion = array
                })
            })
           
      },
      dropdowns(){
            softwareVersion({ //软件版本下拉
              Vue: this,
              params:{
               unitType:this.ruleForm.unitType,
               hardwareVersion:this.ruleForm.hardwareVersion
              }
            }).then(data => {
              let array = [];
                data.data.forEach((item,index)=>{
                    array.push({
                        name:item,
                        id:item,
                      })
                    this.softwareVersion = array
                })
            })
      },
      init(){ //重置按钮
        this.code ='';
        this.businessTypeList=[];
        this.ruleForm.unitTypeName='';
        setTimeout(()=>{
          this.resetForm();//清除校验
        })
      },
      submitForms(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.qrCodeImage =[];
              qrCodeGenerate({ //生成二维码
                Vue: this,
                params:this.ruleForm,
              }).then(data => {
                this.code = data.data.qrCode
                this.$message.success("二维码生成成功！")
                this.businessTypeList = [data.data]
                this.qrCodeImage =[{
                  printerName:localStorage.getItem("printerName"), 
                  qrCodeImage:data.data.qrCodeImage,
                  id:data.data.qrCode,
                }]
                this.$emit('buildQrCodeSucess')
                // debugger;
              })
          } else {
            return false;
          }
        });
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
    }
  }
</script>
<style lang="less">
  .gm-toast-bodys {
    margin-top:20px;
    width:75%;
    margin-left:50px;
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
      width:123%;
      margin-left:14px;
      padding-left: 85px;
      margin-bottom: 20px;
    }
    .el-button--mini, .el-button--small {
      width: 110px;
    }
  }
</style>
