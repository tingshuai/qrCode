<template>
  <div class="gm-lookinfo">
    <el-form label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="出货单号：">
            {{config.outNo||'无'}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出货人：">
             {{config.outBy||'无'}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出货时间：">
             {{config.outDate||'无'}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="设备名称：">
            {{config.equipmentName||'无'}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户名称：">
             {{config.agent||'无'}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="代理商：">
            {{config.customer||'无'}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="编码：">
            {{config.outNo||'无'}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="二维码：">
            <img :src="config.qrCodeImage||'无'" alt="">
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import {
    prinTing, //打印二维码
  } from "../../api/qutgoingManagement.js";
  export default {
    data(){
      return {
        lookinfo:[],
      }
    },
    props: ['config'],
    mounted(){
       //数据处理
       this.lookinfo = JSON.parse(this.config.qrCodeContent)
    },
    methods:{
       dayin(){
          prinTing({ //打印二维码 
            Vue: this, 
            params:[{
              printerName:localStorage.getItem("printerName"),
              id:this.config.qrCode,
              qrCodeImage:this.config.qrCodeImage,
            }], 
          }).then(data => {
                this.$message({
                message: data.meg,
                  type: 'success'
                });
              this.$message.success("二维码打印成功！")
          })  
       }
    }
  }
</script>
<style lang="less">
  .gm-lookinfo {
    padding: 0 40px;
    .groupUsers{
        margin-right: 10px;
    }
    .el-form-item__content{
        color: #333;
        font-size: 14px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .el-form-item__label{
        color: #666666;
        font-size: 14px;
    }
  }
</style>
