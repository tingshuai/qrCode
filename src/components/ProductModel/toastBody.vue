<template>
    <div class="gm-toast-body">
      <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" status-icon class="demo-ruleForm">
        <el-row>
          <el-col :span="17">
            <el-form-item label="产品型号：" prop="name">
              <el-input type="text" v-model="ruleForm.name" maxlength="20"></el-input>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="17"> 
            <el-form-item label="排序号：" prop="orderNum">
              <el-input type="text" v-model="ruleForm.orderNum" maxlength="5" @change="checkNo(ruleForm.orderNum)"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="24">
            <el-form-item label="备注：" prop="remark">
              <el-input
                maxlength="200"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 10}"
                placeholder="请输入内容"
                v-model="ruleForm.remark">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '', //产品型号
          orderNum: '', //排序号
          remark: '', //备注
        },
        rules: {  //校验
          name: [{required: true, message: '此选择为必填项', trigger: 'blur'}], //产品型号
          orderNum:[{ required: true, message: '请输入数字', trigger: 'change' }], //排序号 
        },
      }
    },
    mounted() {
    },
    methods: {
       checkNo(value){ //排序号只能为数字
        let reg = /^[1-9]\d*$/;
          if (value) {
            if (value > 999999 || new RegExp(reg).test(value) == false) {
            setTimeout(() => {
                this.ruleForm.orderNum ='';
              }, 500);
          }
        }
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
<style lang="less">
  .gm-toast-body {
    padding: 0 40px;
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
