//设备出库/出库管理
<template>
  <div class="gtoup-mange">
    <div class="my-tabs">
      <el-tabs type="border-card">
        <el-tab-pane label="设备出库 / 出库管理">
            <h1 class="title">出库管理</h1>
            <!-- 搜索 -->
            <mes-search :config="search.searchConfig" :data="search.searchData" @search="searchList"></mes-search>
            <!--  表格 -->
            <mes-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange" @pageChange="pageChange" @add="add" @buttonFunction="buttonFunction"></mes-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 添加 -->
    <mes-toast :config="toastAddData" @save="save" @close="close" @prinTing="prinTing">
      <toast-body ref='toastBody' :codes="qurcodeImage"></toast-body>
    </mes-toast>
    <!-- 详情 -->
    <mes-toast :config="toastInfoData" @close="close" @dayin="dayin">
      <look-info :config="lookInfoData" ref="lookInfoDatas"></look-info>
    </mes-toast>
  </div>
</template>
<script>
 import {
    getChatGroups, //分页查询
    chatGroups, //保存
    chatGroupsDelay, //修改
    retreatGroup, //删除
    prinTing, //打印二维码
  } from "../api/qutgoingManagement.js";
import toastBody from '../components/qutgoingManagement/toastBody'
import lookInfo from '../components/qutgoingManagement/lookInfo'
export default {
  data(){
    return{
      params:{},
      qurcodeImage:{},
      lookInfoData: {},
      saveType: '',
      toastAddData: {
        title: "编辑", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "1000px", //弹窗宽
        btnData: [{
          name: '保存', //按钮名
          method: 'save', //回调函数
          bgColor: 'dialog-bule' //按钮背景
        }, {
          name: '打印', //按钮名
          method: 'prinTing' //回调函数
        }]
      },
      toastInfoData: {
        title: "详情", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "800px", //弹窗宽
        btnData: [{
          name: '打印', //按钮名
          method: 'dayin', //回调函数
          bgColor: 'dialog-bule' //按钮背景
        },{
          name: '关闭页面', //按钮名
          method: 'close' //回调函数
        }]
      },
      // 搜索
      search: {
        searchData: {
            // buDate: []
          },
        searchConfig: [
          [{
              label: "出货单号",
              field: "outNo",
              type: "input",
           },{
              label: "出货时间",
              field: "positions",
              type: "datetimerange",
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
          }
        ],
        //表格字段配置
        colConfig: [{
            field: "outNo",
            label: "出货单号",
            type: "text"
          },
            { 
            field: "outBy",
            label: "出货人",
            type: "text"
          },
          {
            field: "outDate",
            label: "出货时间",
            type: "text"
          },
          {
            field: "agent",
            label: "客户名称",
            type: "text"
          },
          {
            field: "customer",
            label: "代理商",
            type: "text"
          },
          {
            field: "查看详情",
            label: "操作",
            type: "btnText6"
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
    prinTing(){
         this.$refs['toastBody'].submitForms(this.prinTings.bind(this, true));
      },
    prinTings(){ //打印二维码实际操作
       prinTing({
          Vue: this, 
          params:this.$refs['toastBody'].qrCodeImage, 
        }).then(data => {
            this.$message.success("二维码打印成功！")
        })  
    },
     //详情二维码打印
    dayin(){
       this.$refs.lookInfoDatas.dayin();
    },
    // 批量操作
    add(){
        this.toastAddData.dialogVisible = true;
        this.toastAddData.title = "添加";
        this.saveType = 'add';
        setTimeout(() => {
          this.$refs['toastBody'].init();
          this.$refs['toastBody'].types = 'add';
          this.$refs['toastBody'].resetForm(); //清除校验
        }, 0)
    },
    buttonFunction(data,type){
      if(type == 'update'){ //编辑
          this.qurcodeImage = data;
          this.lookInfoData = data;//记录当前操作列
          this.toastAddData.dialogVisible = true;
          this.toastAddData.title = "编辑"
          this.saveType = 'update';
          setTimeout(() => {
            //清除校验
            this.$refs['toastBody'].init();
            this.$refs['toastBody'].yyyyy(data);
            this.$refs['toastBody'].qqq(data); //打印二维码
            this.$refs['toastBody'].resetForm(); //清除校验
            this.$refs['toastBody'].types = 'update';
            let {
                id,
                outNo, //出货单号
                outBy, //出货人
                outDate, //出货时间
                equipmentName, //设备名称
                agent, //客户名称
                customer, //代理商
                qrCodeImage, //二维码图片
            } = data;
            this.$set(this.$refs['toastBody'],'ruleForm',{
                id,
                outNo, //出货单号
                outBy, //出货人
                outDate, //出货时间
                equipmentName, //设备名称
                agent, //客户名称
                customer, //代理商
                qrCodeImage, //二维码图片
            });
          }, 0)
      }else if(type == 'remove'){  //删除
        let ids = data.id;
        let outNos = data.outNo;
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
                outNos,
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
      }else{
        //查看详情
          this.lookInfoData = data;//记录当前操作列
          this.toastInfoData.dialogVisible=true;
      }
    },
    save() {
      if(this.saveType !== 'update'){ //保存
        this.$refs['toastBody'].submitForms(this.eidtOperations.bind(this, true));
      }else if(this.saveType == 'update'){ //修改
        this.$refs['toastBody'].submitForms(this.eidtOperationss.bind(this, true));
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
          if (data[attr] === null || data[attr] === undefined || data[attr] =="") {
            delete data[attr];
          }
        }
        return data;
      },
    searchList(data){  //查询数据
         //查询数据
          this.tableConfig.pageNum = 1;
          this.params = {...this.setAttr(data)}
          let params =this.params;
  
          if(params.positions){
            params.startTime = params.positions[0];
            params.endTime = params.positions[1];
            delete params.positions 
          }
            this.getDate(params);
    },
    getDate(data = {}) {
      //获取分页数据
      data.pageNum = this.tableConfig.pageNum;
      data.pageSize = this.tableConfig.pageSize;
       if(data.positions){
           data.startTime = this.params.positions[0];
           data.endTime = this.params.positions[1];
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
        this.toastAddData.dialogVisible = false;
        this.toastInfoData.dialogVisible = false;
    },
  },
  components: {
    toastBody,
    lookInfo,
  },
}
</script>
<style lang="less">
</style>