//省市二级联动
<template>
<div class="city_box">
    <el-select size="small" style="width: 100px"
               v-model="selectProv"
               placeholder="请选择省份"
               v-on:change="getProv($event)"
               :filterable="filterable"
               >
        <el-option
                v-for="item in provs"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
    <el-select size="small" style="width: 100px"
               v-if="selectProv!=''"
               v-model="selectCity"
               placeholder="请选择城市"
               v-on:change="getCity($event)"
               :filterable="filterable"
               >
        <el-option
                v-for="item in citys"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
</div>		
</template>
<script type="text/javascript">

import { privinces, citys } from "./static/city.js"
let that;
let qwCity={
	props:['field',"value","filterable"],
	data(){
		return {
		    provs: privinces,
            citys: [],
            selectProv: '',
            selectCity: ''
		}
	},
	watch:{
		value : (val)=>{
			if(null == val){
				that.reset();
			}
			// else{
			// 	let tem=val.split(" ");
			// 	if(tem[0]){
			// 		that.getProv(tem[0],()=>{
			// 			if(tem[1]){
			// 				that.getCity(tem[1],()=>{
			// 					for(let attr in that.citys){
			// 						if(tem[1]== that.citys[attr].label){
			// 							that.setCity(tem[1]);
			// 							break;
			// 						}
			// 					}
			// 				})
			// 			}	
			// 		});
			// 	}
				
			// 	console.log("qwCity setVal==>",val)
			// }
		},
		// "selectCity": (val)=>{
			// console.log("selectCity==>",val)
		// },
		// "selectProv": (val)=>{
			// console.log("selectCity==>",this.selectCity)
			// console.log("selectProv==>",val)
		// }
	},
	created(){
		that=this;
		console.log('this.value===>',this.value)
	},
	methods:{
			//清空数据
			reset(){
				this.selectCity="";
				this.selectProv="";
				this.citys=[];
			},
			setCity(city){
				this.selectCity=city;
			},
		    /*二级联动选择地区*/
            getProv: function (prov,then= ()=>{}) {
                let tempCity=[];              
                this.citys=[];
                this.selectCity='';
                // this.value= this.selectProv+" "
                this.$emit('input',this.selectProv+" ");                 
                let allCity= citys;
                for (var val of allCity){
                    if (prov == val.prov){
                        // console.log(val);
                        tempCity.push({label: val.label, value: val.label})
                        if("function"==typeof(then))then()
                    }
                }
                this.citys = tempCity;
            },
            getCity: function (city,then= ()=>{}) {
                // console.log(city);
                // console.log(this.selectCity)
                if("function"==typeof(then))then()

                this.$emit('input', this.selectProv+" "+ this.selectCity);             
            }
 
        },
        mounted: function () {
          
        },
        updated: function () {
            
        }
}
export default qwCity;	
</script>
<style type="text/css">
	
</style>