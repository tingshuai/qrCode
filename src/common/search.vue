<template>
    <div class="search">
        <div class="otherContent">
            <!-- <div class="search-laber" style="font-size:14px;">筛选条件：</div> -->
            <!-- <div class="search-con">
                <div class="search-value-con clear"  v-for="(ary,index) in config">
                    <div class="search-value" :key="index" v-for="(item,index) in ary"> -->
                        <!-- <span >
                            <el-tooltip v-if="data[item.field]==''||data[item.field]==null" class="item" effect="dark" content="全部" placement="top-start">
                                <small >{{item.label}}:全部</small>
                            </el-tooltip>
                            <el-tooltip v-else-if="item.type=='select'||item.type=='radio'" class="item" effect="dark" :content="getSelectDate(data[item.field],item.childrens)" placement="top-start">
                                <small >{{item.label}}:{{getSelectDate(data[item.field],item.childrens)}}</small>
                            </el-tooltip>
                            <el-tooltip v-else-if="data[item.field].constructor==Array&&item.type!='numRange'&&item.type!='cascader'" class="item" effect="dark" :content="getDate(data[item.field])" placement="top-start">
                                <small>{{item.label}}:{{getDate(data[item.field])}}</small>
                            </el-tooltip>
                            <el-tooltip v-else-if="data[item.field].constructor==Array&&item.type=='numRange'" class="item" effect="dark" :content="getRange(data[item.field])" placement="top-start">
                                <small >{{item.label}}:{{getRange(data[item.field])}}</small>
                            </el-tooltip>
                            <el-tooltip v-else-if="data[item.field].constructor==Array&&item.type=='cascader'" class="item" effect="dark" :content="getCascader(data[item.field],item.childrens)" placement="top-start">
                                <small >{{item.label}}:{{getCascader(data[item.field],item.childrens)}}</small>
                            </el-tooltip>
                            <el-tooltip v-else-if="data[item.field].constructor==Date" class="item" effect="dark" :content="data[item.field]" placement="top-start">
                                <small >{{item.label}}:{{data[item.field]}}</small>
                            </el-tooltip>
                            <el-tooltip v-else class="item" effect="dark" :content="data[item.field]" placement="top-start">
                                <small>{{item.label}}:{{data[item.field]}}</small>
                            </el-tooltip>
                        </span> -->
                    <!-- </div>
                </div>
            </div> -->
        <transition name="el-zoom-in-top">
            <div class="content" v-if="isShow" style="margin-bottom: -25px;width:auto;">
                <el-form :inline="true"  ref="form" :model="data" label-width="69px" v-for="ary in config">
                    <el-form-item style="height:46px;" :label="item.label" size="mini" v-for="(item,index) in ary">
                        <el-radio-group @change="handler(item.method,data[item.field])" v-model="data[item.field]"  v-if="item.type=='radioButton'">
                            <el-radio-button v-for="child in item.childrens" :label="child.value" :key="child.value">{{child.name}}</el-radio-button>
                        </el-radio-group>
                        <el-input placeholder="请输入" :disabled="item.disabled" v-model="data[item.field]" v-if="item.type=='input'"></el-input>
                        <el-autocomplete :disabled="item.disabled" v-model="data[item.field]" :fetch-suggestions="item.searchMethod" @select="handleSelect" v-if="item.type=='searchInput'"></el-autocomplete>

                        <!-- 关于时间 -->
                        <el-date-picker :disabled="item.disabled" v-if="item.type=='year'" :type="item.type"  v-model="data[item.field]"  value-format="yyyy"></el-date-picker>
                        <el-date-picker :disabled="item.disabled" v-if="item.type=='month'" :type="item.type"  v-model="data[item.field]"  value-format="yyyy-MM"></el-date-picker>
                        <el-date-picker :disabled="item.disabled" v-if="item.type=='daterange'||item.type=='date'" :type="item.type"  v-model="data[item.field]"  value-format="yyyy-MM-dd"></el-date-picker>
                        <el-date-picker :disabled="item.disabled" v-if="item.type=='datetimerange'||item.type=='datetime'" :type="item.type"  v-model="data[item.field]"  value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>



                        <el-radio-group :disabled="item.disabled"  v-if="item.type=='radio'" v-model="data[item.field]">
                            <el-radio border :style="{'color':child.color}"  v-for="child in item.childrens" :label="child.value">{{child.name}}</el-radio>
                        </el-radio-group>
                        <el-checkbox-group :max="item.max" :disabled="item.disabled" v-model="data[item.field]" v-if="item.type=='checkbox'">
                            <el-checkbox border :style="{'color':child.color}" v-for="child in item.childrens" :label="child.value" :key="child.value">{{child.name}}</el-checkbox>
                        </el-checkbox-group>
                        <el-input-number :disabled="item.disabled" v-if="item.type=='number'" v-model="data[item.field]" :min="item.min" :max="item.max" :controls="item.isControls" :controls-position="item.controlPos"></el-input-number>
                        <!-- 下拉选择 -->
                        <el-select placeholder="请输入或者选择" filterable :disabled="item.disabled" v-model="data[item.field]" clearable v-if="item.type=='selects'">
                            <el-option
                                v-for="child in item.childrens"
                                :key="child.value"
                                :label="child.label"
                                :value="child.value">
                            </el-option>
                        </el-select>
                        <!-- 下拉选择 -->
                        <el-select :disabled="item.disabled" v-model="data[item.field]" clearable v-if="item.type=='select'" :filterable="item.filterable">
                            <el-option
                                v-for="child in item.childrens"
                                :key="child.value"
                                :label="child.label"
                                :value="child.value">
                            </el-option>
                        </el-select>
                        <el-cascader
                            @change="search"
                            :disabled="item.disabled"
                            clearable
                            change-on-select
                            v-if="item.type=='cascader'"
                            :options="item.childrens"
                            :props="{'label':'label'}"
                            v-model="data[item.field]">
                        </el-cascader>
                        <numRange
                            v-if="item.type=='numRange'"
                            v-model="data[item.field]"
                        >
                        </numRange>
                    </el-form-item>
                </el-form>
            </div>
        </transition>
        <div class="search-btns" style="font-size:14px;line-height:30px;margin-left:20px;">
                <!-- <el-button type="info" size="mini" v-if="!isShow" @click="isShow=!isShow" icon="el-icon-arrow-down">显示筛选</el-button>
                <el-button type="info" size="mini"  v-if="isShow" @click="isShow=!isShow" icon="el-icon-arrow-up">隐藏筛选</el-button> -->
                <el-button type="primary" size="mini" @click="search" style="width:88px;">查询</el-button>
                <el-button type="info" size="mini" @click="init" style="width:88px;" plain class="reset">重置</el-button>
        </div>
      </div>
    </div>
</template>
<style lang="less" scoped>
	.search{
		width: 100%;
		height: auto;
        margin-bottom: 0px;
		position: relative;
		overflow: visible;
		.otherContent{
            // border:1px solid red;
            border-bottom: 1px dashed #eee;
            padding: 15px;
            padding-left:5px;
			line-height: 29px;
			// padding-left: 10px;
			height: auto;
			overflow: hidden;
			display: flex;
			.search-laber{
				width: 70px;
				font-size:12px;
			}
			.search-con{
				flex:1;
				.search-value-con{
                    height: 36px;
                    display: table-cell;
                    vertical-align: middle;
					.search-value{
						float: left;
						padding:2px 5px;
						height: 20px;
                        line-height: 20px;
                        margin: 3px;
                        width: 112px;
                        text-align: center;
                        color:#666;
                        border: 1px solid #666;
                        font-size: 12px;
                        small{
                            width: 112px;
                            overflow: hidden;
                            display: inline-block;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
					}
				}
            }
            .search-btns{
                width: 320px;
                .reset:hover{
                    border-color: #a6a9ad;
                    background:#a6a9ad !important;
                    color:#fff;
                }
            }
        }
        .el-select{
            margin-right:20px;
        }
        .el-range-editor--mini.el-input__inner {
            margin-top: 3px;
        }
	}
</style>
<script>
import numRange from './numRanger.vue'
export default {
    data(){
        return{
            isShow:true,
            initData:{},
        }
    },
    props:{
        data:{
            type:Object,
            default:{},
            required: true
        },
        config:{
            type:Array,
            default:[],
            required: true
        }
    },
    created(){
        for(let f of this.config){
            for(let d of f){
                if(d.type!='checkbox'&&d.type!='cascader'&&d.type!='numRange'){
                    if(!this.data[d.field]){
                        this.$set(this.data,d.field,null)
                    }             
                }else if(d.type=='numRange'){
                    if(!this.data[d.field]){
                        this.$set(this.data,d.field,[null,null])
                    }
                }else{
                    if(!this.data[d.field]){
                        this.$set(this.data,d.field,[])
                    }           
                }
            }
        }
         this.initData=JSON.parse(JSON.stringify(this.data))
    },
    components:{
        numRange
    },
    methods:{
        handler(method,data){
            this.$emit(method,data)
        },
        search(){
            // debugger;
            this.$emit('search',this.data)
        },
        sele(){
            this.$emit('search',this.data)
        },
        init(){
             console.log(this.initData)
            for(var key in this.data){
                this.data[key]=JSON.parse(JSON.stringify(this.initData))[key]
            }
        },
        handleSelect(val){
            this.$emit('handleSelect',val)
        },
        getDate(array){
            var ary=[]
            for(let d of array){
                if(d.constructor==Date){
                    ary.push(d)
                }else{
                    ary.push(d)
                }
            }
            return ary.join('至')
        },
        getRange(array){
            var ary=[]
            if(array[0]==null&&array[1]==null){
                return '全部'
            }else if(array[0]==null&&array[1]!=null){
                return '小于'+array[1]
            }else if(array[0]!=null&&array[1]==null){
                return '大于'+array[0]
            }else{
                return '大于'+array[0]+'且小于'+array[1]
            }
        },
        getCascader(ary,list){
            var str=[]
            var child=list
            if(ary.length>0){					
                for(var i=0;i<ary.length;i++){
                    // console.log(d,list)
                    var index=child.findIndex(val=>val.value==ary[i])
                    if(index>=0){
                        str.push(child[index].label)
                        if(child[index].children!=undefined){
                            child=child[index].children
                        }
                    }
                }
                // alert(str)
                return str.join('/')
            }else{
                return '全部'
            }
        },
        getSelectDate(data,ary){
            var index=ary.findIndex(val=>val.value==data)
            if(index>=0){
                return ary[index].label
            }else{
                return '全部'
            }
        }
    }
}
</script>


