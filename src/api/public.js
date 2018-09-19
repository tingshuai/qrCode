import axios from 'axios'
axios.defaults.timeout = 15000
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
let port = '';
//请求方法
export default {
  fetchGet(url, data={}) {
    let params = data.params ? this.setParams(data.params) : {};
    return new Promise((resolve, reject) => {
      axios.get(this.getPocPort() + url, {
        params
      }).then(res => {
        if (res.data.code=='0') {
          resolve(res.data)
        } else {
          if (data.Vue) {
            let error = res.data.msg.replace('<br>','')
            data.Vue.$message.error(error);
          }
        }
      }).catch(error => {
        if (data.Vue) {
          data.Vue.$message.error('系统异常');
        }
        reject();
      })
    })
  },
  fetchQuickSearch(url,Vue) {
    return new Promise((resolve, reject) => {
      axios.get(this.getPocPort() + url).then(res => {
        if (res.data.code=='0') {
          resolve(res.data)
        } else {
          if (Vue) {
            let error = res.data.msg.replace('<br>','')
            data.Vue.$message.error(error);
          }
        }
      }).catch(error => {
        if (Vue) {
            Vue.$message.error('系统异常');
        }
        reject();
      })
    })
  },
  fetchPost(url, data={}) {
    let params = data.params ? this.setParams(data.params) : {};
    return new Promise((resolve, reject) => {
      axios.post(this.getPocPort() + url, params).then(res => {
        if (res.data.code=='0') {
          resolve(res.data)
        } else {
          if (data.Vue) {
            let error = res.data.msg.replace('<br>','')
            data.Vue.$message.error(error);
          }
          reject();
        }
      }).catch(error => {
        if (data.Vue) {
          data.Vue.$message.error('系统异常');
        }
      })
    })
  },
  fetchPostJson(url, data={}) {
    return new Promise((resolve, reject) => {
      axios.post(this.getPocPort() + url, this.setAttr(data.params)).then(res => {
        if (res.data.code=='0') {
          resolve(res.data)
        } else {
          if (data.Vue) {
            let error = res.data.msg.replace('<br>','')
            data.Vue.$message.error(error);
          }
        }
      }).catch(error => {
        if (data.Vue) {
          data.Vue.$message.error('系统异常');
        }
        reject();
      })
    })
  },
  setParams(params) {
    let fdata = new URLSearchParams();
        params = this.setAttr(params);
    for (let attr in params) {
      if(params[attr]!==null&&params[attr]!==undefined){
        fdata.append(attr, params[attr]);
      }
    }
    return fdata;
  },
  setAttr(params){
      for (let attr in params) {
        if(params[attr]===null||params[attr]===undefined){
             delete params[attr]
        }
      }
      return params;
  },
  getPocPort() {
    if (!port) {
      port = localStorage.getItem('pocPort');
    }
    return port;
  }
}
axios.interceptors.request.use( 
  config => {
    // debugger;
    let token = localStorage.getItem("token");
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      console.log(token);
      config.headers.token = `${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

  