import Mock from 'mockjs'

export default {
    //仓库数据
    StoreDate:Mock.mock({
        "items|1-100": [
            {
                "storeName|1-10": "x",//仓库名  
                "id|+1": 1,//仓库ID
                "stoProtery|1-10": "a",//仓库存储属性  
                "storeType|1-10": "b",//存储方式
                "remark|1-10": "c",//备注
                "status|1-10": "d"//仓库状态
            }
        ]
    }).items
}