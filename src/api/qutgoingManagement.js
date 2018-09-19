import http from './public'

//分页查询列表
export const getChatGroups = (data)=>{
    return http.fetchGet('/qr/outdetails/list',data);
}
//保存
export const chatGroups = (data)=>{
    return http.fetchPost('/qr/outdetails/save',data);
}
//修改
export const chatGroupsDelay = (data)=>{
    return http.fetchPost('/qr/outdetails/update',data);
}
//删除
export const retreatGroup = (data)=>{
    return http.fetchPost('/qr/outdetails/delete',data);
}
//出货生成二维码
export const qrCodeGenerate = (data)=>{
    return http.fetchPost('/qr/outdetails/showQrCode',data);
}
//打印
export const prinTing = (data)=>{
    return http.fetchPostJson('/qr/qrcode/print',data);
}