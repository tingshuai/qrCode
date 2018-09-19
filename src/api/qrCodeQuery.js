import http from './public'

//分页查询列表
export const getChatGroups = (data)=>{
    return http.fetchGet('/qr/qrcode/list',data);
}
//批量操作/删除
export const retreatGroup = (data)=>{
    return http.fetchPost('/qr/qrcode/delete',data);
}
//保存
export const chatGroupsDelay = (data)=>{
    return http.fetchPost('/qr/qrcode/save',data);
}
//修改
export const retreatUpdate= (data)=>{
    return http.fetchPost('/qr/qrcode/update',data);
}
//产品型号下拉
export const unitTypeName= (data)=>{
    return http.fetchGet('/qr/unitType/kvList',data);
}
//硬件版本下拉  
export const hardwareVersion = (data)=>{
    return http.fetchGet('/qr/versiondetails/queryHardwareVersion',data);
}
//软件版本下拉  
export const softwareVersion = (data)=>{
    return http.fetchGet('/qr/versiondetails/querySoftwareVersion',data);
}
//打印
export const prinTing = (data)=>{
    return http.fetchPostJson('/qr/qrcode/print',data);
}