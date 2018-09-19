//重复检查
export const epeatedExamination = (arr, attr, str) => { //arr数组对象 [{}],attr字段名,str 比对字符串
  var index = arr.findIndex((item) => {
    return item[attr] === str;
  })
  return index === -1 ? true : false; //重复为false ,不重复为true
}

//比较两对象可枚举项数量相等且值相等
export const objectComparison = (a, b) => { //a,b都为 Object
  if (typeof a != 'object' || typeof b != 'object') {
    return alert('传参数错误');
  }
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false; //不相等
  }
  for (let attr in a) {
    let _a = a[attr];
    let _b = b[attr];
    if (typeof _a === 'object' && typeof _b === 'object') {
      return arguments.callee(_a, _b);
    } else if (_a !== _b) {
      return false;
    }
  }
  return true; //相等
}
export const inputValidation = (str) => { //格式校验
  if (/^[a-zA-Z\d\u4E00-\u9FA5]{1,12}$/.test(str)) {
    return true;
  }
    return false;
}
//mock接受参数时数据处理
//url参数转对象
export const parseQuery=(query)=>{
  var reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
  var obj = {};
  while (reg.exec(query)) {
      obj[RegExp.$1] = decodeURI(RegExp.$2);
  }
  return obj;
} 
