// pages/classic/classic.js
import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'
const classicModel = new ClassicModel()
const likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    first: false,
    latest: true,
    classic: null,
    likeCount: 0,
    likeStatus: false
  },
  onLike: function (e) {
    let behavior = e.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res)=>{
      this.setData({
        classic:res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },
  onNext: function (e) {
    this._UpdateClassic('next')
  },
  onPre:function (e) {
    this._UpdateClassic('previous')
  },
  _UpdateClassic: function(nextOrPre){
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPre, (res) => {
      this._getLikeStatus(res.id,res.type)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index),
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },
  _getLikeStatus: function(artID, category){
    likeModel.getClassicLikeStatus(artID, category , (res)=>{
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
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