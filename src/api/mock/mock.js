import Mock from 'mockjs'
import {parseQuery} from '../../utils/practicalClass'
import mockData  from './mockData'
//设置等待时间
Mock.setup({
    timeout: '200-600'
})
//下拉菜单
Mock.mock('/simpleSelect/getData', 'post', function(options){
    let params = parseQuery(options.body);
    console.log(params)
     switch(params.name){
         case 'stoProtery'://仓库属性
         return {
                message: "请求成功",
                model: [{label: "物料",value: '物料'},
                        {label: "成品",value: "成品"},
                        {label: "半成品",value: "半成品"}],
                result: true
            }
         case 'stoStatus'://仓库状态
         return {
            message: "请求成功",
            model: [{label: "开放",value: "开放"},
                    {label: "盘点中",value: "盘点中"}],
            result: true
         }
         case 'prodStatus'://产品状态

         return{}
         case 'materialStatus'://材料状态

         return{}
         case 'midInType'://半成品入库类型

         return{}
         case 'prodInType'://成品入库类型

         return{}
         case 'materialInTpe'://材料入库类型

         return{}
     }      
})