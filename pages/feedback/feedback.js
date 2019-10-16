// pages/feedback/feedback.js
const {
  $Toast
} = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedbackText: "",
    numberText: "0/100"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  bindinput: function(e) {
    var number = e.detail.value.length;
    this.setData({
      numberText: number + "/100",
      feedbackText: e.detail.value
    });
  },

  submit: function() {
    if (this.data.feedbackText.length == 0) {
      $Toast({
        content: '请填写意见反馈',
        type: 'error'
      });
      return;
    } 
    $Toast({
      content: '提交成功',
      type: 'success'
    });
    setTimeout(function() {
      wx.navigateBack({

      });
    }, 1500)
  }
})