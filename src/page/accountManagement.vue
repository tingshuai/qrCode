//系统管理/账户管理
<template>
  <div class="gtoup-mange">
    <div class="my-tabs">
      <el-tabs type="border-card">
        <el-tab-pane label="系统管理 / 账户管理">
            <h1 class="title">账户管理</h1>
            <!-- 搜索 -->
            <mes-search :config="search.searchConfig" :data="search.searchData" @search="searchList"></mes-search>
            <!--  表格 -->
            <mes-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange" @pageChange="pageChange" @add="add" @remove="remove" @buttonFunction="buttonFunction"></mes-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 开户 -->
    <mes-toast :config="toastAddData" @save="save" @close="close" >
      <toast-body ref='toastBodys' :config="typeData"></toast-body>
    </mes-toast>
    <!-- 详情 -->
    <mes-toast :config="toastInfoData" @close="close">
      <look-info ref='look' :config="lookInfoData"></look-info>
    </mes-toast>
     <!-- 修改密码 -->
    <mes-toast :config="toastpasswordData" @close="close" @pass ="pass">
      <pass-word ref="password" :config="passwordData"></pass-word>
    </mes-toast>
  </div>
</template>
<script>
import {
  getChatGroups, //分页查询列表
  chatGroups, //保存
  chatGroupsDelay, //修改 
  retreatGroup, //删除
  lookInfos, //角色
  chatPassword, //修改密码
} from '../api/accountManagement.js'
import toastBody from '../components/accountManagement/toastBody'
import lookInfo from '../components/accountManagement/lookInfo.vue'
import passWord from '../components/accountManagement/passWord.vue'
export default {
  data(){
    return{
      typeData:'',
      saveType:'',
      passwordData: {},
      lookInfoData: {},
      toastAddData: {
        title: "账户开户", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "640px", //弹窗宽
        btnData: [{
          name: '开户', //按钮名
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
        width: "500px", //弹窗宽
        btnData: [{
          name: '关闭页面', //按钮名
          method: 'close' //回调函数
        }]
      },
      toastpasswordData: {
        title: "修改密码", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "440px", //弹窗宽
        btnData: [{
          name: '修改', //按钮名
          method: 'pass',
          bgColor: 'dialog-bule' //按钮背景
        },{
          name: '取消', //按钮名
          method: 'close' //回调函数
        }]
      },
      // 搜索
      search: {
        searchData: {},
        searchConfig: [
          [{
              label: "用户名",
              field: "username",
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
            name: "开户"
          },{
            disabled: true,
            method: "remove",
            name: "删除"
          }
        ],
        //表格字段配置
        colConfig: [{
            field: "username",
            label: "用户名",
            type: "text"
          },
            { 
            field: "email",
            label: "邮箱",
            type: "text"
          },
          {
            field: "mobile",
            label: "手机号",
            type: "text"
          },
          {
            field: "status",
            label: "状态",
            type: "text-groupState",
            childrens: [
              {
                label:"123213",
                value:"1"
              }
            ]
          },
           {
            field: "createTime",
            label: "创建时间",
            type: "text"
          },
          {
            field: "查看详情",
            label: "操作",
            type: "btnText5"
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
    remove(){ //删除
        let len = this.tableConfig.currentSelectArr.length - 1;
        let userIds = "";
        //判断删除的size是否等于当前页的数量
        this.tableConfig.currentSelectArr.forEach((item, index) => {    
          userIds += len === index ? item.userId : item.userId + ",";
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
                userIds,
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
    buttonFunction(data,type){
      // debugger;
      console.log("编辑=======================================",data)
      if(type == 'update'){ //编辑
          this.toastAddData.dialogVisible = true;
          this.toastAddData.title = "编辑";
          this.toastAddData.btnData[0].name = '保存';
          this.saveType = 'update';
          this.typeData = type;
          setTimeout(() => {
            this.$refs['toastBodys'].types = 'update';
            let {
                userId,
                // pass,//密码
                username, //用户名
                // password, //确认密码
                email, //邮箱
                mobile, //手机号
                roleIdList, //角色
                printerName, //打印机 
                status, //状态 
            } = data;
            this.$set(this.$refs['toastBodys'],'ruleForm',{
                userId,
                // pass,//密码
                username, //用户名
                // password, //确认密码
                email, //邮箱
                mobile, //手机号
                printerName, //打印机
                roleIdList:roleIdList||[], //角色
                status, //状态
            });
            this.$refs.toastBodys.getDate(data.userId);
            //清除校验
            this.$refs['toastBodys'].resetForm();
          }, 0);
      }else if(type =='look'){  //详情
          this.toastInfoData.dialogVisible = true;
          this.lookInfoData = data;//记录当前操作列
          setTimeout(() => {
            this.$refs.look.userId = '';
            this.$refs.look.getDate(data.userId);
          },0)
      }else{ //修改密码
         this.passwordData = data;
         this.toastpasswordData.dialogVisible = true;
           setTimeout(() => {
              this.$refs.password.passwords();
              this.$refs['password'].ruleForm.pass='';
              this.$refs['password'].ruleForm.password='';
              this.$refs['password'].resetForm();//清除校验
          },0)
         }
    },
    pass(data){ //修改密码
           this.$refs['password'].submitForm(this.eidtOperation.bind(this, true));
        },
    eidtOperation() {//修改密码实际操作
      chatPassword({
          Vue: this,
          params: this.$refs['password'].ruleForm,
        }).then(data => {
          this.$message({
              message: "修改密码成功！",
              type: 'success'
            });
          this.getDate();
          this.toastpasswordData.dialogVisible = false;
        });
    },
    add(){ //账户开户
        this.toastAddData.title = "账户开户";
        this.toastAddData.dialogVisible = true;
        this.toastAddData.btnData[0].name = '开户';
        this.saveType = 'add';
        this.typeData = '';
        setTimeout(()=>{
        // this.$refs['toastBody'].init();
            this.$refs['toastBodys'].resetForm(); //清除校验
            // this.$refs['toastBody'].init();
            // debugger;
        },0)
        //  setTimeout(() => {
        //    this.$refs['toastBodys'].ruleForm ={
        //      roleIdList:[],
        //    };//清空表单
        //   },0)
              // this.$refs['password'].ruleForm.pass='';
              // this.$refs['password'].ruleForm.password='';
              // this.$refs['password'].resetForm();//清除校验
                 setTimeout(() => {
                    this.$refs['password'].ruleForm.pass='';
                    this.$refs['password'].ruleForm.password='';
                    this.$refs['password'].resetForm();//清除校验
                  },0)
    },
    save(){
       if(this.saveType !== 'update'){ //保存
           this.$refs['toastBodys'].submitForm(this.eidtOperations.bind(this, true));
      }else if(this.saveType == 'update'){ //编辑
           this.$refs['toastBodys'].submitForm(this.eidtOperationss.bind(this, true));
      }
    },
     eidtOperations(){
           chatGroups({ //保存实际操作
             params: this.$refs['toastBodys'].ruleForm,
             Vue: this
           }).then(data => {
             this.$message({
               message: "开户成功！",
               type: 'success'
             });
             this.getDate();
             this.toastAddData.dialogVisible = false;
           })
         },
      eidtOperationss(){
           chatGroupsDelay({ //修改实际操作
              params: this.$refs['toastBodys'].ruleForm,
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
    searchList(data){  //查询数据
      //查询数据
      this.tableConfig.pageNum = 1;
      let params = this.setAttr(data);
      this.getDate(params);
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
        this.getDate();
        this.toastAddData.dialogVisible = false;
        this.toastInfoData.dialogVisible = false;
        this.toastpasswordData.dialogVisible = false;
    },
  },
  components: {
    toastBody,
    lookInfo,
    passWord,
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
