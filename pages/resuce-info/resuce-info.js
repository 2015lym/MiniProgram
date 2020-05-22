// pages/resuce-info/resuce-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      detail: JSON.parse(options.item)
    })
  },

})