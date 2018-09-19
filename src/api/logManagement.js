import http from './public'

//分页查询列表
export const getChatGroups = (data)=>{
    return http.fetchGet('/sys/log/list',data);
}
//导出Excel
export const getChatLogExport = ()=>{
    return localStorage.getItem('pocPort') + '/sys/log/export';
}