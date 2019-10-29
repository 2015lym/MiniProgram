// pages/echarts-detail/error-number/error-number.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    elevatorData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      elevatorData: JSON.parse(options.data)
    })
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
  // 查看历史故障
  checkHistory: function() {
    wx.navigateTo({
      url: './history-error/history-error?liftId=' + this.data.elevatorData.Id
    })
  }
})