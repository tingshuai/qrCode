
// 时间格式转化
export const GMTToStr = time =>{
    if (time == '' || time == null) {
        return ''
    }
    else {
        let now = new Date(time);
        let year = now.getFullYear(); //得到年份
        let month = now.getMonth();//得到月份
        let date = now.getDate();//得到日期
        let day = now.getDay();//得到周几
        let hour = now.getHours();//得到小时
        let minu = now.getMinutes();//得到分钟
        let sec = now.getSeconds();//得到秒
        let MS = now.getMilliseconds();//获取毫秒
        let week;
        month = month + 1;
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        if (hour < 10) hour = "0" + hour;
        if (minu < 10) minu = "0" + minu;
        if (sec < 10) sec = "0" + sec;
        if (MS < 100) MS = "0" + MS;
        let arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
        week = arr_week[day];
        let times = "";
        times = year + "-" + month + "-" + date
        return times
    }
};