// pages/more-score/more-score.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scoreList: []
  },
// "enablePullDownRefresh": true,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      scoreList: JSON.parse(options.data)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  onPullDownRefresh: function() {
    console.log('sss')
  }
})