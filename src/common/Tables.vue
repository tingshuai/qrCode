//该文件依赖 loading组件 :fixed="item.fixed" //列是否固定在左侧或者右侧 :prop="item.field" //对应列内容的字段名 :width="item.width" //对应列的宽度 :sortable="item.isSort"
//排序 :resizable="item.isResize" //对应列是否可以通过拖动改变宽度 :show-overflow-tooltip="true" //当内容过长被隐藏时显示tooltip :label="item.label"
//标头标题 :align="tableConfig.align" //文本对齐方式
<template>
  <div class="myTable">
    <!-- 交互按钮 -->
    <toolbar v-if="tableConfig.toolbarConfig" @toolbarBack="toolbarBack" :toolbarConfig="tableConfig.toolbarConfig">
      <slot></slot>
    </toolbar>
    <!-- 表格 -->
    <el-table :data="tableData" @select="select" @select-all="selectAll" @row-dblclick="rowDblclick" :highlight-current-row="tableConfig.isHigh">
      <!-- 是否勾选 -->
      <el-table-column v-if="tableConfig.isSelection" type="selection" width="50" :align="tableConfig.align" :disabled="tableData.length<0">
      </el-table-column>
      <!-- 表格配置 -->
      <el-table-column v-for="(item,index) in tableConfig.colConfig" :fixed="item.fixed" :prop="item.field" :width="item.width"
        :min-width="item.minWidth" :sortable="item.isSort" :resizable="item.isResize" :show-overflow-tooltip="true" :label="item.label"
        :align="tableConfig.align">
        <!-- 自定义表格内容 -->
        <template slot-scope="scope">
          <!-- 普通文本 -->
          <span v-if="item.type === 'text'">{{scope.row[item.field]||'无'}}</span>
          <!-- 用户状态 -->
          <span v-else-if="item.type === 'text-state'">{{setState(scope.row[item.field])}}</span>
          <!-- 群状态 -->
           <span v-else-if="item.type === 'text-groupState'">{{scope.row[item.field]?'已解散':'未解散'}}</span>
          <!-- 输入框 -->
          <el-input v-else-if="item.type === 'input'" v-model.trim="scope.row[item.field]" size="mini"></el-input>
          <!-- 日期 -->
          <el-date-picker
            v-else-if="item.type === 'date'"
            v-model="scope.row[item.field]"
            type="date"
            placeholder="选择日期"
            size="mini"
            value-format="yyyy-MM-dd">
          </el-date-picker>
          <!-- 数字输入框 -->
          <el-input-number size="mini" :controls="false" style="width:90%" placeholder="请输入数量" :min="0" :max="100000" v-else-if="item.type === 'inputNumber'"
            v-model="scope.row[item.field]"></el-input-number>
          <!-- 下拉菜单 -->
          <el-select v-else-if="item.type === 'select'" v-model="scope.row[item.field]" clearable placeholder="请选择" size="mini">
            <!-- select的数据与字段名相匹配 'select_'+'字段名' -->
            <el-option v-for="_item in scope.row['select_'+item.field]" :label="_item.label" :value="_item.value">
            </el-option>
          </el-select>

















          <!-- 图片展示 -->
          <span v-if="item.type === 'image'">
            <img :src="scope.row[item.field]" alt="" style="width:50px;height:50px;">
          </span>
          <!-- 上传图片 -->
          <el-upload
            class="upload-demo" v-else-if="item.type == 'btnText1'"
            action="http://192.168.1.80:8001//qr/linestylecat/getBase64Img"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-change="handleChange"
            :on-success="buttonFunction1"
            :file-list="fileList"
            list-type="picture">
            <el-button slot="trigger" type="text" @click="clickRow(scope)">{{item.field}}</el-button>
          </el-upload>
       


          <!-- 操作按钮 -->
          <span v-else-if="item.type == 'btnText'" class="btn-text">
            <el-button size="small" type="text" @click="buttonFunction(scope.row)">{{item.field}}</el-button>
          </span>
          <!-- 接线方式登记 -->
          <span v-else-if="item.type == 'btnText2'" class="btn-text">
            <el-button size="small" type="text" @click="buttonFunction(scope.row,'add') ">新增</el-button>
            <el-button size="small" type="text" class="btn-text-remove" @click="buttonFunction(scope.row,'remove')">删除</el-button>
          </span>
          <!-- 二维码查询 -->
           <span v-else-if="item.type == 'btnText3'" class="btn-text">
            <el-button size="small" type="text" @click="buttonFunction(scope.row,'edit') ">编辑</el-button>
            <el-button size="small" type="text" @click="buttonFunction(scope.row,'look')">详情</el-button>
          </span>
          <!-- 版本管理 -->
           <span v-else-if="item.type == 'btnText3s'" class="btn-text">
            <el-button size="small" type="text" @click="buttonFunction(scope.row,'update')">编辑</el-button>
            <el-button size="small" class="btn-text-remove" type="text" @click="buttonFunction(scope.row,'remove') ">删除</el-button>
          </span>
          <!-- 系统管理/显示屏品牌型号库 -->
          <span v-else-if="item.type == 'btnText4'" class="btn-text">
            <el-button size="small" type="text" @click="buttonFunction(scope.row,'register')">接线方式登记</el-button>
            <el-button size="small" type="text" @click="buttonFunction(scope.row,'update')">编辑</el-button>
            <el-button size="small" class="btn-text-remove" type="text" @click="buttonFunction(scope.row,'remove') ">删除</el-button>
          </span>
          <!-- 系统管理/账户管理 -->
          <span v-else-if="item.type == 'btnText5'" class="btn-text">
            <el-button size="small" type="text" @click="buttonFunction(scope.row,'update')">编辑</el-button>
            <el-button size="small" type="text" @click="buttonFunction(scope.row,'look')">详情</el-button>
          </span>
          <!-- 设备出库/出库管理 -->
          <span v-else-if="item.type == 'btnText6'" class="btn-text">
            <el-button size="small" type="text" @click="buttonFunction(scope.row,'update')">编辑</el-button>
            <el-button size="small" class="btn-text-remove" type="text" @click="buttonFunction(scope.row,'remove') ">删除</el-button>
            <el-button size="small" type="text" @click="buttonFunction(scope.row,'look')">详情</el-button>
          </span>
          <!-- 未完待续 -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="my-pagination">
      <el-pagination v-if="tableConfig.isPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableConfig.pageNum"
        :page-sizes="[10, 20, 30, 40]" :page-size="tableConfig.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableConfig.total">
      </el-pagination>
    </div>
    <!-- loading -->
    <loading v-show="false"></loading>
  </div>
</template>


<script>
  export default {
    props: ["tableConfig", "tableData"],
    data() {
      return {
        fileList:[],
      };
    },
    methods: {
       handleChange(file, fileList){
            var ary=[]
            // for(let d of this.formData.marketEntryDataShareUrls){
            //     ary.push({
            //         name:d.qualityImageShareUrl,
            //         url:d.qualityImageShareUrl
            //     })
            // }
            // return ary
        },
      handleRemove(file, fileList) {
        // debugger;
        console.log(file, fileList);
      },
      handlePreview(file) {
        // debugger;
        let arr = file.url
          console.log("file的值是--------------------------------------------",file.url)
      },
      setSex(key){
          switch (key) {
            case 1:
              return '男';
            case 2:
              return '女';
            default:
              return '未知';
          }
      },
      setState(key){
          switch (key) {
            case -1:
              return '审核未通过';
            case 0:
              return '待审核';
              default:
              return '已审核'
          }
      },
      setStateBtn(key){
          switch (key) {
            case -1:
              return '重新审核';
            case 0:
              return '审核';
            default :
            return '修改'
          }
      },
      toolbarBack(data) {
        //操作按钮回调
        this.$emit(data.method, data.index);
      },
      handleSizeChange(val) {
        //每页数量变化
        if (this.tableConfig.isLoading) {
          this.tableConfig.loadShow = true; //加载
        }
        this.tableConfig.pageSize = val;
        this.tableConfig.currentSelectArr = [];
        this.$emit("sizeChange");
      },
      handleCurrentChange(val) {
        //页码变化
        if (this.tableConfig.isLoading) {
          this.tableConfig.loadShow = true; //加载
        }
        this.tableConfig.pageNum = val;
        this.$emit("pageChange");
      },
      select(val) {
        //表格Checkbox勾选触发
        this.tableConfig.currentSelectArr = val;
      },
      selectAll(val) {
        //表格Checkbox全选触发
        this.tableConfig.currentSelectArr = val;
      },
      rowDblclick(val) {
        //表格单行双击
        this.$emit("rowDblclick", val);
      },
      //单行操作按钮
      buttonFunction(row,type='') {
        console.log("++++++++++++++++++++++++++++++++++++++",type)
        this.$emit("buttonFunction",row,type);
      },
      //单行操作按钮/接线方式
      buttonFunction1(response, file, fileList,a) {
        this.$emit("buttonFunction1",file);
      },
      clickRow(row){
        this.$emit("buttonFunction2",row);
      }
    },
    watch:{
      'tableData':function(){
         this.tableConfig.currentSelectArr = [];
      }
    }
  };

</script>
<style lang="less">
  @colPading: 8px 0;
  @theadColor: white;
  @theadImage: linear-gradient(to right, #4a8dd2, #2acaff);
  .myTable {
    position: relative;
    // padding: 10px;
    margin-top:10px;
    .el-button--text{
      color: #2A93FF;
    }
    .my-pagination {
      text-align: center;
      margin-top: 10px;
    }
    .el-table {
      border: 1px solid #dee3e8;
    }
    .el-table td {
      padding: @colPading;
    }
    .el-table thead {
      background-color: #dee3e8; // color: @theadColor;
      font-weight: 500; // background-image: @theadImage;
    }
    .has-gutter th,
    .has-gutter tr {
      background-color: #dee3e8;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 130px;
      }
      .btn-text{
        color: #2A93FF;
      }
      .btn-text-remove{
        color: red;
      }
  }
  .el-input__inner{
      height:32px;
  }
</style>
