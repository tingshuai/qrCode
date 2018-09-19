<template>
  <div class="gm-lookinfo">
    <el-form label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="产品型号：">
            {{config.unitTypeName||'无'}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="硬件版本：">
             {{config.hardwareVersion||'无'}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="软件版本：">
             {{config.softwareVersion||'无'}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="生产年月：">
            {{lookinfo.year||'无'}}
            <span>年</span>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="margin-left:-51px;">
          <el-form-item style="margin-left: -200px;">
             {{lookinfo.month||'无'}}
             <span>月</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="生产批次：">
            {{config.productionBatch||'无'}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机串号：">
             {{config.phoneNo||'无'}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="模版串号：">
             {{config.moduleNo||'无'}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="编码：">
            {{config.qrCode||'无'}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
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
} from "../../api/qrCodeQuery.js";
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
    }
    .el-form-item__label{
        color: #666666;
        font-size: 14px;
    }
  }

</style>
