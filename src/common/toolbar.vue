//按钮组
<template>
	<div>
		<div class="clear toolbar">
			<div class="toolleft">
				<span>
					<slot></slot>
				</span>				
			</div>
			<div class="toolleft">
				<el-button 
				  :loading="item.loading" 
				  size="mini" v-for="(item,index) in toolbarConfig"  
				  :key="index" 
				  :type="item.type||'info'"
				  :disabled="item.disabled" 
				  @click="btnClick(item.method,index)">{{item.name}}</el-button>
			</div>
		</div>
	</div>
</template>
<style type="text/css" scoped lang="less">
	.toolbar{
		height: 50px;
		line-height: 50px;
		margin-left:-9px;
		.toolleft{
			float: left;
			span{
				margin-left: 10px;
			}
			.el-button--mini, .el-button--small {
				width:88px;
			}
		}
		.toolright{
			float: right;
			margin-right: 10px;
		}
	}
</style>
<script type="text/javascript">
	export default{
		props:{
			toolbarConfig:{
				type:Array,
				required:true
			}
		},
		data(){
			return{//数据传递参考
				// toolbarConfig:[{
                //      loading:true,
                //      icon:'xxx',
				// 	    disabled:true,
                //      method:'xxxx',
				// 	    name:'小黑'
				// },
				// {
                //      icon:'xxx',
                //      method:'xxxx',
				// 	    name:'小黑'
				// }]
			}
		},
		methods:{
			btnClick(val,index){//按钮事件回调
				this.$emit('toolbarBack',{index:index,method:val})
			}
		}
	}
</script>
<style lang="less">
// @btnBgColor: #409EFF;//按钮背景颜色
@btnBgImage:linear-gradient(to right, #4a8dd2, #2acaff);//按钮背景图片
@btnTextColor:white;//按钮文字颜色
@btnHoverColor: #3efeef;//按钮交互文字颜色
 .el-button--default{
	// background-color: @btnBgColor;
	// background-image: @btnBgImage;
	    // color: @btnTextColor;
 }
 .el-button:focus, .el-button:hover,.el-button:active{
	//  color: @btnHoverColor;
 }
 .el-button--mini, .el-button--mini.is-round {
    padding: 10px 22px;
}
.el-button--mini, .el-button--small {
    font-size: 12px;
	border-radius: 0px;
	text-align:center;
}
.el-button--info:focus, .el-button--info{
    background: #fff;
    border-color: #a6a9ad;
    color: #909399;
}
</style>
