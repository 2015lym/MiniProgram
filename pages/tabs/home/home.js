// pages/home.js

const Request = require('../../../utils/request.js');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectIndex: 0,
    order: {
      peopleNum: 1
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // Request.post('WeChatMiniApps/GetFollowLift', {
    //   PageIndex: 1,
    //   PageSize: 10
    // }).then(res => {
    //   this.setData({
    //     listData: JSON.parse(res.data.Data)
    //   });
    //   wx.stopPullDownRefresh()
    // }).catch(err => { });
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
  selectBtn: function (event) {
    this.setData({
      selectIndex: event.currentTarget.dataset.value
    })
  }
})