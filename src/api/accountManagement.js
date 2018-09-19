import http from './public'

//分页查询列表
export const getChatGroups = (data)=>{
    return http.fetchGet('/sys/user/listClient',data);
}
//保存
export const chatGroups = (data)=>{
    return http.fetchPostJson('/sys/user/saveClient',data);
}
//修改
export const chatGroupsDelay = (data)=>{
    return http.fetchPostJson('/sys/user/updateClient',data);
}
//修改密码
export const chatPassword= (data)=>{
    return http.fetchPost('/sys/user/passwordSys',data);
}
//删除
export const retreatGroup = (data)=>{
    return http.fetchPost('/sys/user/deleteClient',data);
}
//角色管理
export const roleManagement = (data)=>{
    return http.fetchGet('/sys/role/selectClient',data);
}
//查看详情
export const lookInfos = (data)=>{
    return http.fetchGet('/sys/user/infoClient/'+data.params.userId);
}
//获取打印机名称
export const printerNames = (data)=>{
    return http.fetchGet('/qr/qrcode/printerNames',data);
}