<template>
    <div class="gm-toast-bodys">
      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="品牌：" prop="brand">
              <input type="text" v-model="ruleForm.brand" style="border:none">
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="型号:" prop="version"> 
              <input type="text" v-model="ruleForm.version" style="border:none">
            </el-form-item>
          </el-col>
        </el-row>
        <!--  表格 -->
        <line-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange" @pageChange="pageChange" @buttonFunction='buttonFunction' @buttonFunction1='buttonFunction1' @buttonFunction2='buttonFunction2'>
        </line-table>
      </el-form>
    </div>
</template>
<script>
  import {
    registerGroups, //分页查询接线方式列表
  } from '../../api/displayBrandModelLibrary.js'
  export default {
  props: ['config'], 
  data(){
    return{ 
        banner:[],
        imgPath:[], //图片
        ruleForm: {
          id:'',
          brand:'', //品牌
          version:'', //型号
        },
        curRow:"",
        lineStyleCats:[],
         tableConfig:{
          //表格字段配置
          colConfig: [{
              field: "lineStyle",
              label: "接线方式",
              type: "input"
            },
              { 
              field: "上传图片",
              label: "上传图片",
              type: "btnText1"
            },
             { 
              field: "linePict",
              label: "接线图",
              type: "image"
            },
            {
              field: "新增",
              label: "操作",
              type: "btnText2"
            }
          ],
          align: "center", //文本对齐方式
        },
        tableData: []
      }
    },
    methods: {
      buttonFunction(data,type){
         if(type == 'add'){//新增
            if(data.lineStyle !== '' && data.linePict !==''){
              this.tableData.push({
                lineStyle:data.lineStyle,
                linePict:data.linePict,
              })
              this.lineStyleCats.push({
                displayId:this.config.id,
                id:this.config.id,
                lineStyle:data.lineStyle,
                linePict:data.linePict,
              })
              setTimeout(()=>{
                this.tableData.splice(0,0,"")
              },0)
            }
         }else{  //删除
            if(this.tableData.length > 1){
              this.tableData.pop({
                lineStyle:data.lineStyle,
                linePict:data.linePict,
              })
            }
         }
      },
      buttonFunction1(data){ //上传接线图
        this.tableData[this.curRow.$index].linePict = data.url;
        // this.tableData;
        // this.curRow;
        // debugger;
      },
      buttonFunction2(data){
        this.curRow = data;
      },
      sizeChange() {
      //分页size变化
      this.getDate();
      },
      pageChange() {
      //分页page变化
      this.getDate();
      },
      setAttr(data) {
        for (let attr in data) {
          if (data[attr] === null || data[attr] === undefined ||data[attr] === "") {
            delete data[attr];
          }
        }
        return data;
      },
      getDate(id) {
        // debugger;
        let data = {displayId:id};
        //获取分页数据
        registerGroups({
          params: this.setAttr(data),
          Vue: this
        }).then(data => {  
          if(data.data.length==0){
            this.tableData.push({
                  lineStyle:'',
                  linePict:''})
          }else{
              this.tableData = data.data;
          }
        });
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields();
      },
    },
  }
</script>
<style lang="less" scoped>
  .gm-toast-bodys {
    padding: 0 40px;
    margin-left: 45px;
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
