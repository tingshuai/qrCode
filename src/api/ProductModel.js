import http from './public'

//分页查询列表
export const getChatGroups = (data)=>{
    return http.fetchGet('/qr/unitType/list',data);
}
//保存
export const chatGroups = (data)=>{
    return http.fetchPost('/qr/unitType/save',data);
}
//修改
export const chatGroupsDelay = (data)=>{
    return http.fetchPost('/qr/unitType/update',data);
}
//删除
export const retreatGroup = (data)=>{
    return http.fetchPost('/qr/unitType/delete',data);
}