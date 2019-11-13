// pages/home.js

const Request = require('../../../utils/request.js');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: '',
    bnrUrl: [],
    listData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      baseUrl: app.baseUrl.replace('api/', '')
    })
    Request.get('WeChatMiniApps/GetBanners', {
    }).then(res => {
      this.setData({
        bnrUrl: JSON.parse(res.data.Data)
      });
    }).catch(err => { });
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
    Request.post('WeChatMiniApps/GetFollowLift', {
      PageIndex: 1,
      PageSize: 10
    }).then(res => {
      this.setData({
        listData: JSON.parse(res.data.Data)
      });
    }).catch(err => {});
  },

  gotoDetail: function(event) {
    wx.navigateTo({
      url: '../../elevator-detail/elevator-detail?liftNum=' + event.currentTarget.dataset.item.LiftNum
    })
  }
})