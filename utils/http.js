import {config} from '../config.js'
const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效',
  3000: '期刊不存在'
}
class HTTP{
  request(params){
    if(!params.method){
      params.method = 'GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      header:{
        'appkey':config.appkey,
        'content-type': 'application/json'
      },
      method:params.method,
      data:params.data,
      success:(res)=>{
        let code = res.statusCode
        if (code.toString().startsWith('2')){
          params.success && params.success(res.data)
        }
        else{
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail:(err)=>{
         this._show_error(1)
      }
    })
  }
  _show_error(error_code){
    if(!error_code){
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}
export {HTTP}