import http from './public'
//登录
export const userLogin = (data)=>{
    return http.fetchPostJson('/sys/login',data);
}
//退出登录
export const userExit = (data)=>{
    return http.fetchPost('/sys/logout',data);
}
//验证码图片
export const captchaImg = (data)=>{
    return http.fetchGet('/captcha.jpg',data.params.uuid);
}
//菜单接口
export const MenuInterface = (data)=>{
    // debugger;
    return http.fetchGet('/sys/menu/nav',data);
}