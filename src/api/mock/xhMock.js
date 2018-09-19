import Mock from 'mockjs'
import {parseQuery} from '../../utils/practicalClass'
import mockData  from './mockData'
//设置等待时间
Mock.setup({
    timeout: '200-600'
})
//分页查询仓库
Mock.mock('/storeSetMes/findStoreSetMes', 'post', function(options){
    let params = parseQuery(options.body);
    let items = JSON.parse(JSON.stringify(mockData.StoreDate));
    //数据筛选
    items = items.filter(function(item){
        if(params.storeName&&item.storeName!==params.storeName) {
            return false;
        }
        if(params.status&&item.status!==params.status) {
            return false;
        }
        if(params.stoProtery&&item.stoProtery!==params.stoProtery) {
            return false;
        }
        return true;
    })
    //数据分页
    let data = JSON.parse(JSON.stringify(items));
    if(params.pageNum&&params.pageSize){
        let start = (params.pageNum-1)*params.pageSize;
        data =  data.splice(start,params.pageSize);
    }
     return {
            result:true,
            message:"请求成功！",
            model:{
                identified:'id',
                items:data,
                numRows: items.length,
                stats:{}
            }
        }

})
//仓库设定
Mock.mock('/storeSetMes/insertAndUpdate', 'post', function(options){
    let params = parseQuery(options.body);
    if(!params.id){
        params.id = mockData.StoreDate.length+1;
        mockData.StoreDate.unshift(params);
        return{
            result:true,
            message:"设置成功！",
            model:params
        }
    }else{
        let index = mockData.StoreDate.findIndex((item)=>{
            return item.id == params.id;
        })
        console.log(params)
        mockData.StoreDate.splice(index,1);
        mockData.StoreDate.unshift(params)
        return{
            result:true,
            message:"修改成功！",
            model:params
        }
    }

})
//仓库删除
Mock.mock('/storeSetMes/deleted', 'post', function(options){
     let params = parseQuery(options.body);
     let ids = unescape(params.ids).split(',');
         ids.forEach(item => {
             let index = mockData.StoreDate.findIndex(_item=>{
                 console.log(item,_item)
                 return _item.id == item
             });
             if(index != -1){
                mockData.StoreDate.splice(index,1);
             }
         });   
         
      return {
        result:true,
        message:"删除成功！",
        model:params
      }   
});