var rule = {
  /* 手机号 */
  phone: (rule, value, callback) => {
    if (!/^1[34578]\d{9}$/.test(value)) {
      return callback(new Error("请输入正确的手机号码"));
    } else {
      callback();
    }
  },
  /* 身份证 */
  IDcard: (rule, value, callback) => {
    if (!/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
        value
      )) {
      return callback(new Error("请输入正确的身份证号码"));
    } else {
      callback();
    }
  },
  // 邮箱
  email: (rule, value, callback) => {
    if (!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(
        value
      )) {
      return callback(new Error("请输入正确的邮箱"));
    } else {
      callback();
    }
  },
  // 中文名
  chineseName: (rule, value, callback) => {
    if (!/^[\u4e00-\u9fa5]{2,4}$/.test(value)) {
      return callback(new Error("请输入正确的中文名"));
    } else {
      callback();
    }
  },
  // 英文名
  EnglishName: (rule, value, callback) => {
    if (value && !/^[a-zA-Z\/ ]{2,20}$/.test(value)) {
      return callback(new Error("请输入正确的英文名"));
    } else {
      callback();
    }
  },
  //为空校验
  isEmpty: (rule, value, callback) => {
    if (/^\s{0,}$/.test(value)) {
      return callback(new Error("输入不能为空"));
    } else {
      callback();
    }
  },
  //京东用户名注册格式
  isUserName: (rule, value, callback) => {
    if (!/^[\u4e00-\u9fa5\w_-]{4,20}$/) {
      return callback(new Error("用户名输入格式有误"));
    } else {
      callback();
    }
  },
  //京东密码注册格式
  isPassword: (rule, value, callback) => {
    if (!/^.{6,20}$/.test(value)) {
      return callback(new Error("密码输入格式有误"));
    } else {
      callback();
    }
  }
};
export default rule;
