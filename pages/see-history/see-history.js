// pages/see-history/see-history.js

const Request = require('../../utils/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    Request.post('WeChatMiniApps/GetBrowseLift', {
      PageIndex: 1,
      PageSize: 10
    }).then(res => {
      this.setData({
        listData: JSON.parse(res.data.Data)
      });
    }).catch(err => { });
  },

  gotoDetail: function (event) {
    wx.navigateTo({
      url: '../elevator-detail/elevator-detail?liftNum=' + event.currentTarget.dataset.item.LiftNum
    })
  }
})