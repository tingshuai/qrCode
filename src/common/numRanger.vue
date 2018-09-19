<template>
	<div class="box">
		<div class="minNum">
			<el-input style="width: 100%" v-model="value[0]" size="mini"  @change="handleMinChange" ></el-input>
		</div>
		<div class="center">
			<span>至</span>
		</div>
		<div class="maxNum">
			<el-input style="width: 100%" v-model="value[1]" size="mini"  @change="handleMaxChange"></el-input>
		</div>
	</div>
</template>
<style scoped lang="less">
	.box{
		display: flex;
		.minNum{
			flex:1;
		}
		.center{
			width: 40px;
			line-height: 29px;
			text-align: center
		}
		.maxNum{
			flex:1;
		}
	}
</style>
<script type="text/javascript">
	export default{
		data(){
			return{
				minValue:-Infinity,
				maxValue:Infinity
			}
		},
		props:['value'],
		methods:{
			handleMinChange(val){
				if(/^(-?\d+)(\.\d+)?$/.test(val)){
					this.$set(this.value,0,parseInt(this.value[0]))
					if(parseInt(this.value[0])>=parseInt(this.value[1])){
						this.$set(this.value,1,parseInt(this.value[0])+1)
					}
				}else{
					this.$set(this.value,0,null)
				}
			},
			handleMaxChange(val){
				this.$set(this.value,1,parseInt(this.value[1]))
				if(/^(-?\d+)(\.\d+)?$/.test(val)){
					if(parseInt(this.value[1])<=parseInt(this.value[0])){
						this.$set(this.value,0,parseInt(this.value[1])-1)
					}
				}else{
					this.$set(this.value,1,null)
				}
			},
		}
	}
</script>