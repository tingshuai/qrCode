import http from './public'

//分页查询列表
export const getChatGroups = (data)=>{
    return http.fetchGet('/qr/displaystorecat/list',data);
}
//保存
export const chatGroups = (data)=>{
    return http.fetchPost('/qr/displaystorecat/save',data);
}
//修改      
export const chatGroupsDelay = (data)=>{
    return http.fetchPost('/qr/displaystorecat/update',data);
}
//删除
export const retreatGroup = (data)=>{
    return http.fetchPost('/qr/displaystorecat/delete',data);
}
//分页查询接线方式列表
export const registerGroups = (data)=>{
    return http.fetchGet('/qr/linestylecat/AllList',data);
}
//保存
export const chatGroupes = (data)=>{
    return http.fetchPostJson('/qr/linestylecat/saveOrUpdate',data);
}