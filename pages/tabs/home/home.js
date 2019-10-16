// pages/home.js

const Request = require("../../../utils/request.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "bnrUrl": [{
      "url": "../../../resource/images/banner.jpg"
    }, {
        "url": "../../../resource/images/banner.jpg"
    }, {
        "url": "../../../resource/images/banner.jpg"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // Request.post("/api/xcxWxLogin", {  //调用方法

    // }).then(res => { //成功回调
    //   //todo
    // }).catch(err => { }); //异常回调

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  gotoDetail: function () {
    wx.navigateTo({
      url: '../../elevator-detail/elevator-detail?isCare=0'
    })
  }
})