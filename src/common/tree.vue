<template>
  <div class="modelTree">
    <div class="search">
        <el-input
            size="mini"
            placeholder="输入关键字进行过滤"
            v-model="filterText">
        </el-input>
    </div>
    <el-tree
       ref="modelTree"
       empty-text="暂无相关数据,请先新增"
      :data="treeData"
      highlight-current
      :props="props"
      :load="loadNode"
      @current-change="nodeChange"
	  lazy
      :filter-node-method="filterNode">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span class="text">{{ node.label }}</span>
        <span class="btns" v-if="readOnly==false" >
          <el-button
            v-for="button in buttons"
            type="text"
            size="mini"
            v-if="button.isShowFun?button.isShowFun(node):true"
            :icon="'el-icon-'+button.icon"
            @click.stop="() => handlerClick(node,data,button.method)">
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>
<style  lang="less">
    .modelTree{
        position: relative;
        .search{
            margin-bottom: 15px;
        }
        .el-tree-node__content{
            height: 30px;
            line-height: 30px;
            box-sizing: border-box;
            margin-bottom: 5px;
            .custom-tree-node {
                display: flex;
                flex: 1;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                align-items: center;
                justify-content: space-between;
                font-size: 14px;
                border: 1px solid #e2e4e6;
                padding-right: 8px;
                height: 30px;
                line-height: 30px;
                box-sizing: border-box;
                padding-left: 10px;
                .text{
                    flex: 1;
                    text-align: left;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .btns{
                    width: 100px;
                    text-align: right;
                }
                span{
                    font-size: 12px;
                }
            }
        }
        .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
            background-color: #fff;
            &>.custom-tree-node{
                border: 1px solid #659ef4;
            }
        }
        .el-tree-node:focus>.el-tree-node__content, .el-tree-node__content:hover{
            background-color: #fff!important;
            &>.custom-tree-node{
                background-color: #f5f7fa;
            }
        }
    }   
</style>
<script>
// import {mapState} from 'vuex'
export default {
    data(){
        return{
            treeData: [],
            filterText:'',
            initData:{}
        }
    },
    // props:['readOnly','param','props','buttons','rootData'],
    // computed:{
    //     ...mapState({
    //         ports:'ports',
    //     })
    // },
    props:{
    	readOnly:{
            type:Boolean,
            default:true,
        },
        props:{
        	type:Object,
        	default:{
        		label:'label'
        	}
        },
        param:{
        	type:Object,
        	default:()=>{
        		return {}
        	}
        },
        buttons:{
        	type:Array,
        	default:()=>{
        		return []
        	}
        },
        rootData:{
        	type:Array,
        	default:()=>{
        		return []
        	}
        }
    },
    methods:{
        handlerClick(node,data,method){
            this.$emit(method,node,data)
        },
        nodeChange(data,node){
            this.$emit('nodeChange',node,data)
        },
        filterNode(value, data) {
            if (!value) return true;
            return data[this.props.label].indexOf(value) !== -1;
        },
        // 获取树节点数据
        // getTreeData(node,resolve,id){
        //     this.$http.post(
        //         this.ports+this.treeUrl,
        //         {
        //             parentId:id,
        //             modelType:node.data.modelType,
        //             ...this.param
        //         },
        //         {},
        //         data=>{
        //             resolve(data)
        //         },
        //         this
        //     )
        // },
        loadNode(node, resolve){
            if(node.level==0){
                if(this.rootData.length>0){
                    resolve(this.rootData)
                }else{
                    resolve([this.initData])
                }  
            }else{
            	this.$emit('loadNode',node,resolve,node.data.id)
            }
        }
    },
    created(){
        this.initData={
            id:0,
            isLeaf:false
        }
        this.$set(this.initData,this.props.label,'root')
    },
    mounted(){
        this.$emit('init',this.$refs.modelTree.root)
    },
    watch: {
        filterText(val) {
            this.$refs.modelTree.filter(val);
        }
    },
}
</script>
