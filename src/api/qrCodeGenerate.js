//二维码生成
import http from './public'

//生成二维码
export const qrCodeGenerate = (data)=>{
    return http.fetchPost('/qr/qrcode/createQrCode',data);
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
//保存
export const softwareSave = (data)=>{
    return http.fetchPost('/qr/qrcode/save',data);
}
//打印
export const prinTing = (data)=>{
    return http.fetchPostJson('/qr/qrcode/print',data);
}
//获取打印机名称
export const printerNames = (data)=>{
    return http.fetchGet('/qr/qrcode/printerNames',data);
}