import { HTTP } from '../utils/http-p.js'
class KeyWord extends HTTP{
  getHistory(){
    const words = wx.getStorageSync('q')
    return !words ? [] : words
  }
  getHot(){
    return this.request({
      url: `book/hot_keyword`
    })
  }
  addToHistory(keyword){
    return new Promise((resolve, reject) => {
      let words = this.getHistory()
      const has = words.includes(keyword)
      if(!has){
        if(words.length >= 10){
          words.pop()
        }
        words.unshift(keyword)
        wx.setStorageSync('q', words)
        resolve(words)
      }
   })
  }
  searchBook(start,keyword){
    return this.request({
      url: 'book/search',
      data:{
        start:start,
        count:20,
        summary:0,
        q:keyword
      }
    })
  }
}
export{KeyWord}