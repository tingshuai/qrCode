//二维码查询
<template>
  <div class="gtoup-mange">
    <div class="my-tabs">
      <el-tabs type="border-card">
        <el-tab-pane label="二维码管理 / 二维码查询">
            <h1 class="title">二维码查询</h1>
            <!-- 搜索 -->
            <mes-search :config="search.searchConfig" :data="search.searchData" @search="searchList"></mes-search>
            <!--  表格 -->
            <mes-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange" @pageChange="pageChange" @dissolve="dissolve" @buttonFunction="buttonFunction"></mes-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 编辑 -->
    <mes-toast :config="toastAddData" @save="save" @close="close" @prinTing="prinTing" @saves="saves">
      <toast-body ref='toastBody' @buildQrCodeSucess="bqcs"></toast-body>
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
  retreatGroup, //批量操作/删除
  retreatUpdate, //修改 
  unitTypeName, //产品型号下拉
  hardwareVersion, //硬件版本下拉
  softwareVersion, //软件版本下拉
  prinTing, //打印二维码
} from "../api/qrCodeQuery.js";
import toastBody from '../components/qrCodeQuery/toastBody'
import lookInfo from '../components/qrCodeQuery/lookInfo.vue'
export default {
  data(){
    return{
      array:{
        label:'',
        value:'',
      },
      unitType:{},
      lookInfoData: {},
      saveType:'',
      toastAddData: {
        title: "编辑", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "1050px", //弹窗宽
        btnData: [{
          name: '修改', //按钮名
          method: 'save', //回调函数
          type: 'primary', //按钮背景
          disabled:true
        }, {
          name: '修改并打印', //按钮名
          method: 'saves' ,//回调函数
          disabled:true
        }]
      },
      toastInfoData: {
        title: "详情", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "700px", //弹窗宽
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
        searchData: {},
        searchConfig: [
          [{
              label: "产品型号",
              field: "typeId",
              type: "selects",
              childrens: []
           },{
              label: "硬件版本",
              field: "hardwareVersion",
              type: "input",
              // childrens: []
           },{
              label: "软件版本",
              field: "softwareVersion",
              type: "input",
              // childrens: []
           },{
              label: "打印状态",
              field: "printState",
              type: "selects",
              childrens: [{
                label: '已打印',
                value: true
              }, {
                label: '未打印',
                value: false
              }]
           }
          ]
        ]
      },
      tableConfig:{
        //操作按钮配置
        toolbarConfig: [{
            method: "dissolve",
            disabled: true,
            type:'primary',
            name: "批量删除"
          }
        ],
        //表格字段配置
        colConfig: [{
            field: "moduleNo",
            label: "模组串号",
            type: "text"
          },
            { 
            field: "unitTypeName",
            label: "产品型号",
            type: "text"
          },
          {
            field: "productionBatch",
            label: "生产批次",
            type: "text"
          },
          {
            field: "phoneNo",
            label: "手机串号",
            type: "text"
          },
           {
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
            field: "productionDate",
            label: "生产年月",
            type: "text"
          },
            {
            field: "printState",
            label: "状态",
            type: "state"
          },
          {
            field: "查看详情",
            label: "操作",
            type: "btnText3"
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
     //产品型号下拉
      unitTypeName({ 
         vue:this
      }).then(data => {
        let array = [];
        data.data.forEach((item,index)=>{
            array.push({
                label:item.name,
                value:item.id,
              })
            this.search.searchConfig[0][0].childrens = array
        })
      })
  },
  methods:{
    bqcs(){
      this.toastAddData.btnData.forEach((val,i,arr)=>{
        val.disabled = false;
      })
    },
    prinTing(){ //打印二维码
      this.$refs['toastBody'].submitForm(this.eidtOperationsss.bind(this, true));
    },
    eidtOperationsss(){ //打印实际操作
      prinTing({ //打印二维码 
        Vue: this, 
        params:this.$refs['toastBody'].qrCodeImage, 
      }).then(data => {
            this.$message({
            message: data.meg,
              type: 'success'
            });
          this.$message.success("二维码打印成功！")
          this.getDate(this.search.searchData);
          this.toastAddData.dialogVisible = false;
      })  
    },
    //详情二维码打印
    dayin(){
       this.$refs.lookInfoDatas.dayin();
    },
    //批量操作
    dissolve() {
      //删除
      let len = this.tableConfig.currentSelectArr.length - 1;
      let ids = "";
      let qrCodes = "";
      //判断删除的size是否等于当前页的数量
      this.tableConfig.currentSelectArr.forEach((item, index) => {    
        ids += len === index ? item.id : item.id + ",";
        qrCodes += len === index ? item.qrCode : item.qrCode + ",";
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
              qrCodes,
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
      if(type == 'edit'){ //修改
            this.toastAddData.dialogVisible = true;
            this.saveType = 'edit';
            let year = JSON.parse(data.qrCodeContent);
            let qrCodeId = {qrCodeId:data.id};
            let object = Object.assign(data,year,qrCodeId);
            setTimeout(() => {
              this.$refs['toastBody'].yyyyy(data);
              this.$refs['toastBody'].qqq(data); //打印二维码
              this.$refs['toastBody'].resetForm(); //清除校验
              this.$refs['toastBody'].types = 'edit';
              let {
                unitType,
                equipmentId,
                qrCodeId,
                unitTypeName, //产品型号
                hardwareVersion, //硬件版本
                softwareVersion, //软件版本
                year, //年
                month, //月
                productionBatch, //生产批次
                phoneNo, //手机串号
                moduleNo, //模组串号
              } = data;
              console.log("修改============================================",data) 
              this.$set(this.$refs['toastBody'],'ruleForm',{
                unitType,
                equipmentId,
                qrCodeId,
                unitTypeName, //产品型号
                hardwareVersion, //硬件版本
                softwareVersion, //软件版本
                year, //年
                month, //月
                productionBatch, //生产批次
                phoneNo, //手机串号
                moduleNo, //模组串号
              });
            }, 0)
      }else{  //详情
          this.lookInfoData = data;//记录当前操作列
          this.toastInfoData.dialogVisible = true;

      }
    },
    save(){ //修改
        this.$refs['toastBody'].submitForm(this.eidtOperationss.bind(this, true));
    },
    eidtOperationss(){ //修改实际操作
      retreatUpdate({
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
    saves(){ //修改并打印
        this.$refs['toastBody'].submitForm(this.eidtOperationp.bind(this, true));
    },
    eidtOperationp(){ //修改实际操作
      retreatUpdate({
        params: this.$refs['toastBody'].ruleForm,
        Vue: this
      }).then(data => {
        this.$message({
          message: "修改成功！",
          type: 'success'
        });
        this.prinTing() //打印
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
    searchList(data){
      //查询数据 
      this.tableConfig.pageNum = 1;
      let params = this.setAttr(data);
      this.getDate(params);
      // this.gethardwareVersion();
    },
    gethardwareVersion(){
          //硬件版本下拉
          hardwareVersion({
            vue:this,
            params:{
                    unitType:this.search.searchData.typeId,
                  }
          }).then(data => {
            let array = [];
            data.data.forEach((item,index)=>{
                array.push({
                    label:item,
                    value:item,
                  })
                this.search.searchConfig[0][1].childrens = array
            })
          })
          // 软件版本下拉
       softwareVersion({
            vue:this,
            params:{
                    unitType:this.search.searchData.typeId,
                    hardwareVersion:this.search.searchData.hardwareVersion
                  }
        }).then(data => {
          let array = [];
              data.data.forEach((item,index)=>{
                  array.push({
                     label:item,
                     value:item,
                    })
                  this.search.searchConfig[0][2].childrens = array
              })
        })
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
    setAttr(data) { 
      //数据处理
    for (let attr in data) {
      if (data[attr] === null || data[attr] === undefined ||data[attr] === "") {
        delete data[attr];
      }
    }
    return data;
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
  watch: {
    'tableConfig.currentSelectArr': function () {
      if (this.tableConfig.currentSelectArr.length === 0) {
        this.tableConfig.toolbarConfig[0].disabled = true
      } else {
        this.tableConfig.toolbarConfig[0].disabled = false
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
