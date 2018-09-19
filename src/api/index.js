import http from './public'


//产品下拉
export const productlist = (data)=>{
    return http.fetchGet('/productStorePlm/productlist',data)
}
