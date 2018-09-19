//系统管理/显示屏品牌型号库
<template>
  <div class="gtoup-mange">
    <div class="my-tabs">
      <el-tabs type="border-card">
        <el-tab-pane label="系统管理 / 显示屏品牌型号库">
            <h1 class="title">显示屏品牌型号库</h1>
            <!-- 搜索 -->
            <mes-search :config="search.searchConfig" :data="search.searchData" @search="searchList"></mes-search>
            <!--  表格 -->
            <mes-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange" @pageChange="pageChange" @add="add" @remove="remove" @buttonFunction="buttonFunction"></mes-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 新增 -->
    <mes-toast :config="toastAddData" @save="save" @close="close" >
      <toast-body ref='toastBody'></toast-body>
    </mes-toast>
    <!-- 接线方式登记 -->
    <mes-toast :config="registerAddData" @saves="saves" @close="close">
      <register-body ref='registerbodys' :config="registerbody"></register-body>
    </mes-toast>
  </div>
</template>
<script>
import {
  getChatGroups, //分页查询列表
  chatGroups, //保存
  chatGroupsDelay, //修改
  retreatGroup, //删除
  chatGroupes, //接线方式保存
} from '../api/displayBrandModelLibrary.js'
import toastBody from '../components/displayBrandModelLibrary/toastBody'   //新增
import registerBody from '../components/displayBrandModelLibrary/registerBody'   // 接线方式登记
export default {
  data(){
    return{
      registerbody:{},
      saveType:'',
      toastAddData: {
        title: "新增", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "620px", //弹窗宽
        btnData: [{
          name: '保存', //按钮名
          method: 'save', //回调函数
          bgColor: 'dialog-bule' //按钮背景
        }, {
          name: '取消', //按钮名
          method: 'close' //回调函数
        }]
      },
      registerAddData: {
        title: "接线方式登记", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "800px", //弹窗宽
        btnData: [{
          name: '保存', //按钮名
          method: 'saves', //回调函数
          bgColor: 'dialog-bule' //按钮背景
        },{
          name: '保存并继续', //按钮名
          method: 'saves', //回调函数
          bgColor: 'dialog-bule' //按钮背景
        }, {
          name: '取消', //按钮名
          method: 'close' //回调函数
        }]
      },
      // 搜索
      search: {
        searchData: {},
        searchConfig: [
          [{
              label: "品牌",
              field: "brand",
              type: "input",
           },
           {
              label: "型号",
              field: "version",
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
            name: "新增"
          },{
            disabled: true,
            method: "remove",
            name: "删除"
          }
        ],
        //表格字段配置
        colConfig: [{
            field: "brand",
            label: "品牌",
            type: "text"
          },
            { 
            field: "version",
            label: "型号",
            type: "text"
          },
          {
            field: "操作",
            label: "操作",
            type: "btnText4"
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
    searchList(data){
      //查询数据
      this.tableConfig.pageNum = 1;
      let params = this.setAttr(data);
      this.getDate(params);
    },
    add(){ //账户开户
        this.toastAddData.title = "新增";
        this.toastAddData.dialogVisible = true;
        this.saveType = 'add';
        setTimeout(() => {
          this.$refs['toastBody'].types = 'add';
          setTimeout(()=>{
          this.$refs['toastBody'].resetForm();
          },0)
        }, 0)
    },
    remove(){ //删除
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
    buttonFunction(data,type){ //接线方式
      if(type == 'register'){
          console.log("9999999999999999999999999999999999999999",data)
          this.registerbody = data
          this.registerAddData.dialogVisible = true;
          this.saveType = 'register';
          setTimeout(() => {
            this.$refs['registerbodys'].tableData = [];//清空校验
            this.$refs.registerbodys.getDate(data.id);
            this.$refs['registerbodys'].resetForm();
            this.$refs['registerbodys'].types = 'register';
            let {
                id,
                brand, //品牌
                version, //型号
            } = data;
            this.$set(this.$refs['registerbodys'],'ruleForm',{
                id,
                brand, //品牌
                version, //型号
            });
          }, 0);
      }else if(type == 'update'){ //编辑
          this.toastAddData.dialogVisible = true;
          this.toastAddData.title = "编辑"
          this.saveType = 'update';
          setTimeout(() => {
            //清除校验
            this.$refs['toastBody'].resetForm();
            this.$refs['toastBody'].types = 'update';
            let {
                id,
                brand, //品牌
                version, //型号
            } = data;
            this.$set(this.$refs['toastBody'],'ruleForm',{
                id,
                brand, //品牌
                version, //型号
            });
          }, 0);
      }else if(type == 'remove'){
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
                    type: "success",
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
    saves(){
      let a = this.$refs['registerbodys'].lineStyleCats
      let b = this.$refs['registerbodys'].tableData
      chatGroupes({ //接线方式保存
            params: this.$refs['registerbodys'].tableData,
            Vue: this
          }).then(data => {
            this.$message({
              message: "新增成功！",
              type: 'success'
            });
            this.getDate();
            this.toastAddData.dialogVisible = false;
          })
    },
    save(){
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
            message: "新增成功！",
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
      data.page = this.tableConfig.pageNum;
      data.limit = this.tableConfig.pageSize;
      if(this.search.searchData.buDate != null){
         data.startTime = this.search.searchData.buDate[0];
         data.endTime = this.search.searchData.buDate[1];
      }
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
        // debugger;
        this.toastAddData.dialogVisible = false;
        this.registerAddData.dialogVisible = false;
    },
  },
  components: {
    toastBody,  //新增
    registerBody,  //接线方式登记
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
   .my-tabs{
     .title{
       display:block;
       margin-top:-18px;
       margin-left:4px;
       font-size:20px;
       font-family:MicrosoftYaHei-Bold;
       height:30px;
       border:1px solid #E5E5E5;
       border-top:none;
       border-left:none;
       border-right:none;
     }
   }
</style>