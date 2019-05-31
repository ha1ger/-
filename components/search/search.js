// components/search/search.js
import { KeyWord } from '../../models/keyword.js'
import { pagenationBev } from '../behaviors/pagenation.js'
const keyWord = new KeyWord()
Component({

  /**
   * 组件的属性列表
   */
  behaviors: [pagenationBev],
  properties: {
    more:{
      type:Boolean,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    history:[],
    hot:[],
    result:false,
    getNothing:false,
    inputValue:'',
    word:'',
    loading:false,
    showLoadingCenter:false,
    showLoadingBottom:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore(){
        if(this.data.word){
          if(!this.data.loading){
            if(this.hasMore()){
              this.setData({
                showLoadingBottom: true
              })
              this.data.loading = true
              keyWord.searchBook(this.data.books.length, this.data.word)
              .then(res => {
                const books = this.data.books.concat(res.books)
                wx.setStorageSync('q' + this.data.word,books)
                this.setMoreData(res.books)
                this.setData({
                  loading:false
                })
                this.setData({
                  showLoadingBottom: false
                })
              },()=>{
                this.setData({
                  loading: false
                })
              })
            }
            else {
              wx.showToast({
                title: '没有更多结果了',
                icon:'none'
              })
            }
          }
        }
    },
    onCancel(){
      this.triggerEvent("cancel")
    },
    onReSearch(e){
      this.setData({
        result:false,
        getNothing:false,
        inputValue:''
      })
    },
    tagSearch(e){
      const word = e.detail.value
      this.setData({
        word:word,
        books: [],
        total: null
      })
      this.bookSearch(word)
    },
    onConfirm(e){
      this.setData({
        books: [],
        total: null
      })
      const word = e.detail.value
      this.bookSearch(word)
    },
    bookSearch(word){
      this.setData({
        showLoadingCenter:true
      })
      const cache = wx.getStorageSync('q' + word)
      if (!cache) {
        const addTo = keyWord.addToHistory(word)
        const search = keyWord.searchBook(0,word)
        Promise.all([addTo, search])
          .then(res => {
            this.setData({
              history: res[0]
            })
            if (!res[1].books[0]) {
              this.setData({
                result: false,
                getNothing: true
              })
            } else {
              this.setMoreData(res[1].books)
              this.setTotal(res[1].total)
              this.setData({
                result: true,
                getNothing: false
              })
              wx.setStorageSync('q' + word, res[1].books)
            }
            this.setData({
              showLoadingCenter: false
            })
          })
      } else {
        this.setData({
          books: cache,
          result: true,
          getNothing: false
        })
        this.setData({
          showLoadingCenter: false
        })
      }
    }
  },
  lifetimes:{
    attached(){
      const history = keyWord.getHistory()
      const hot = keyWord.getHot()
      .then(res=>{
        this.setData({
          hot: res.hot
        })
      })
      this.setData({
        history: history
      })
    }
  }
})
