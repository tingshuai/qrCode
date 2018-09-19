//基础设置/版本管理
<template>
  <div class="gtoup-mangetooltip">
    <div class="my-tabs">
      <el-tabs type="border-card">
        <el-tab-pane label="基础设置 / 版本管理">
            <h1 class="title">版本管理</h1>
            <!-- 搜索 -->
            <mes-search :config="search.searchConfig" :data="search.searchData" @search="searchList"></mes-search>
            <!--  表格 -->
            <mes-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange" @pageChange="pageChange" @add="add" @remove="remove" @buttonFunction="buttonFunction"></mes-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 添加 -->
    <mes-toast :config="toastAddData" @save="save" @close="close" >
      <toast-body ref='toastBody'></toast-body>
    </mes-toast>
    <!-- 详情 -->
    <mes-toast :config="toastInfoData" @close="close">
      <look-info :config="lookInfoData"></look-info>
    </mes-toast>
  </div>
</template>
<script>
 import {
    getChatGroups, //分页查询
    chatGroups, //保存
    chatGroupsDelay, //修改
    retreatGroup, //删除
  } from "../api/versionManagement.js";
import toastBody from '../components/versionManagement/toastBody'
export default {
  data(){
    return{
      lookInfoData: {},
      saveType: '',
      toastAddData: {
        title: "编辑", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "520px", //弹窗宽
        btnData: [{
          name: '保存', //按钮名
          method: 'save', //回调函数
          bgColor: 'dialog-bule' //按钮背景
        }, {
          name: '取消', //按钮名
          method: 'close' //回调函数
        }]
      },
      toastInfoData: {
        title: "详情", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "440px", //弹窗宽
        btnData: [{
          name: '关闭页面', //按钮名
          method: 'close' //回调函数
        }]
      },
      // 搜索
      search: {
        searchData: {},
        searchConfig: [
          [{
              label: "硬件版本",
              field: "hardwareVersion",
              type: "input",
           },{
              label: "软件版本",
              field: "softwareVersion",
              type: "input",
           },{
              label: "关键字",
              field: "keywords",
              type: "input",
           }
          ]
        ]
      },
      tableConfig:{
        //操作按钮配置
        toolbarConfig: [{
            disabled: false,
            method: "add",
            type:'primary',
            name: "添加"
          },{
            disabled: true,
            method: "remove",
            name: "删除"
          }
        ],
        //表格字段配置
        colConfig: [{
            field: "hardwareVersion",
            label: "硬件版本",
            type: "text"
          },
            { 
            field: "softwareVersion", 
            label: "软件版本",
            type: "text"
          },
          {
            field: "unitTypeName",
            label: "产品型号",
            type: "text"
          },
          {
            field: "createDate",
            label: "提交日期",
            type: "text"
          },
          {
            field: "remark",
            label: "备注",
            type: "text"
          },
          {
            field: "查看详情",
            label: "操作",
            type: "btnText3s"
          }
        ],
        isSelection: true, //是否可选
        isPage: true, //是否分页
        currentSelectArr: [], //当前勾选的数据
        align: "center", //文本对齐方式
        pageNum: 1,
        pageSize: 10,
        total: 0,
        isHigh: false,
        isLoading: true, //是否开启loading
        loadShow: false //loading控制
      },
      tableData: []
    }
  },
  mounted(){
      //获取表格数据
      this.getDate(); 
  },
  methods:{
    remove(){ //批量删除
        let len = this.tableConfig.currentSelectArr.length - 1;
        let ids = "";
        //判断删除的size是否等于当前页的数量
        this.tableConfig.currentSelectArr.forEach((item, index) => {    
          ids += len === index ? item.id : item.id + ",";
        });
        let flag =
          this.tableData.length === this.tableConfig.currentSelectArr.length;
        this.$confirm("确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            retreatGroup({
              Vue: this,
              params: {
                ids,
              }
            }).then(data => {
              this.$message({
                message: "删除成功！",
                type: "success"
              });
              //回到上一页
              if (flag) {
                this.tableConfig.pageNo +=
                  this.tableConfig.pageNo - 1 >= 1 ? -1 : 0;
              }
              this.getDate(this.search.searchData); //刷新数据
            });
          })
          .catch(() => { 
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
    },
    searchList(data){
      //查询数据
      this.tableConfig.pageNum = 1;
      let params = this.setAttr(data);
      this.getDate(params);
    },
    // 批量操作
    add(){
        this.toastAddData.dialogVisible = true;
        this.toastAddData.title = "添加";
        this.saveType = 'add';
        setTimeout(() => {
          this.$refs['toastBody'].types = 'add';
          setTimeout(()=>{
          this.$refs['toastBody'].resetForm();
          },0)
        }, 0)
    },
    buttonFunction(data,type){
      if(type == 'update'){ //编辑
          this.lookInfoData = data;//记录当前操作列
          this.toastAddData.dialogVisible = true;
          this.toastAddData.title = "编辑"
          this.saveType = 'update';
          setTimeout(() => {
            //清除校验
            this.$refs['toastBody'].resetForm();
            this.$refs['toastBody'].types = 'update';
            let {
              id,
              sysDictId, //产品型号
              hardwareVersion, //硬件版本
              softwareVersion, //软件版本
              remark, //备注
            } = data;
            this.$set(this.$refs['toastBody'],'ruleForm',{
              id,
              sysDictId, //产品型号
              hardwareVersion, //硬件版本
              softwareVersion, //软件版本
              remark, //备注
            });
          }, 0)
      }else{  //删除
        let ids = data.id;
        this.$confirm("确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            retreatGroup({
              Vue: this,
              params: {
                ids,
              }
            }).then(data => {
              this.$message({
                message: "删除成功！",
                type: "success"
              });
              this.getDate(this.search.searchData); //刷新数据
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    save() {
      if(this.saveType !== 'update'){ //保存
        this.$refs['toastBody'].submitForm(this.eidtOperations.bind(this, true));
      }else if(this.saveType == 'update'){ //修改
        this.$refs['toastBody'].submitForm(this.eidtOperationss.bind(this, true));
      }
    },
    eidtOperations(){ //保存实际操作
      chatGroups({
        params: this.$refs['toastBody'].ruleForm,
        Vue: this
      }).then(data => {
        this.$message({
          message: "添加成功！",
          type: 'success'
        });
        this.getDate();
        this.toastAddData.dialogVisible = false;
      })
    },
    eidtOperationss(){ //修改实际操作
      chatGroupsDelay({ 
        params: this.$refs['toastBody'].ruleForm,
        Vue: this
      }).then(data => {
        this.$message({
          message: "修改成功！",
          type: 'success'
        });
        this.getDate(this.search.searchData);
        this.toastAddData.dialogVisible = false;
      })
    },
    sizeChange() {
      //分页size变化
      this.getDate(this.search.searchData);
    },
    pageChange() {
        //分页page变化
        this.getDate(this.search.searchData);
    },
    setAttr(data) {
      for (let attr in data) {
        if (data[attr] === null || data[attr] === undefined ||data[attr] === "") {
          delete data[attr];
        }
      }
      return data;
    },
    getDate(data = {}) {
      //获取分页数据
      data.pageNum = this.tableConfig.pageNum;
      data.pageSize = this.tableConfig.pageSize;
      getChatGroups({
        params: this.setAttr(data),
        Vue: this
      }).then(data => {
        this.tableData = data.page.list
        this.tableConfig.total = data.page.totalCount;
        this.tableConfig.loadShow = false;
      });
    },
    close() { //关闭 X
        this.toastAddData.dialogVisible = false;
        this.toastInfoData.dialogVisible = false;
    },
  },
  components: {
    toastBody,
  },
   watch: { 
    'tableConfig.currentSelectArr': function () {
      if (this.tableConfig.currentSelectArr.length === 0) {
        this.tableConfig.toolbarConfig[1].disabled = true
      } else {
        this.tableConfig.toolbarConfig[1].disabled = false
      }
    }
  }
}
</script>
<style lang="less">
// .gtoup-mangetooltip{
//   .el-tooltip__popper{ // tooltip的类是el-tooltip__popper，可以直接写CSS控制宽度
//      width:95%;
//      text-align: center;
//   }
// }
</style>