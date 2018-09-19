<template>
   <!-- 查看详情 -->
   <div class="lookInfo">
        <el-row :gutter="20">
          <el-col :span="8" class="lookInfo-item" v-for="(value,key) in config">
              <span class="title">{{key}}:</span>{{value||'无'}}
          </el-col>
        </el-row>
        <!-- loading -->
        <loading v-show="false"></loading>
   </div>
</template>
<script>
export default {
  props:['config']
}
</script>
<style lang="less">
   .lookInfo{
       padding: 0 50px;
       font-size: 14px;
       color: #565656;
       .title{
        margin-right: 5px;
       }
       .lookInfo-item{
           margin: 10px 0;
       }
   }

</style>



