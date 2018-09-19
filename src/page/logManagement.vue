//系统管理/日志管理
<template>
  <div class="gtoup-mange">
    <div class="my-tabs">
      <el-tabs type="border-card">
        <el-tab-pane label="系统管理 / 日志管理">
            <h1 class="title">日志管理</h1>
            <!-- 搜索 -->
            <mes-search :config="search.searchConfig" :data="search.searchData" @search="searchList"></mes-search>
            <!--  表格 -->
            <mes-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange" @pageChange="pageChange" @exportExcle="exportExcle"></mes-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 文件下载 -->
    <a style="display:none" id="_downloadFile_"></a>
  </div>
</template>
<script>
import {
  getChatGroups, //分页查询列表
  getChatLogExport, //导出Excel
} from '../api/logManagement.js'
export default {
  data(){
    return{
      // 搜索
      search: {
        searchData: {},
        searchConfig: [
          [{
              label: "用户名",
              field: "key",
              type: "input",
           }
          ]
        ]
      },
      tableConfig:{
         //操作按钮配置
        toolbarConfig: [{
            disabled: false,
            method: "exportExcle",
            type:'primary',
            name: "导出Excel"
          }
        ],
        //表格字段配置
        colConfig: [{
            field: "username",
            label: "用户名",
            type: "text"
          },
            { 
            field: "operation",
            label: "用户操作",
            type: "text"
          },
          // {
          //   field: "method",
          //   label: "请求方法",
          //   type: "text"
          // },
          // {
          //   field: "params",
          //   label: "请求参数",
          //   type: "text",
          // },
           {
            field: "time",
            label: "执行时长(毫秒)",
            type: "time"
          },
           {
            field: "ip",
            label: "IP地址",
            type: "text"
          },
           {
            field: "createDate",
            label: "创建时间",
            type: "text"
          },
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
    exportExcle(){ //导出Excel
        let token = localStorage.getItem("token")
        // localStorage.setItem("token",token)
        let params = getChatLogExport() + '?';
        if (this.search.searchData.key) {
          params += "key="+this.search.searchData.key+"&";
            // debugger;
        }
        params += 'token='+token;
        let down = document.getElementById('_downloadFile_');
        down.href = params;
        down.click();
     },
     searchList(data){
      //查询数据
      this.tableConfig.pageNum = 1;
      let params = this.setAttr(data);
      this.getDate(params);
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
      getChatGroups({
        params: this.setAttr(data),
        Vue: this
      }).then(data => {
        this.tableData = data.page.list
        this.tableConfig.total = data.page.totalCount;
        this.tableConfig.loadShow = false;
      });
    },
  },
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