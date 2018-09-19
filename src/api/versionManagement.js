import http from './public'

//分页查询列表
export const getChatGroups = (data)=>{
    return http.fetchGet('/qr/versiondetails/list',data);
}
//保存
export const chatGroups = (data)=>{
    return http.fetchPost('/qr/versiondetails/save',data);
}
//修改
export const chatGroupsDelay = (data)=>{
    return http.fetchPost('/qr/versiondetails/update',data);
}
//删除
export const retreatGroup = (data)=>{
    return http.fetchPost('/qr/versiondetails/delete',data);
}
//产品型号下拉  
export const productModel = (data)=>{
    return http.fetchGet('/qr/unitType/kvList',data);
}