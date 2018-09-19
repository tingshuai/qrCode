<template>
  <div class="gm-lookinfo">
    <el-form label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="用户名：">
            {{this.config.username||'无'}}
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="邮箱：">
             {{this.config.email||'无'}}
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="手机号：">
            {{this.config.mobile||'无'}}
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="创建时间：">
             {{this.config.createTime||'无'}}
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="角色：">
           <span v-for="item in userId">{{item.roleName||'无'}} </span>
          </el-form-item>
        </el-col>
        <el-col :span="24"> 
          <el-form-item label="状态：">
            <!-- {{clsList[this.config.status].label||'无'}}       -->
            {{this.config.status?'可用':'禁用'}}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import {
     lookInfos, //查看详情
  } from '../../api/accountManagement.js'
  export default {
    props: ['config'],
    data(){
       return {
          userId:[],
          // clsList: {
          //     0:{label:"禁用"},
          //     1:{label:"正常"},
          //     }
       }
    },
    mounted(){
    },
    methods:{
        getDate(userId){
          lookInfos({ //详情
            Vue: this,
            params:{userId},
          }).then(data => {
            this.userId = data.user.roleList 
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
