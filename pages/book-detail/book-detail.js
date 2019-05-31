// pages/book-detail/book-detail.js
import { BookModel } from '../../models/book.js'
import { LikeModel } from '../../models/like.js'
const bookModel = new BookModel()
const likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '载入中',
    })
    const id = options.id
    const detail = bookModel.getDetail(id)
    const comments = bookModel.getComments(id)
    const likeStatus = bookModel.getLikeStatus(id)
    Promise.all([detail,comments,likeStatus])
    .then(res=>{
      this.setData({
        book:res[0],
        comments:res[1].comments,
        likeStatus:res[2].like_status,
        likeCount:res[2].fav_nums
      })
      wx.hideLoading()
    })
  },
  onLike: function (e) {
    const flag = e.detail.behavior
    likeModel.like(flag, this.data.book.id , 400)
  },
  onFakePost: function (e) {
    this.setData({
      posting: true
    })
  },
  onCancel: function (e) {
    this.setData({
      posting: false
    })
  },
  onPost :function (e) {
    const comment = e.detail.value
    bookModel.addComments(this.data.book.id, comment)
    .then(res => {
      const newComments = this.data.comments
      newComments.unshift({content:comment,nums:1})
      wx.showToast({
        title: '+1'
      })
      this.setData({
        posting:false,
        comments: newComments
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})